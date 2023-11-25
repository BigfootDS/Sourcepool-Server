const camo = require("camo");
const { AttackType } = require("../extendsContentBaseDocument/AttackTypeModel");
const { DiceRoll } = require("./DiceRollSubdocument");
const { AdditionalModifier } = require("./AdditionalModifierSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Attack extends EmbeddedDocument {
	constructor(){
		super();
		
		this.attackType = {
			type: AttackType,
			required: true
		}

		this.range = {
			type: Number,
			required: true,
			default: 5
		}

		this.damageRolls = {
			type: [DiceRoll],
			required: true
		}

		this.modifiers = {
			type: [AdditionalModifier],
			required: false
		}
		
	}
}



module.exports = { Attack }