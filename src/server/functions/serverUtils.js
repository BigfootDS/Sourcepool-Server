


const {databaseConnector} = require('../database');
const { Game } = require('../models/GameModel');
const { User } = require('../models/UserModel');
const { Campaign } = require('../models/CampaignModel');
const {ServerConfig} = require('../models/ServerConfig');
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
			console.log("No users exist in this server yet, making a default admin user now.");
			let newAdmin = User.create({
				username: "admin",
				password: "Password1",
				isAdmin: true
			});
			let savedAdmin = await newAdmin.save();
			console.log("New admin now exists:\n" + JSON.stringify(savedAdmin, null, 4));
		}


		let serverSettings = await ServerConfig.findOne({});
		if (serverSettings == null){
			console.log("No settings were configured, creating server default settings now.");
			let newServerSettings = ServerConfig.create({
				requireAuth: false
			});
			let savedServerSettings = await newServerSettings.save();
			console.log("New server settings now exists:\n" + JSON.stringify(savedServerSettings, null, 4));
		}

		console.log("Seeding default game data...");
		await createDefaultData().catch(error => console.log(error));
		// Just force models to exist for structure/debugging purposes
		// let dummyGame = Game.create({
		// 	name:"SYSTEM game please ignore"
		// });

		// let dummyCampaign = Campaign.create({
		// 	name: "SYSTEM campaign please ignore",
		// 	game: dummyGame._id,
		// 	manager: await User.findOne({isAdmin: true})._id
		// });

		// await Campaign.deleteOne({name:"SYSTEM campaign please ignore"});
		// await Game.deleteOne({name:"SYSTEM game please ignore"});

		console.log("Database loaded.");
	}
}



module.exports = {
	databaseInitCheck
}