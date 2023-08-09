const Document = require('camo').Document;

class Game extends Document{
	constructor(){
		super();

		this.name = {
			type: String,
			unique: true,
			required: true
		};
		
		this.system = {
			type: String,
			unique: false,
			required: false
		};

	}

	static collectionName() {
		return 'games';
	}


}


module.exports = {
	Game
}