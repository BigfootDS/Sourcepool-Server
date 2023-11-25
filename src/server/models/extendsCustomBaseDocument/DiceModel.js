const { CustomBaseDocument } = require('../extendsDocument/CustomBaseDocumentModel');


class Dice extends CustomBaseDocument {
	constructor(){
		super();

		this.sides = {
			type: Number,
			default: 20,
			required: true
		}
		
	}

	static getCollectionName() {
		return 'dices';
	}
}


module.exports = { Dice };