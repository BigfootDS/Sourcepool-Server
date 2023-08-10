const Document = require('camo').Document;

class Character extends Document{
	constructor(){
		super();

		this.name = {
			type: String,
			required: true
		};
		this.isPlayable = {
			type: Boolean,
			required: false
		};

	}

	static collectionName() {
		return 'characters';
	}


}


module.exports = {
	Character: Character
}