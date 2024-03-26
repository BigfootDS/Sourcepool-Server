var downloadRelease = require('download-github-release');

const { ServerPlugin } = require("../models/extendsDocument/ServerPluginModel");
const { findNthOccurence } = require('./stringHelpers');

let pluginDirectory = global.serverPlugins;

// Plugin discovery
async function discoverLocalPlugins(){
	// Find all subfolders of pluginDirectory that contain a package.json

	// Install each package.json's dependencies?

	// Run each package.json's start command?
	//	- each plugin should be finding and either creating or updating its relevant ServerPlugin document

	// Log a count of how many plugins were just discovered & setup.
}

 
/**
 * Plugin download via git URL
 *  *
 * @async
 * @param [repoUrl="https://github.com/BigfootDS/Sourcepool-Server-Test-Plugin"]
 * @returns
 */
async function downloadPluginFromGithubUrl(repoUrl = "https://github.com/BigfootDS/Sourcepool-Server-Test-Plugin"){
	let user = repoUrl.slice(19,findNthOccurence(repoUrl, 4, "/"));
	let repo = repoUrl.slice(findNthOccurence(repoUrl, 4, "/") + 1);
	
	function filterOutPrereleases(release){
		return release.prerelease === false;
	}

	let result = await downloadRelease(user, repo, pluginDirectory, filterOutPrereleases);
	return result;
}

// Plugin local file deletion
async function deleteSpecificPlugin(serverPluginId){
	// Find ServerPlugin with matching ID

	// Find local directory storing that plugin

	// Delete the directory and all of its contents

	// Delete the ServerPlugin document
}


// Plugin creation from database document IDs
	// Basically picturing that there'd be some UI
	// where a user can create a bit list of selected documents
	// and export those into a plugin.
	// This would let people use the system to create their plugins,
	// if they just want to make data-only plugins.


module.exports = {
	downloadPluginFromGithubUrl
}