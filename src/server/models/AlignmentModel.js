const { Source } = require('./SourceModel');




/**
 * Base reference for entity alignments, such as Lawful Good, True Neutral, and Chaotic Evil. 
 * @date 8/21/2023 - 3:42:07 PM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Alignment extends Source {
	constructor(){
		super();


	}

	static collectionName(){
		return 'alignments';
	}
}


module.exports = {
	Alignment
}