const Document = require('camo').Document;

class Game extends Document{
	constructor(){
		super();

		this.name = {
			type: String,
			unique: true,
			required: true
		};
		


	}

	static collectionName() {
		return 'games';
	}


}


module.exports = {
	Game
}