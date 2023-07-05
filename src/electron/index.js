const path = require('node:path');
const { spawn, fork } = require('node:child_process');
const { name } = require("../../package.json");

const { app, BrowserWindow, nativeImage, Tray, Menu, shell } = require('electron');
const appName = app.getPath("exe");
const expressAppUrl = "http://127.0.0.1:3000";
let mainWindow = null;
const {server} = "../server/index.js";

let tray = null;
let browserWindow = null;
let expressServerProcess = null;

app.whenReady().then(async () => {
	if (app.dock) app.dock.hide();

	expressServerProcess =  fork(`${__dirname}/../server/index.js`, [], {
		cwd: `${__dirname}/../`
	});
	

	let icon = nativeImage.createFromPath('./icons/iconTemplate.png');
	icon = icon.resize({
		width: 16
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

				shell.openExternal("http://localhost:3000/")

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

