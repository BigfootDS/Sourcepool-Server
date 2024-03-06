const { CustomBaseDocument } = require("../extendsDocument/CustomBaseDocumentModel");


class Game extends CustomBaseDocument {
	constructor(){
		super();

		this.abbreviation = {
			type: String,
			unique: true,
			required: true
		}

		this.releaseDate = {
			type: Date,
			unique: false,
			default: new Date(Date.now())
		}

		this.authorName = {
			type: String,
			required: true
		}
	}

	static getCollectionName() {
		return 'games';
	}
}

module.exports = { Game };