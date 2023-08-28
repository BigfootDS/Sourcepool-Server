const { Ability } = require('./AbilityModel');
const { Source } = require('./SourceModel');




/**
 * Base reference for entity skills, such as perception and investigation. 
 * Other models refer to this via embed to do actual skill-based functionality.
 * Refers to abilities, does not embed them.
 * @date 8/21/2023 - 3:42:07 PM
 * @author BigfootDS
 *
 * @class
 * @property {Ability} ability Required. The Ability that this skill is usually associated with. This should be an ID (typically, "_id") of an Ability document.
 * @extends {Source}
 */
class Skill extends Source {
	constructor(){
		super();

		this.ability = {
			type: Ability,
			required: true
		}
	}

	static collectionName(){
		return 'skills';
	}
}


module.exports = {
	Skill
}