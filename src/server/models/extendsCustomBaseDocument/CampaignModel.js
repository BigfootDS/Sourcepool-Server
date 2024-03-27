const { CustomBaseDocument } = require('../extendsDocument/CustomBaseDocumentModel');
const { User } = require('../extendsDocument/UserModel');
const { Game } = require('./GameModel');


class Campaign extends CustomBaseDocument {
	constructor(){
		super();

		this.game = {
			type: Game,
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


	}


	static getCollectionName() {
		return 'campaigns';
	}
}


module.exports = { Campaign };