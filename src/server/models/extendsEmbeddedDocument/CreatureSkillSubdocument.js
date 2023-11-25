const camo = require("camo");
const { Skill } = require("../extendsContentBaseDocument/SkillModel");
const { Ability } = require("../extendsContentBaseDocument/AbilityModel");
const { AdditionalModifier } = require("./AdditionalModifierSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class CreatureSkill extends EmbeddedDocument {
	constructor(){
		super();
		
		this.skill = {
			type: Skill,
			required: true
		}

		this.abilityOverride = {
			type: Ability,
			required: false
		}

		this.totalScore = {
			type: Number,
			required: true
		}

		this.totalScoreSetOverride = {
			type: Number,
			required: false
		}

		this.totalScoreBonusOverride = {
			type: Number,
			required: false
		}

		this.halfProficient = {
			type: Boolean,
			required: true,
			default: false
		}

		this.proficient = {
			type: Boolean,
			required: true,
			default: false
		}

		this.expert = {
			type: Boolean,
			required: true,
			default: false
		}
		
		this.modifiers = {
			type: [AdditionalModifier],
			required: false
		}
	}
}



module.exports = { CreatureSkill }