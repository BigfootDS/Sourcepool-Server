const Document = require('camo').Document;

class ServerConfig extends Document{
	constructor(){
		super();

		this.requireAuth = {
			type: Boolean,
			default: false
		}

	}

	static collectionName() {
		return 'serverconfigs';
	}


}


module.exports = {
	ServerConfig: ServerConfig
}