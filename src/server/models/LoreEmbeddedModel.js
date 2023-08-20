const ISO6391 = require('iso-639-1');

const EmbeddedDocument = require('camo').EmbeddedDocument;

class Lore extends EmbeddedDocument {
	constructor(){
		super();

		this.language = {
			type: "string",
			choices: ISO6391.getAllCodes(),
			unique: false,
			required: true
		}

		this.name = {
			type: "string",
			unique: false,
			required: true
		}

		this.content = {
			type: "string",
			unique: false,
			required: false
		}
	}
}

module.exports = {Lore: Lore};