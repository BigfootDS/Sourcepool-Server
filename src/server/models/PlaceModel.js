const { Character } = require('./CharacterModel');
const { Lore } = require('./LoreEmbeddedModel');
const { Prop } = require('./PropModel');

const Document = require('camo').Document;

class Place extends Document {
	constructor(){
		super();

		this.description = {
			type: [Lore],
			required: true
		}

		this.characters = {
			type: [Character],
			required: false
		}

		this.subPlaces = {
			type: [Place],
			required: false
		}

		this.props = {
			type: [Prop],
			required: false
		}
	}

	static collectionName(){
		return 'places';
	}
}

module.exports = {
	Place
}