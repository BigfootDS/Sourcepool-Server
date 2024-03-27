var downloadRelease = require('download-github-release');
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");
const { ServerPlugin } = require("../models/extendsDocument/ServerPluginModel");
const { findNthOccurence } = require('./stringHelpers');
const { LocalizedContent } = require('../models/extendsEmbeddedDocument/LocalizedContentSubdocument');
const semver = require('semver');
const { ContentPermission } = require('../models/extendsEmbeddedDocument/ContentPermissionSubdocument');
const { ServerConfig } = require('../models/extendsDocument/ServerConfig');

let pluginDirectory = global.serverPlugins;

// Plugin discovery
async function discoverLocalPlugins(){
	// Find all subfolders of pluginDirectory that contain a package.json
	let availablePluginDirs = [];

	let potentialPluginDirs = fs.readdirSync(pluginDirectory, { withFileTypes: true });
	potentialPluginDirs = potentialPluginDirs.filter((directory) => directory.isDirectory())
	
	availablePluginDirs = potentialPluginDirs.map((directory) => {return path.join(pluginDirectory, directory.name)});


	for (const directoryPath of availablePluginDirs) {
		let potentialMetadataPath = path.join(directoryPath, "package.json");
		console.log("Searching for: " + potentialMetadataPath);

		try {
			await fsPromise.access(potentialMetadataPath, fs.constants.R_OK);
			

			// For each found package.json of a plugin,
			// check if we have a database entry of that plugin.
			// If we don't, we need to make one.
			let serverConfig = await global.modelUtils.models.extendsDocument.ServerConfig.find({});
			const packageMeta = require(potentialMetadataPath);
			let existingDbEntry = await ServerPlugin.findOne({name: packageMeta.name, namespace: packageMeta.sourcepool.namespace});
			if (existingDbEntry == null){
				let newEntry = await ServerPlugin.create({
					name: packageMeta.name,
					namespace: packageMeta.sourcepool.namespace,
					author: packageMeta.author,
					sourceUrl: packageMeta.sourcepool.sourceUrl,
					localPath: directoryPath,
					version: packageMeta.version,
					loadPriority: packageMeta.sourcepool.loadPriority,
					thumbnailImageFilePath: path.resolve(path.join(directoryPath, packageMeta.sourcepool.thumbnailImageFilePath)),
					headerImageFilePath: path.resolve(path.join(directoryPath, packageMeta.sourcepool.headerImageFilePath)),
					descriptionsBrief: packageMeta.sourcepool.descriptionsBrief.map((description) => LocalizedContent.create(description)), // LocalizedContent array
					descriptionsFull: packageMeta.sourcepool.descriptionsFull.map((description) => LocalizedContent.create(description)), // LocalizedContent array
					tags: packageMeta.sourcepool.tags.map((tag) => LocalizedContent.create(tag)), // LocalizedContent array
					permissions: serverConfig.defaultPluginsCRUDPermissions
				}).save();
				console.log("New entry created:\n" + JSON.stringify(newEntry, null, 4));
			} else {
				if (semver.gt(packageMeta.version, existingDbEntry.version)){
					// Local files are newer than what the server DB has noted,
					// update the DB entry!
					existingDbEntry.version = packageMeta.version;
					existingDbEntry.author = packageMeta.author;
					existingDbEntry.loadPriority = packageMeta.sourcepool.loadPriority;
					existingDbEntry.thumbnailImageFilePath = path.resolve(path.join(directoryPath, packageMeta.sourcepool.thumbnailImageFilePath));
					existingDbEntry.headerImageFilePath = path.resolve(path.join(directoryPath, packageMeta.sourcepool.headerImageFilePath));
					existingDbEntry.descriptionsBrief = packageMeta.sourcepool.descriptionsBrief.map((description) => LocalizedContent.create(description));
					existingDbEntry.descriptionsFull = packageMeta.sourcepool.descriptionsFull.map((description) => LocalizedContent.create(description));
					existingDbEntry.tags = packageMeta.sourcepool.tags.map((tag) => LocalizedContent.create(tag));

					await existingDbEntry.save();

					console.log("Plugin updated its database entry:\n" + JSON.stringify(existingDbEntry, null, 4));
				}
			}


		} catch (error) {
			console.warn("Plugin directory exists but package.json is missing: " + potentialMetadataPath);
		}

		
	};

	// Call the pluginLoader to load all plugins again.
	await pluginLoader();
}

// Check directory for plugin
async function processDirectoryAsPlugin(targetDirectory){
	if (targetDirectory == null) return {error:"Target directory not provided."};

	let potentialMetadataPath = path.join(targetDirectory, "package.json");
	console.log("Searching for: " + potentialMetadataPath);

	try {
		await fsPromise.access(potentialMetadataPath, fs.constants.R_OK);
		

		// For each found package.json of a plugin,
		// check if we have a database entry of that plugin.
		// If we don't, we need to make one.
		const packageMeta = require(potentialMetadataPath);
		//console.log(packageMeta.sourcepool);
		let existingDbEntry = await ServerPlugin.findOne({name: packageMeta.name, namespace: packageMeta.sourcepool.namespace});
		
		let serverConfig = await ServerConfig.findOne({});
		
		
		if (existingDbEntry == null){


			let newEntry = await ServerPlugin.create({
				name: packageMeta.name,
				namespace: packageMeta.sourcepool.namespace,
				author: packageMeta.author,
				sourceUrl: packageMeta.sourcepool.sourceUrl,
				localPath: targetDirectory,
				version: packageMeta.version,
				loadPriority: packageMeta.sourcepool.loadPriority,
				thumbnailImageFilePath: path.resolve(path.join(targetDirectory, packageMeta.sourcepool.thumbnailImageFilePath)),
				headerImageFilePath: path.resolve(path.join(targetDirectory, packageMeta.sourcepool.headerImageFilePath)),
				descriptionsBrief: packageMeta.sourcepool.descriptionsBrief.map((description) => {
					console.log(description);
					return LocalizedContent.create(description);
				}), // LocalizedContent array
				descriptionsFull: packageMeta.sourcepool.descriptionsFull.map((description) => {
					console.log(description);
					return LocalizedContent.create(description);
				}), // LocalizedContent array
				tags: packageMeta.sourcepool.tags.map((tag) => {
					console.log(tag);
					return LocalizedContent.create(tag);
				}), // LocalizedContent array
				permissions: serverConfig.defaultPluginsCRUDPermissions.map(permissionTable => {
					return ContentPermission.create({
						role: permissionTable.role,
						create: permissionTable.create,
						read: permissionTable.read,
						update: permissionTable.update,
						delete: permissionTable.delete
					});
				})
			}).save();
			console.log("New entry created:\n" + JSON.stringify(newEntry, null, 4));
		} else {
			if (semver.gt(packageMeta.version, existingDbEntry.version)){
				// Local files are newer than what the server DB has noted,
				// update the DB entry!
				existingDbEntry.version = packageMeta.version;
				existingDbEntry.author = packageMeta.author;
				existingDbEntry.loadPriority = packageMeta.sourcepool.loadPriority;
				existingDbEntry.thumbnailImageFilePath = path.resolve(path.join(directoryPath, packageMeta.sourcepool.thumbnailImageFilePath));
				existingDbEntry.headerImageFilePath = path.resolve(path.join(directoryPath, packageMeta.sourcepool.headerImageFilePath));
				existingDbEntry.descriptionsBrief = packageMeta.sourcepool.descriptionsBrief.map((description) => LocalizedContent.create(description));
				existingDbEntry.descriptionsFull = packageMeta.sourcepool.descriptionsFull.map((description) => LocalizedContent.create(description));
				existingDbEntry.tags = packageMeta.sourcepool.tags.map((tag) => LocalizedContent.create(tag));

				await existingDbEntry.save();

				console.log("Plugin updated its database entry:\n" + JSON.stringify(existingDbEntry, null, 4));
			} else {
				// do nothing, just return existing DB entry as-is
			}
		}

		return existingDbEntry;
	} catch (error) {
		console.warn(error);
		console.warn("Plugin directory exists but package.json is missing: " + potentialMetadataPath);
		return {error: "Plugin directory exists but package.json is missing: " + potentialMetadataPath}
	}

}


/**
 * Load all plugins tracked by the server's database.
 */
async function pluginLoader(){
	console.log("Parent app start");

	// Find all plugins in DB
	// Sort them by loadPriority from lowest to highest, lowest first
	let pluginsInDatabase = await ServerPlugin.find({}, {sort: 'loadPriority'});

	for (const plugin of pluginsInDatabase) {
		let pluginMetadataPath = path.join(plugin.localPath, "package.json");
		let pluginMetadata = require(pluginMetadataPath);
		let pluginEntryPointPath = path.join(plugin.localPath, pluginMetadata.main);
		let pluginEntryPoint = require(pluginEntryPointPath);
		console.log("Starting plugin:\n" + pluginMetadata.name + "\n" + pluginEntryPointPath);
		await pluginEntryPoint.startPlugin();

	}	
	

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
	
	let pluginSpecificDirectory = path.resolve(path.join(pluginDirectory, repo));

	if (!fs.existsSync(pluginSpecificDirectory)){
		fs.mkdirSync(pluginSpecificDirectory);
	}

	function filterOutPrereleases(release){
		return release.prerelease === false;
	}

	console.log(pluginDirectory);

	let result = await downloadRelease(user, repo, pluginSpecificDirectory, filterOutPrereleases);
	let newPluginLocation = pluginSpecificDirectory
	console.log("Storing new plugin in: " + newPluginLocation)
	if (!fs.existsSync(newPluginLocation)){
		return {error: "Plugin download failed.", repoUrl: repoUrl};
	} else {
		await processDirectoryAsPlugin(newPluginLocation);
		await pluginLoader();
	}
}

// Plugin local file deletion
async function deleteSpecificPlugin(serverPluginId){
	console.log("Deleting a specific plugin is not yet implemented, sorry!");
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
	downloadPluginFromGithubUrl,
	discoverLocalPlugins,
	pluginLoader,
	deleteSpecificPlugin,
	processDirectoryAsPlugin
}