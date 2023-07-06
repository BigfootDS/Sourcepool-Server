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

app.get("/", (request, response) => {
	response.json({
		message:"Hello world!"
	});
});

module.exports = {app};