const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;

class Game extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}		


	}

	static collectionName() {
		return 'games';
	}


}


module.exports = {
	Game
}