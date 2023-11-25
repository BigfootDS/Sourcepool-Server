const camo = require('camo');
const { LocalizedContent } = require('../extendsEmbeddedDocument/LocalizedContentSubdocument');
const Document = camo.Document;

class Role extends Document {
	constructor(){
		super();

		this.admin = {
			type: Boolean,
			default: false,
			required: true
		}

		this.descriptions = {
			type: [LocalizedContent],
			required: true
		}
		
	}

	static getCollectionName() {
		return 'roles';
	}
}


module.exports = { Role };