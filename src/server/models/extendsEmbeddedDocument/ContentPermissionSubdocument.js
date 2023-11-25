const camo = require('camo');
const { Role } = require('../extendsDocument/RoleModel');
const EmbeddedDocument = camo.EmbeddedDocument;

class ContentPermission extends EmbeddedDocument {
	constructor(){
		super();

		this.role = {
			type: Role,
			required: true
		}

		this.create = {
			type: Boolean,
			required: true,
			default: false
		}

		this.read = {
			type: Boolean,
			required: true,
			default: true
		}

		this.update = {
			type: Boolean,
			required: true,
			default: false
		}

		this.delete = {
			type: Boolean,
			required: true,
			default: false
		}
	}

	static getCollectionName() {
		return 'contentPermissions';
	}
}

module.exports = {ContentPermission}