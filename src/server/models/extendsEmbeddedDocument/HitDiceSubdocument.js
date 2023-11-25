const camo = require('camo');
const { Dice } = require('../extendsCustomBaseDocument/DiceModel');
const EmbeddedDocument = camo.EmbeddedDocument;

class HitDice extends EmbeddedDocument {
	constructor(){
		super();

		this.type = {
			type: Dice,
			required: true
		}

		this.currentQuantity = {
			type: Number,
			default: 1,
			required: true
		}

		this.maxQuantity = {
			type: Number,
			default: this.currentQuantity,
			required: true
		}

	}

	static getCollectionName() {
		return 'hitdices';
	}
}

module.exports = {HitDice}