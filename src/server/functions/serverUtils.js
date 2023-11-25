


const {databaseConnector} = require('../database');
const { Game } = require('../models/extendsCustomBaseDocument/GameModel');
const { User } = require('../models/extendsDocument/UserModel');
const { Campaign } = require('../models/extendsCustomBaseDocument/CampaignModel');
const {ServerConfig} = require('../models/extendsDocument/ServerConfig');
const { createDefaultData } = require('../data/presets/dnd5e');
let db = null;
const databaseInitCheck = async () => {
	if (process.env.NODE_ENV != 'test'){
		db = await databaseConnector();
		if (db == null){
			console.error("Database connection failed, exiting the server now.");
			process.exit();
		}
		let userCount = await User.findOne({});
		if (userCount == null){
			// console.log("No users exist in this server yet, making a default admin user now.");
			// let newAdmin = User.create({
			// 	username: "admin",
			// 	password: "Password1",
			// 	isAdmin: true
			// });
			// let savedAdmin = await newAdmin.save();
			// console.log("New admin now exists:\n" + JSON.stringify(savedAdmin, null, 4));
			console.log("No users exist yet - use a client to make one and set up the server!");
		}


		let serverSettings = await ServerConfig.findOne({});
		if (serverSettings == null){
			console.log("No settings were configured, creating server default settings now.");
			let newServerSettings = ServerConfig.create({
				requireAuth: false
			});
			let savedServerSettings = await newServerSettings.save();
			console.log("New server settings now exists:\n" + JSON.stringify(savedServerSettings, null, 4));
		} else {
			console.log("Server settings found.");
			if (!serverSettings.ftueComplete){
				console.log("Server setup has not been completed.\nPlease log in with your admin credentials and read the online documentation to finish setting up the server.");
			}
		}

		console.log("Seeding default game data...");
		await createDefaultData().catch(error => console.log(error));


		console.log("Database loaded.");
	}
}



module.exports = {
	databaseInitCheck
}