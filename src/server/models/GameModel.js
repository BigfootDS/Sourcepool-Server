const { Ability } = require('./AbilityModel');
const { Condition } = require('./ConditionModel');
const { DamageType } = require('./DamageTypeModel');
const { Skill } = require('./SkillModel');
const { Source } = require('./SourceModel');


class Game extends Source{
	constructor(){
		super();
	

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