const {ServerConfig} = require("../models/ServerConfig");

const readServerConfig = async (request, response, next) => {
	let serverSettings = await ServerConfig.findOne({});
	if (serverSettings) {
		request.serverSettings = serverSettings;
		console.log("Attached server settings to request:\n" + JSON.stringify(request.serverSettings,null,4));
		return next();
	} else {
		return response.status(500).json({
			error: "Something went wrong loading the server settings. Please contact your server manager and tell them to look into the problem!"
		});
	}
}


module.exports = {
	readServerConfig
}