const { Game } = require('./GameModel');
const { Source } = require('./SourceModel');
const { Universe } = require('./UniverseModel');
const { User } = require('./UserModel');


class Campaign extends Source{
	constructor(){
		super();
		
		this.game = {
			type: Game,
			unique: false,
			required: true
		};



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