const { CustomBaseDocument } = require('../extendsDocument/CustomBaseDocumentModel');
const { Product } = require('./ProductModel');


class Datapack extends CustomBaseDocument {
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
			required: false
		}

		this.thumbnailImageFilePath = {
			type: String,
			required: true
		}

		this.headerImageFilePath = {
			type: String,
			required: true
		}

		this.product = {
			type: Product,
			required: false
		}
		
	}

	static getCollectionName() {
		return 'datapacks';
	}
}


module.exports = { Datapack };