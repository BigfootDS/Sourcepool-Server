const Datastore = require('@seald-io/nedb');

var camo = require('camo');


let db = null;

// Require models here so the database has some structure
// even if no data exists in it.
const {User} = require('./models/UserModel');
const {Game} = require('./models/GameModel');
const {Campaign} = require('./models/CampaignModel');

async function databaseConnector(){
	db = null;
	try {
		db = await camo.connect(`nedb://${process.env.userStorageDir}/data`);
		
		console.log("Server connected to database!");
		return db;
	  } catch (error) {
		console.log("Database loading failed, here is the error:\n" + error);
		return null;
	  }
}



module.exports = {
    databaseConnector,
	db
}