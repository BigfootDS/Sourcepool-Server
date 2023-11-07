const { Character } = require('../CharacterModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;


/**
 * Model to track which character has what positioning in an Encounter.
 * @date 11/2/2023 - 9:01:09 AM
 * @author BigfootDS
 *
 * @extends {EmbeddedDocument}
 */
class Initiative extends EmbeddedDocument {
	constructor(){
		super();

		this.rolledInitiative = {
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