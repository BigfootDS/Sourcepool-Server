const Datastore = require('@seald-io/nedb')
let db = null;

// loading has succeeded
// Require models here so the database has some structure
// even if no data exists in it.
// const {User} = require('./models/User');

async function databaseConnector(){
	db = {
		general: null,
		gameSettings: null,
		players: null
	};
	try {
		for (const dStore of Object.keys(db)){
			db[dStore] = new Datastore({ filename: `${process.env.npm_package_name}-${dStore}.db` });
			await db[dStore].loadDatabaseAsync()
		}
		
		console.log("Server connected to database!");
		return db;
	  } catch (error) {
		console.log("Database loading failed, here is the attempted database URL:\n" + databaseURL);
		return null;
	  }
}



module.exports = {
    databaseConnector,
	db
}