const { Game } = require('./GameModel');
const { Lore } = require('./LoreEmbeddedModel');
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

		this.manager = {
			type: User,
			required: true
		}

		this.players = {
			type: [User],
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