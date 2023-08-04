const express = require('express');
const app = express();

// Configure some basic Helmet settings on the server instance.
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));

// CORS settings
// For now, just allow all traffic from all sources to reach this API.
var cors = require('cors')
app.use(cors());

// Debug error handling
void process.on('unhandledRejection', (reason, p) => {
	console.log(`Things got pretty major here! Big error:\n`+ JSON.stringify(p));
	console.log(`That error happened because of:\n` + reason);
});


const {databaseConnector} = require('./database');
let db = null;
(async () => {
	if (process.env.NODE_ENV != 'test'){
		db = await databaseConnector();
	}
})();



app.get("/", (request, response) => {
	response.json({
		message:"Hello world!"
	});
});

app.get("/envs", (request, response) => {
	response.json({
		envs: process.env
	});
});


app.get("/databaseHealth", (request, response) => {

	response.json({
		collections: Object.keys(db)
	});
});




module.exports = {app};