if(require('electron-squirrel-startup')) return;


const path = require('node:path');
const { spawn, fork } = require('node:child_process');
const { name } = require("../../package.json");

const { app, BrowserWindow, nativeImage, Tray, Menu, shell } = require('electron');
const appName = app.getPath("exe");
let mainWindow = null;

let tray = null;
let browserWindow = null;
let expressServerProcess = null;
const PORT = 7474;

app.whenReady().then(async () => {
	if (app.dock) app.dock.hide();
	console.clear();
	if (process.env.NODE_ENV ==  "development") {
		console.log("ElectronJS envs: \n"+JSON.stringify(process.env, null, 4));
	}
	expressServerEnvs = {...process.env};
	expressServerEnvs.PORT = PORT;
	expressServerEnvs.NODE_ENV = process.env.NODE_ENV || "development";
	expressServerEnvs.npm_package_name = process.env.npm_package_name || "sourcepool-server";

	expressServerProcess =  fork(`${__dirname}/../server/index.js`, [], {
		cwd: `${__dirname}/../`,
		env: expressServerEnvs

	});
	

	let icon = nativeImage.createFromPath(path.join(__dirname, 'public/favicon/android-chrome-192x192.png'));
	icon = icon.resize({
		width: 16,
		height: 16
	});
	icon.setTemplateImage(true);
	tray = new Tray(icon);

	if (process.platform === 'win32') {
		tray.on('click', tray.popUpContextMenu);
	}

	tray.setToolTip('Sourcepool');

	updateMenu();
	
});

const updateMenu = () => {
	const menu = Menu.buildFromTemplate([
		{
			label: 'Server Info',
			click() { 

				shell.openExternal(`http://localhost:${PORT}/`)

			}
		},
		{ type: 'separator' },
		{
			label: 'Quit',
			click() {
				expressServerProcess.kill('SIGINT');
				app.quit(); 
			}
		}
	  ]);
	  tray.setContextMenu(menu);
}

