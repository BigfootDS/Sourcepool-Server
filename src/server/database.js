const Datastore = require('@seald-io/nedb')
let db = null;

// loading has succeeded
// Require models here so the database has some structure
// even if no data exists in it.
// const {User} = require('./models/User');

async function databaseConnector(databaseURL){
	db = new Datastore({ filename: databaseURL });
	try {
		await db.loadDatabaseAsync()
		console.log("Server connected to database!");
	  } catch (error) {
		console.log("Database loading failed, here is the attempted database URL:\n" + databaseURL);
	  }
}



module.exports = {
    databaseConnector,
	db
}