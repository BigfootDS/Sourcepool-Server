const camo = require('camo');
const { Dice } = require('../extendsCustomBaseDocument/DiceModel');
const { DamageType } = require('../extendsContentBaseDocument/DamageTypeModel');
const EmbeddedDocument = camo.EmbeddedDocument;

class DiceRoll extends EmbeddedDocument {
	constructor(){
		super();

		this.diceType = {
			type: Dice,
			required: true
		}

		this.quantity = {
			type: Number,
			default: 1,
			required: true
		}

		this.damageType = {
			type: DamageType,
			required: true
		}

		this.advantage = {
			type: Boolean,
			required: true,
			default: false
		}

		this.disadvantage = {
			type: Boolean,
			required: true,
			default: false
		}

	}


}

module.exports = {DiceRoll}