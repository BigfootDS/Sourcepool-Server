// Prevent weird behaviours during Windows installation:
if(require('electron-squirrel-startup')) return;

// May be useless until we get code signing sorted out on 
// MacOS and Windows:
const autoUpdater = require('update-electron-app');
autoUpdater.updateElectronApp();


const fs = require('fs');
const path = require('node:path');

const { app, Tray, Menu, shell, nativeImage, dialog } = require('electron');
const { checkForLocalClient, downloadNewClient, checkForUpdatedClientOnline } = require('./webClientManager');

let tray = null;
const PORT = 7474;
let serverVersion = app.getVersion();
let clientVersion = "0.0.0";
let newClientVersion = null;
let clientAutoUpdateInterval = null;
let clientAutoUpdateCheckInterval = null;

app.whenReady().then(async () => {
	// If MacOS app dock is available, hide the app
	if (app.dock) app.dock.hide();
	console.clear();

	// Set package name in case Electron removes it,
	// it just helps with database file tidiness
	process.env.npm_package_name = "sourcepool-server";
	process.env.userStorageDir = app.getPath('userData');
	process.env.npm_package_version = serverVersion;
	
	// Confirm what environment variables are available to the app:
	if (process.env.NODE_ENV ==  "development") {
		console.log("ElectronJS envs: \n"+JSON.stringify(process.env, null, 4));
	}
	
	// Start up the server:
	require('../server/index');
	
	// Configure the app tray icon:

	if (process.platform === 'win32'){
		// Windows setup
		let iconName = 'favicon-32x32';
		let iconPath = path.join(__dirname, `./public/favicon/${iconName}.png`);
		tray = new Tray(iconPath);
	} else {
		// Linux & MacOS setup
		let iconName = 'macos-icon';
		let iconPath = path.join(__dirname, `./public/favicon/${iconName}.png`);
		let iconNativeImage = nativeImage.createFromPath(iconPath);
		iconNativeImage = iconNativeImage.resize({
			height: 16,
			width: 16
		});
		tray = new Tray(iconNativeImage);
	}

	// Delay so the Express server has time to boot up.
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	await delay(2000);

	let doesLocalWebClientExist = await checkForLocalClient();
	if (!doesLocalWebClientExist){
		// downloadNewClient();
		let clientUpdateCheck = await fetch(`http://localhost:${PORT}/electron/updateLocalWebClient`);
		newClientVersion = clientUpdateCheck.newVersion || null;
	} else {



		let clientUpdateCheckResult = await checkForUpdatedClientOnline(PORT);
		console.log("Client update check on boot returned:\n"+ JSON.stringify(clientUpdateCheckResult));
		if (!clientUpdateCheckResult.error){
			clientVersion = clientUpdateCheckResult.currentVersion;
			newClientVersion = clientUpdateCheckResult.newIsNewer ? clientUpdateCheckResult.newerVersion : null;
			
			if (clientUpdateCheckResult.clientShouldAutoUpdate){
				clientAutoUpdateInterval = clientUpdateCheckResult.clientAutoUpdateInterval;
				clientAutoUpdateCheckInterval = setInterval(async () => {
					let clientAutoUpdateCheckResult = await checkForUpdatedClientOnline(PORT);
					if (!clientAutoUpdateCheckResult.error){
						clientVersion = clientUpdateCheckResult.currentVersion;
						newClientVersion = clientUpdateCheckResult.newIsNewer ? clientUpdateCheckResult.newerVersion : null;
					}
				}, clientAutoUpdateInterval);
			} else {
				if (clientAutoUpdateCheckInterval) {
					clearInterval(clientAutoUpdateCheckInterval);
					clientAutoUpdateCheckInterval = null;
				}
			}
		}

	}

	// Tray logic stored in a function:
	updateMenu();
	
});

const updateMenu = () => {
	
	tray.setToolTip('Sourcepool');

	if (process.platform === 'win32') {
		tray.on('click', (event, bounds) => {
			tray.popUpContextMenu();
		});
	}

	let menuItems = [
		{
			label:`Sourcepool ${serverVersion}`,
			enabled: false
		},
		{
			label: 'Open Sourcepool',
			sublabel:`Client: ${clientVersion}`,
			click() { 
				shell.openExternal(`http://localhost:${PORT}/`);
			}
		},
		{
			label: `Newer Client Version Available: ${newClientVersion}`,
			sublabel: clientVersion,
			visible: Boolean(newClientVersion),
			enabled: false
		},
		{
			label: `Update Local Client To ${newClientVersion}`,
			visible: Boolean(newClientVersion),
			async click() {
				let clientUpdateCheck = await fetch(`http://localhost:${PORT}/electron/updateLocalWebClient`);
				newClientVersion = clientUpdateCheck.newVersion || null;
			}
		},
		{ type: 'separator' },
		{
			label: 'Server Directories',
			submenu: [
				{
					label: 'External Data Packs Location',
					click() { 
						let dataPacksPath = path.join(app.getPath('documents'), "Sourcepool", "Server Data Packs");
						
						if (!fs.existsSync(dataPacksPath)){
							console.log("External data packs directory did not exist, creating it now...");
							fs.mkdirSync(dataPacksPath, {recursive: true});
						}
		
						const {openExplorer} = require('explorer-opener');
						openExplorer(dataPacksPath).then(() => {
							console.log("Opening data packs directory now...");
						}).catch((error) => {
							console.log(error);
						});
					}
				},
				{
					label: 'Internal Data Packs Location',
					click() { 
						// let databasePath = path.join(app.getPath('documents'), "Sourcepool", "Server Data Packs");
						let dataPacksPath = path.join(app.getPath('userData'), "bundledDataPacks");
						if (!fs.existsSync(dataPacksPath)){
							console.log("Internal data packs directory did not exist, creating it now...");
							fs.mkdirSync(dataPacksPath, {recursive: true});
							console.warn("Internal Data Packs directory was just created, and is currently empty. Fix this!");
						}
		
						const {openExplorer} = require('explorer-opener');
						openExplorer(dataPacksPath).then(() => {
							console.log("Opening data packs directory now...");
						}).catch((error) => {
							console.log(error);
						});
					}
				},
				{
					label: 'Database Location',
					click() { 
						// let databasePath = path.join(app.getPath('documents'), "Sourcepool", "Server Data Packs");
						let databasePath = path.join(app.getPath('userData'), "data");
						if (!fs.existsSync(databasePath)){
							console.log("Database directory did not exist, creating it now...");
							fs.mkdirSync(databasePath, {recursive: true});
						}
		
						const {openExplorer} = require('explorer-opener');
						openExplorer(databasePath).then(() => {
							console.log("Opening database directory now...");
						}).catch((error) => {
							console.log(error);
						});
					}
				}
			]
		},
		{ type: 'separator' },
		{
			label: 'Quit',
			async click() {
				let confirmationResult = await dialog.showMessageBox({
					message:"Are you sure you want to quit?",
					type:"question",
					buttons: [
						"Yes","No"
					],
					defaultId: 1,
					cancelId: 1,
					detail: "Your campaigns, characters, and other game data within Sourcepool are not accessible when the server is not running.",
					title: "Sourcepool Server"
				});
				console.log(confirmationResult);
				if (confirmationResult.response == 0){
					app.quit(); 
				}
			}
		}
	  ];
	
	const menu = Menu.buildFromTemplate(menuItems);

	  
	tray.setContextMenu(menu);
}

