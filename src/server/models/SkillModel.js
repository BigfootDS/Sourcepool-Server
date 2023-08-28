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
 * @property {[Lore]} description Localized name and description data about the item. Requires at least one Lore entry within the array.
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