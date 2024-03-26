const { Document } = require('camo');
const { LocalizedContent } = require('../extendsEmbeddedDocument/LocalizedContentSubdocument');
const { ContentPermission } = require('../extendsEmbeddedDocument/ContentPermissionSubdocument');


class ServerPlugin extends Document {
	constructor(){
		super();

		this.sourceUrl = {
			type: String,
			required: false
		}

		this.authorName = {
			type: String,
			required: false
		}

		this.version = {
			type: String,
			required: false,
			default: "0.0.1"
		}

		this.thumbnailImageFilePath = {
			type: String,
			required: false
		}

		this.headerImageFilePath = {
			type: String,
			required: false
		}

		this.descriptionsBrief = {
			type: [LocalizedContent],
			required: false
		}

		this.descriptionsFull = {
			type: [LocalizedContent],
			required: false
		}

		this.tags = {
			type: [LocalizedContent],
			required: false
		}

		this.permissions = {
			type: [ContentPermission],
			required: true
		}
		
	}

	static getCollectionName() {
		return 'serverPlugins';
	}
}


module.exports = { ServerPlugin };