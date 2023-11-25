const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Action } = require('../extendsEmbeddedDocument/ActionSubdocument');
const { AppliedCondition } = require('../extendsEmbeddedDocument/AppliedConditionSubdocument');
const { DiceRoll } = require('../extendsEmbeddedDocument/DiceRollSubdocument');
const { SpellComponent } = require('../extendsEmbeddedDocument/SpellComponentSubdocument');
const { Ability } = require('./AbilityModel');
const { ActionType } = require('./ActionTypeModel');
const { SpellLevel } = require('./SpellLevelModel');
const { SpellSchool } = require('./SpellSchoolModel');



class Spell extends ContentBaseDocument {
	constructor(){
		super();
		
		this.minimumLevel = {
			type: SpellLevel,
			required: true
		}

		this.concentrationRequired = {
			type: Boolean,
			required: true,
			default: false
		}
		
		this.canBeRitual = {
			type: Boolean,
			required: true,
			default: false
		}

		this.savingThrowAbility = {
			type: Ability,
			required: false
		}

		this.castingTime = {
			type: ActionType,
			required: true
		}

		this.school = {
			type: SpellSchool,
			required: true
		}

		this.spellAction = {
			type: [Action],
			required: false
		}

		this.inflictedConditions = {
			type: [AppliedCondition],
			required: false
		}

		this.damage = {
			type: [DiceRoll],
			required: false
		}

		this.components = {
			type: [SpellComponent],
			required: false
		}
	}
}



module.exports = { Spell }