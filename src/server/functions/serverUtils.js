


const {databaseConnector} = require('../database');
const { User } = require('../models/extendsDocument/UserModel');
const {ServerConfig} = require('../models/extendsDocument/ServerConfig');
const { createDefaultData } = require('../data/presets/dnd5e');
const modelUtils = require('./modelUtils');
let db = null;
const databaseInitCheck = async () => {

	// Database stuff will almost definitely be handled differently in test suites.
	if (process.env.NODE_ENV == 'test'){
		return null;
	}
	

	db = await databaseConnector();
	if (db == null){
		console.error("Database connection failed, exiting the server now.");
		process.exit();
	}


	let userCount = await User.findOne({});
	if (userCount == null){
		console.log("No users exist yet - use a client to make one and set up the server!");
	}


	let serverSettings = await ServerConfig.findOne({});
	if (serverSettings == null){
		console.log("No settings were configured, creating server default settings shortly.");
	} else {
		console.log("Server settings found.");
		if (!serverSettings.ftueComplete){
			console.log("Server setup has not been completed.\nPlease log in with your admin credentials and read the online documentation to finish setting up the server.");
		}
	}

	await modelUtils.helpers.serverMinimalSetup();

	// console.log("Seeding default game data...");
	await createDefaultData().catch(error => console.log(error));


	console.log("Database loaded.");
}



module.exports = {
	databaseInitCheck
}