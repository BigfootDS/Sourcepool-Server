const { AbilityScore } = require('./AbilityScoreModel');
const { CharacterSkill } = require('./CharacterSkillModel');
const { Condition } = require('./ConditionModel');
const { DamageMultiplier } = require('./DamageMultiplierModel');
const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;

class Character extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}

		this.isPlayable = {
			type: Boolean,
			required: true,
			default: false
		};

		this.healthCurrent = {
			type: Number,
			required: true,
			default: 10
		}

		this.healthMax = {
			type: Number,
			required: true,
			default: 10
		}

		this.healthBonus = {
			type: Number,
			required: true,
			default: 0
		}

		this.abilityScores = {
			type: [AbilityScore],
			required: true
		}

		this.characterSkills = {
			type: [CharacterSkill],
			required: false
		}

		this.conditionActives = {
			type: [Condition],
			required: false
		}

		this.conditionImmunities = {
			type: [Condition],
			required: false
		}

		this.damageVulnerabilities = {
			type: [DamageMultiplier],
			required: false
		}

		this.damageResistances = {
			type: [DamageMultiplier],
			required: false
		}

		this.damageImmunities = {
			type: [DamageMultiplier],
			required: false
		}
	}

	static collectionName() {
		return 'characters';
	}


}


module.exports = {
	Character: Character
}