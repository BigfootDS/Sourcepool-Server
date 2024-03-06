// const Datastore = require('@seald-io/nedb');

var camo = require('camo');

let db = null;

async function databaseConnector(){
	db = null;
	try {
		console.log(`Checking for database at: ${global.databasePath} \n`)
		db = await camo.connect(`nedb://${global.databasePath}`);
		global.modelUtils.helpers.pingAllModels();
		console.log("Server connected to database!");
		return db;
	  } catch (error) {
		console.log("Database loading failed, here is the error:\n" + error);
		return null;
	  }
}

/**
 * Create default data for specific game presets.
 * @param {string} gamePreset Short code of the TTRPG that the data is being made for. For example, "d&d5e" for Dungeons & Dragons 5th Edition.
 */
async function createDefaultData(gamePreset){
	if (db == null){
		throw new Error("Database not available, something is going wrong. Report this to the project's GitHub repository, please!");
	}
}

module.exports = {
    databaseConnector,
	db
}