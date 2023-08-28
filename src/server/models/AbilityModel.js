const { Source } = require('./SourceModel');




/**
 * Base reference for entity abilities, such as strength and constitution. Other models refer to this to do actual ability-based functionality.
 * @date 8/21/2023 - 3:42:07 PM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Ability extends Source {
	constructor(){
		super();


	}

	static collectionName(){
		return 'abilities';
	}
}


module.exports = {
	Ability
}