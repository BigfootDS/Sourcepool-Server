const { AbilityScore } = require('./AbilityScoreModel');
const { CharacterSkill } = require('./CharacterSkillModel');
const { Condition } = require('./ConditionModel');
const { DamageMultiplier } = require('./DamageMultiplierModel');
const { Item } = require('./ItemModel');
const { Lore } = require('./LoreEmbeddedModel');
const { User } = require('./UserModel');

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

		this.player = {
			type: User,
			required: false
		}

		this.abilityScores = {
			type: [AbilityScore],
			required: true
		}


		this.inventory = {
			type: [Item],
			required: false
		}


		this.skills = {
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

		this.tags = {
			type: [string],
			required: true
		}
	}

	static collectionName() {
		return 'characters';
	}


}


module.exports = {
	Character: Character
}