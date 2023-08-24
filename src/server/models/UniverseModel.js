const { Lore } = require('./LoreEmbeddedModel');
const { Place } = require('./PlaceModel');

const Document = require('camo').Document;

class Universe extends Document {
	constructor(){
		super();

		this.description = {
			type: [Lore],
			required: true
		}

		this.places = {
			type: [Place],
			required: false
		}
	}
}

module.exports = {
	Universe
}