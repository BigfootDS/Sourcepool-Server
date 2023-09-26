const Document = require('camo').Document;


/**
 * A settings document about this Sourcepool server. Not associated with any game or campaign or anything like that.
 * @date 8/28/2023 - 8:51:31 PM
 * @author BigfootDS
 *
 * @class
 * @property {Boolean} usersNeedPasswords Required, default value of false. If false, users do not need a password to act as a specific user. Users can still set their own passwords though.
 * @property {Boolean} onlyAdminCanEditServer Required, default value of false. If false, any user can edit any server setting.
 * @property {Boolean} onlyAdminCanEditContent Required, default value of false. If false, any user can edit any game, campaign or other content-type data.
 * @extends {Document}
 */
class ServerConfig extends Document{
	constructor(){
		super();

		this.name = {
			type:String,
			default: "Sourcepool Server",
			required: true
		}

		this.ftueComplete = {
			type: Boolean,
			default: false,
			required: true
		}

		this.usersNeedPasswords = {
			type: Boolean,
			default: false,
			required: true
		}

		this.onlyAdminCanEditServer = {
			type: Boolean,
			default: false,
			required: true
		}

		this.onlyAdminCanEditContent = {
			type: Boolean,
			default: false,
			required: true
		}

		this.allowUpserts = {
			type: Boolean,
			default: true,
			required: true
		}

		this.usersCanDeleteSelf = {
			type: Boolean,
			default: true,
			required: true
		}

	}

	static collectionName() {
		return 'serverconfigs';
	}


}


module.exports = {
	ServerConfig
}