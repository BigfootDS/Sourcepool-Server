const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const router = express.Router();
var downloadRelease = require('download-github-release');
const semver = require('semver');
const { ServerConfig } = require('../models/ServerConfig');

router.get("/updateLocalWebClient", async (request, response) => {
	let localWebClientPath = path.join(process.env.userStorageDir, 'localWebClient');


	let currentVersion = semver.coerce(request.serverSettings.localWebClientVersion);
	let shouldDownloadNewClient = false;
	if (!semver.valid(currentVersion)){
		shouldDownloadNewClient = true;
	}

	let latestWebClientReleaseResponse = await fetch('https://api.github.com/repos/BigfootDS/Sourcepool-Client-Web/releases/latest').catch(error => {
		response.json(error);
	});
	let latestWebClientReleaseJson = await latestWebClientReleaseResponse.json();
	let latestSemver = semver.coerce(latestWebClientReleaseJson.tag_name);

	if (semver.lt(currentVersion, latestSemver)){
		shouldDownloadNewClient = true;
		console.log("New web client found online, will download it shortly.");
	}

	if (shouldDownloadNewClient){
		let user = "BigfootDS";
		let repo = "Sourcepool-Client-Web";
		
		function filterOutPrereleases(release){
			return release.prerelease === false;
		}
	
		let result = await downloadRelease(user, repo, localWebClientPath, filterOutPrereleases);
		console.log("Downloaded new webclient. Saved and unzipped into: " + localWebClientPath);

		let serverSettingsDb = await ServerConfig.findOne({});
		serverSettingsDb.localWebClientVersion = latestWebClientReleaseJson.tag_name;
		await serverSettingsDb.save();
		console.log("Updated server settings in DB to reflect new client version: " + latestWebClientReleaseJson.tag_name);

	}

	response.json({
		clientUpdated: shouldDownloadNewClient,
		path: localWebClientPath,
		newVersion: latestSemver.version,
		shouldAutoUpdate: request.serverSettings.shouldAutoUpdateLocalWebClient
	});

});

router.get("/checkForNewLocalWebClient", async (request, response) => {
	let currentVersion = semver.coerce(request.serverSettings.localWebClientVersion);
	if (!semver.valid(currentVersion)){
		currentVersion = "0.0.0"
	}

	let latestWebClientReleaseResponse = await fetch('https://api.github.com/repos/BigfootDS/Sourcepool-Client-Web/releases/latest').catch(error => {
		response.json(error);
	});
	let latestWebClientReleaseJson = await latestWebClientReleaseResponse.json();
	let latestSemver = semver.coerce(latestWebClientReleaseJson.tag_name);

	response.json({
		currentVersion: currentVersion.version, 
		newerVersion: latestSemver.version,
		newIsNewer: semver.lt(currentVersion, latestSemver),
		clientShouldAutoUpdate: request.serverSettings.shouldAutoUpdateLocalWebClient,
		clientAutoUpdateInterval: request.serverSettings.clientAutoUpdateInterval
	});
})



module.exports = router;