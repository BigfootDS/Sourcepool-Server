const { Ability } = require('./AbilityModel');
const { Condition } = require('./ConditionModel');
const { DamageType } = require('./DamageTypeModel');
const { Lore } = require('./LoreEmbeddedModel');
const { Skill } = require('./SkillModel');

const Document = require('camo').Document;

class Game extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}		

		this.damageTypes = {
			type:[DamageType],
			required: true
		}

		this.conditions = {
			type: [Condition],
			required: true
		}

		this.abilities = {
			type: [Ability],
			required: true
		}

		this.skills = {
			type: [Skill],
			required: true
		}

	}

	static collectionName() {
		return 'games';
	}


}


module.exports = {
	Game
}