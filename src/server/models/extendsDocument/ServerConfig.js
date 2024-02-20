const { ContentPermission } = require('../extendsEmbeddedDocument/ContentPermissionSubdocument');
const { Role } = require('./RoleModel');
const { User } = require('./UserModel');

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
			default: true,
			required: true
		}

		this.onlyAdminCanEditServer = {
			type: Boolean,
			default: false,
			required: true
		}

		this.onlyAdminCanEditContent = {
			type: Boolean,
			default: true,
			required: true
		}



		this.usersCanDeleteSelf = {
			type: Boolean,
			default: true,
			required: true
		}

		this.localWebClientVersion = {
			type: String,
			default: 'v0.0.0',
			required: true
		}

		this.shouldAutoUpdateLocalWebClient = {
			type: Boolean,
			default: true,
			required: true
		}

		// Check once per hour
		this.clientAutoUpdateInterval = {
			type: Number,
			default: 1000 * 60 * 60,
			required: true
		}

		this.jwtEncryptionKey = {
			type: String,
			default: "Customise this to increase the security level of the server's password encryption.",
			required: true
		}

		this.jwtLifetimeBeforeExpiry = {
			type: String,
			default: "7d",
			// Choices provided here are arbitrary, but functionally this shouldn't matter
			// as the frontend can refresh JWTs periodically automatically anyway, and
			// it's not like users can do anything if they're not connected to the server.
			choices: ["1h", "12h", "1d", "2d", "3d", "7d", "14d", "21d", "28d", "30d"],
			required: true
		}

		this.passwordSaltCostFactor = {
			type: Number,
			default: 8,
			required: true
		}

		this.permissions = {
			type: [ContentPermission],
			required: true
		}

		this.editedBy = {
			type: [User],
			required: false
		}

		this.defaultDatapacksCRUDPermissions = {
			type: [ContentPermission],
			required: true,
		}

		this.defaultPluginsCRUDPermissions = {
			type: [ContentPermission],
			required: true,
		}

		// eg. if two datapacks both belong to "D&D SRD 5.1 CC", 
		// this setting being true will cause two copies of that Product to exist.
		// Otherwise, the datapack importer will find products of the same name first
		// and use the first found Product document instead.
		this.datapacksCreateDuplicateProducts = {
			type: Boolean,
			required: true,
			default: false
		}

	}

	static collectionName() {
		return 'serverconfigs';
	}


	async preSave(){
		if (this.permissions == null || this.permissions == [] || this.permissions.length == 0){
			//console.log("Applying default content permissions to a document.");
			let regularUserRole = await Role.findOne({"descriptions.name":"User"});
			let adminUserRole = await Role.findOne({admin: true});

			if (regularUserRole == null || adminUserRole == null) {
				throw ("Roles for default content permissions were not found!");
			}

			let regularUserRoleSubdoc = await ContentPermission.create({
				role: regularUserRole._id,
				create: false,
				read: true,
				update: false,
				delete: false
			});

			let adminUserRoleSubdoc = await ContentPermission.create({
				role: adminUserRole._id,
				create: true,
				read: true,
				update: true,
				delete: true
			});

			this.permissions = [
				regularUserRoleSubdoc,
				adminUserRoleSubdoc
			];
		}
	}

}


module.exports = {
	ServerConfig
}