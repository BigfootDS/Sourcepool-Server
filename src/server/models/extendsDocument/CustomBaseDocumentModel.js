const camo = require('camo');
const Document = camo.Document;
const { LocalizedContent } = require('../extendsEmbeddedDocument/LocalizedContentSubdocument');
const { ContentPermission } = require('../extendsEmbeddedDocument/ContentPermissionSubdocument');
const { User } = require('./UserModel');
const { Role } = require('./RoleModel');


/**
 * Localized content and tags of an entity. This model should be used via inheritance (Camo, NeDB) or discriminators (MongooseJS).
 * @author BigfootDS
 *
 * @class
 * @property {[LocalizedContent]} descriptions Required. A collection of LocalizedContent subdocuments to store variations of names & descriptions of this entity in multiple languages. At least one LocalizedContent (title and content) must exist so that humans can see what entity they're looking at.
 * @property {[String]} tags Optional. A list of strings that can be used to filter and search for this entity.
 * @extends {Document}
 
Example data:
 ```js
 {
	descriptions: [
		 {
			language: "en",
			name: "Excalibur",
			content: "That super cool sword from legends of old. "
		},
		{
			language: "fr",
			name: "Excalibur",
			content: "C'est l'epee super cool de myths. "
		}
	],
	tags: [
		"sword", 
		"magic"
	]
 }
 ```
 */
class CustomBaseDocument extends Document {
	constructor(){
		super();

		/**
		 * A collection of LocalizedContent subdocuments to store variations of names & descriptions of this entity in multiple languages.
		 * Required. At least one LocalizedContent (title and content) must exist so that humans can see what entity they're looking at.
		 */
		this.descriptions = {
			type: [LocalizedContent],
			required: true
		}

		/**
		 * A collection of plain ol' strings, useful for filtering and searching for entities.
		 * Optional. Not all entities need tags.
		 */
		this.tags = {
			type: [String],
			required: false
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
		return 'customBaseDocuments';
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


module.exports = { CustomBaseDocument };