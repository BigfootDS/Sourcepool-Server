// Prevent weird behaviours during Windows installation:
if(require('electron-squirrel-startup')) return;

// May be useless until we get code signing sorted out on 
// MacOS and Windows:
require('update-electron-app')()


const fs = require('fs');
const path = require('node:path');

const { app, Tray, Menu, shell, nativeImage } = require('electron');

let tray = null;
const PORT = 7474;

app.whenReady().then(async () => {
	// If MacOS app dock is available, hide the app
	if (app.dock) app.dock.hide();

	// Set package name in case Electron removes it,
	// it just helps with database file tidiness
	process.env.npm_package_name = "sourcepool-server";
	process.env.userStorageDir = app.getPath('userData');
	
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
	
	const menu = Menu.buildFromTemplate([
		{
			label: 'Server Info',
			click() { 
				shell.openExternal(`http://localhost:${PORT}/`);
			}
		},
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
		},
		{ type: 'separator' },
		{
			label: 'Quit',
			click() {
				app.quit(); 
			}
		}
	  ]);

	  
	  tray.setContextMenu(menu);
}

