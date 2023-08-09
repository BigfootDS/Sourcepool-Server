const { Game } = require('./GameModel');
const { User } = require('./UserModel');

const Document = require('camo').Document;

class Campaign extends Document{
	constructor(){
		super();

		this.name = {
			type: String,
			unique: true,
			required: true
		};
		
		this.game = {
			type: Game,
			unique: false,
			required: true
		};

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