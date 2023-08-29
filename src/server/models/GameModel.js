const { Ability } = require('./AbilityModel');
const { Condition } = require('./ConditionModel');
const { DamageType } = require('./DamageTypeModel');
const { Skill } = require('./SkillModel');
const { Source } = require('./SourceModel');



/**
 * A game is used to basically tag other pieces of data, and help identify what rules and mechanics the data should adhere to.
 * This is gonna change a lot, not much thought has gone into how this should scale to support other games beyond Dungeons & Dragons yet.
 * But we definitely wanna support other games!
 * 
 * Using game.property is just a nicer way to access game-specific data, instead of sifting through things like damage types and filtering by game.
 * @date 8/29/2023 - 11:04:28 AM
 * @author BigfootDS
 *
 * @class
 * @property {[DamageType]} damageTypes Required. Reference to damage types relevant to this game. 
 * @property {[Condition]} conditions Required. Reference to conditions relevant to this game. 
 * @property {[Ability]} abilities Required. Reference to abilities relevant to this game. 
 * @property {[Skill]} skills Required. Reference to skills relevant to this game. 
 * @extends {Source}
 */
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