const camo = require("camo");
const { Ability } = require("../extendsContentBaseDocument/AbilityModel");
const { AdditionalModifier } = require("./AdditionalModifierSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class AbilityScore extends EmbeddedDocument {
	constructor(){
		super();
		
		this.ability = {
			type: Ability,
			required: true
		}

		this.totalScore = {
			type: Number,
			required: true,
			default: 0
		}

		this.calculatedBonus = {
			type: Number,
			required: true,
			default: 0
		}

		this.baseScore = {
			type: Number,
			required: true,
			default: 0
		}

		this.modifiers = {
			type: [AdditionalModifier],
			required: false
		}

		this.totalScoreSetOverride = {
			type: Number,
			required: false
		}

		this.totalScoreAdditionalOverride = {
			type: Number,
			required: false
		}
		
	}
}



module.exports = { AbilityScore }