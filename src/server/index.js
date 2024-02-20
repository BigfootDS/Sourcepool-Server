// Make any environment variables ready for use if they're in a .env file
const dotenv = require('dotenv');
dotenv.config();

// This is provided by ElectronJS at runtime, so customise it when doing server-only development!
if (!process.env.userStorageDir || process.env.userStorageDir == undefined){
	let home = process.env.APPDATA || process.env.HOME;
	process.env.userStorageDir = home + "/" + process.env.npm_package_name;
}

// Custom globals depend on process.env.userStorageDir, so that needs to be setup first!
require('./customGlobals.js');
console.log(global);

// Get server settings from database
const { databaseInitCheck } = require('./functions/serverUtils');
let serverSettings = null;

try {
	
	serverSettings = (async () => {
		await databaseInitCheck();
		let result = await ServerConfig.findOne({});
		console.log("Found server settings!");
		console.log(result.toJSON());
		console.log("Carrying on with server boot-up now.");
		return result;
	})();
} catch (error) {
	console.log("--- Error occured! --- ")
	console.warn(error);
	process.exit(1);
}



const ip = require('ip');
let localIp = ip.address();
// let autoHostname = require('os').hostname();
console.log("Sourcepool Server now starting up on " + localIp);

// Server config order of priority:
// 1. ".env" file values
// 2. Database values
// 3. Default values
const HOST = process.env.HOST || serverSettings.host || 'localhost';
const PORT = process.env.PORT || serverSettings.port || 7474;
/* 
Wanna be inline with Servarr ports
Radarr = 7878
Sonarr = 8989
Lidarr = 8686
Readarr = 8787
Whisparr = 6969
Prowlarr = 9696

Sourcepool = 7474

D&D1E was released in 1974, so 1974 -> 74 -> 7474.
*/

const {app} = require('./server.js');

const detect = require('detect-port');
const { ServerConfig } = require('./models/extendsDocument/ServerConfig.js');

detect(PORT).then(_port => {
	if (PORT == _port){
		// port is available to use
		app.listen(PORT, HOST, () => {
			console.clear();
			console.log("Server running!");
		});
	} else {
		// port is not available to use
		console.warn(
`Port ${PORT} was not available, Sourcepool will now close.`);
		process.exit(1);
	}
}).catch(error => {
	//console.log(error);
});

