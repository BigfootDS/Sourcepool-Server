const { Game } = require('./GameModel');
const { Lore } = require('./LoreEmbeddedModel');
const { Universe } = require('./UniverseModel');
const { User } = require('./UserModel');

const Document = require('camo').Document;

class Campaign extends Document{
	constructor(){
		super();
		
		this.game = {
			type: Game,
			unique: false,
			required: true
		};

		this.description = {
			type:[Lore],
			required: true
		}

		this.managers = {
			type: [User],
			required: true
		}

		this.players = {
			type: [User],
			required: false
		}

		this.universes = {
			type: [Universe],
			required: false
		}

	}

	static collectionName() {
		return 'campaigns';
	}


}


module.exports = {
	Campaign
}