const { Character } = require('./CharacterModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;

class Initiative extends EmbeddedDocument {
	constructor(){
		super();

		this.order = {
			type: Number,
			unique: false,
			required: true,
			default: 0
		}

		this.character = {
			type: Character,
			unique: false,
			required: true
		}

	}
}

module.exports = {Initiative};