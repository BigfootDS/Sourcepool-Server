const {ServerConfig} = require("../models/extendsDocument/ServerConfig");

const readServerConfig = async (request, response, next) => {
	let serverSettings = await ServerConfig.findOne({});
	if (serverSettings) {
		request.serverSettings = serverSettings;
		//console.log("Attached server settings to request:\n" + JSON.stringify(request.serverSettings,null,4));
		return next();
	} else {
		return response.status(500).json({
			error: "Something went wrong loading the server settings. Please contact your server manager and tell them to look into the problem!"
		});
	}
}

const checkUpsertFlag = async (request, response, next) => {
	if (!request.serverSettings.allowUpserts){
		response.status(403).json({
			message: "Upserts are not allowed, so PUT requests are not allowed.\nPlease use a PATCH request instead, or ask a server admin to change the upsert setting within the server."
		});
	} else {
		next();
	}
}


module.exports = {
	readServerConfig,
	checkUpsertFlag
}