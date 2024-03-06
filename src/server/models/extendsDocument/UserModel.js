const camo = require('camo');
const Document = camo.Document;
const {Role} = require("./RoleModel");
const { ContentPermission } = require('../extendsEmbeddedDocument/ContentPermissionSubdocument');

class User extends Document {
	constructor(){
		super();

		this.username = {
			type: String,
			required: true,
			unique: true
		}

		this.password = {
			type: String,
			required: true,
			unique: false
		}

		this.roles = {
			type: [Role],
			required: true,
			default: async () => {
				if (this.roles == null || this.roles.length == 0){
					let defaultUserRole = await Role.findOne({"descriptions.name":"User"});
					if (defaultUserRole){
						return defaultUserRole._id;
					}
				}
			}
		}

		this.permissions = {
			type: [ContentPermission],
			required: false
		}

		this.editedBy = {
			type: [User],
			required: false
		}
	}

	static getCollectionName() {
		return 'users';
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


module.exports = { User };