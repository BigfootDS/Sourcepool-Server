const { Source } = require('./SourceModel');




/**
 * Base reference for entity languages, such as Common and Elvish. 
 * @date 8/21/2023 - 3:42:07 PM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Language extends Source {
	constructor(){
		super();


	}

	static collectionName(){
		return 'languages';
	}
}


module.exports = {
	Language
}