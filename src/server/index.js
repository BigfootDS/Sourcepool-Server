// Make any environment variables ready for use if they're in a .env file
const dotenv = require('dotenv');
dotenv.config();


if (!process.env.userStorageDir || process.env.userStorageDir == undefined){
	let home = process.env.APPDATA || process.env.HOME;
	process.env.userStorageDir = home + "/" + process.env.npm_package_name;
}

// If no process.env.X is found, assign a default value instead.
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 7474;
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

