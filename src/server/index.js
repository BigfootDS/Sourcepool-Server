// Make any environment variables ready for use if they're in a .env file
const dotenv = require('dotenv');
dotenv.config();

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
D&D1E was released in 1974.
*/

const {app} = require('./server.js');

app.listen(3000, () => {
	console.log("Server running!");
});