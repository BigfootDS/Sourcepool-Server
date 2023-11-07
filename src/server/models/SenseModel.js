const { Source } = require('./SourceModel');




/**
 * Base reference for entity sense, such as Darkvision and Tremorsense. 
 * @date 8/21/2023 - 3:42:07 PM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Sense extends Source {
	constructor(){
		super();


	}

	static collectionName(){
		return 'senses';
	}
}


module.exports = {
	Sense
}