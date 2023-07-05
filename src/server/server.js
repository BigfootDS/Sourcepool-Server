const express = require('express');
const app = express();

var cors = require('cors')

app.use(cors());

app.get("/", (request, response) => {
	response.json({
		message:"Hello world!"
	});
});

module.exports = {app};