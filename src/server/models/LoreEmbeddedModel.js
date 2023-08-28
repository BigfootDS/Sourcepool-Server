const ISO6391 = require('iso-639-1');

const EmbeddedDocument = require('camo').EmbeddedDocument;


let allowedLanguageCodes = ISO6391.getAllCodes();
console.log(allowedLanguageCodes);

class Lore extends EmbeddedDocument {
	constructor(){
		super();

		this.language = {
			type: String,
			choices: allowedLanguageCodes,
			unique: false,
			required: true
		}

		this.name = {
			type: String,
			unique: false,
			required: true
		}

		this.content = {
			type: String,
			unique: false,
			required: false
		}
	}
}

module.exports = {Lore: Lore};