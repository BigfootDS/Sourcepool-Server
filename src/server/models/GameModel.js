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
 * @date 8/29/2023 - 11:04:28 AM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Game extends Source{
	constructor(){
		super();


	}

	static collectionName() {
		return 'games';
	}


}


module.exports = {
	Game
}