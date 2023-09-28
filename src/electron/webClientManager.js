// Checks if a web client is available in the app's directory
// If not, will reach out to GitHub to grab the latest release from Sourcepool-Client-Web
// and download it


const fs = require('fs');
const path = require('node:path');
var downloadRelease = require('download-github-release');

const { app } = require('electron');

async function checkForLocalClient(){
	let webClientTargetPath = path.join(app.getPath('userData'), "localWebClient");
	let doesClientExist = false;
	if (!fs.existsSync(webClientTargetPath)){
		console.log("webClientTargetPath directory did not exist, creating it now...");
		fs.mkdirSync(webClientTargetPath, {recursive: true});
		console.warn("webClientTargetPath directory was just created, and is currently empty. App should automatically download the latest web client after this message.");
	}

	return fs.existsSync(path.join(webClientTargetPath, "index.html"));
}

async function downloadNewClient(){
	let webClientTargetPath = path.join(app.getPath('userData'), "localWebClient");
	let user = "BigfootDS";
	let repo = "Sourcepool-Client-Web";
	
	function filterOutPrereleases(release){
		return release.prerelease === false;
	}

	let result = await downloadRelease(user, repo, webClientTargetPath, filterOutPrereleases);
	console.log("Downloaded new webclient. Result: " + result);
	return result;
}

module.exports = {
	checkForLocalClient, downloadNewClient
}