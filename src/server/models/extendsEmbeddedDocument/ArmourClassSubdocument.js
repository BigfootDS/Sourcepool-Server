const camo = require("camo");
const { Ability } = require("../extendsContentBaseDocument/AbilityModel");
const { AdditionalModifier } = require("./AdditionalModifierSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class ArmourClass extends EmbeddedDocument {
	constructor(){
		super();
		
		this.relevantAbilities = {
			type: [Ability],
			required: true
		}

		this.overrideTotal = {
			type: Number,
			required: false
		}

		this.overrideBaseArmour = {
			type: Number,
			required: false
		}

		this.overrideBaseArmourPlusAbilities = {
			type: Number,
			required: false
		}

		this.modifiers = {
			type: [AdditionalModifier],
			required: false
		}
		
	}
}



module.exports = { ArmourClass }