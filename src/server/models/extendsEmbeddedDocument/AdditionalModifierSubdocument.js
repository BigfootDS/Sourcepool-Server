const camo = require("camo");
const { AttackType } = require("../extendsContentBaseDocument/AttackTypeModel");
const { Skill } = require("../extendsContentBaseDocument/SkillModel");
const { Ability } = require("../extendsContentBaseDocument/AbilityModel");
const { DiceRoll } = require("./DiceRollSubdocument");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const { ItemProficiency } = require("./ItemProficiencySubdocument");
const { AdditionalDamage } = require("./AdditionalDamageSubdocument");
const { AppliedCondition } = require("./AppliedConditionSubdocument");
const { DamageMultiplier } = require("./DamageMultipierSubdocument");
const { CreatureSense } = require("./CreatureSenseSubdocument");
const { CreatureLanguage } = require("./CreatureLanguageSubdocument");
const { Movement } = require("./MovementSubdocument");
const { CreatureSize } = require("./CreatureSizeSubdocument");
const { CarryCapacity } = require("./CarryCapacitySubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class AdditionalModifier extends EmbeddedDocument {
	constructor(){
		super();

		// otherNamedPropertyAffected is a generic catch-all for 
		// anything not included explicitly further below.
		this.otherNamedPropertyAffected = {
			type: String,
			required: false
		}
		
		this.relevantAttackTypes = {
			type: [AttackType],
			required: false
		}

		this.relevantSkills = {
			type: [Skill],
			required: false
		}

		this.relevantAbilities = {
			type: [Ability],
			required: false
		}



		this.rangedAttackRangeIncreaseNum = {
			type: Number,
			required: false
		}

		this.rangedAttackRangeMultiplierNum = {
			type: Number,
			required: false
		}

		this.spellAttackRangeIncreaseNum = {
			type: Number,
			required: false
		}
		
		this.spellAttackRangeMultiplierNum = {
			type: Number,
			required: false
		}

		this.value = {
			type: Number,
			required: false
		}

		this.multiplier = {
			type: Number,
			required: false
		}

		this.bonusDamageRolls = {
			type: [DiceRoll],
			required: false
		}

		this.replacementDamageRolls = {
			type: [DiceRoll],
			required: false
		}

		this.damageIncreases = {
			type: [AdditionalDamage],
			required: false
		}

		this.source = {
			type: [LocalizedContent],
			required: false
		}

		this.advantage = {
			type: Boolean,
			required: false
		}

		this.disadvantage = {
			type: Boolean,
			required: false
		}

		this.itemProficiencies = {
			type: [ItemProficiency],
			required: false
		}

		this.halfProficiency = {
			type: Boolean,
			required: false
		}

		this.proficiency = {
			type: Boolean,
			required: false
		}

		this.expertise = {
			type: Boolean,
			required: false
		}

		this.conditionsActive = {
			type: [AppliedCondition],
			required: false
		}

		this.conditionsImmune = {
			type: [AppliedCondition],
			required: false
		}

		this.damageModifiers = {
			type: [DamageMultiplier],
			required: false
		}

		this.senses = {
			type: [CreatureSense],
			required: false
		}

		this.languages = {
			type: [CreatureLanguage],
			required: false
		}

		this.movements = {
			type: [Movement],
			required: false
		}

		this.size = {
			type: CreatureSize,
			required: false
		}

		this.carryWeight = {
			type: CarryCapacity,
			required: false
		}

		this.targetedTags = {
			type: [String],
			required: false
		}

		this.ignorePrerequisitesWithName = {
			type: [String],
			required: false
		}

		this.ignoreItemPropertyWithName = {
			type: [String],
			required: false
		}
	}
}



module.exports = { AdditionalModifier }