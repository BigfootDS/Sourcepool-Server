const path = require('node:path');
const { spawn, fork } = require('node:child_process');
const { name } = require("../../package.json");

const { app, BrowserWindow, nativeImage, Tray, Menu } = require('electron');
const appName = app.getPath("exe");
const expressAppUrl = "http://127.0.0.1:3000";
let mainWindow = null;
const {server} = "../server/index.js";

let tray = null;
let browserWindow = null;


app.whenReady().then(async () => {
	if (app.dock) app.dock.hide();

	let expressServerProcess =  fork(`${__dirname}/../server/index.js`, [], {
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


	tray.addListener('mouse-up', () => {
		browserWindow = new BrowserWindow();
		browserWindow.loadURL("http://localhost:3000/");
	})


	const menu = Menu.buildFromTemplate([
		{
		  label: 'Quit',
		  click() { app.quit(); }
		}
	  ]);
	
	  tray.setToolTip('Clipmaster');
	  tray.setContextMenu(menu);
	
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

