const { Source } = require('./SourceModel');




/**
 * Base reference for entity sizes, such as Tiny, Medium, and Gargantuan. 
 * @date 8/21/2023 - 3:42:07 PM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Size extends Source {
	constructor(){
		super();


	}

	static collectionName(){
		return 'sizes';
	}
}


module.exports = {
	Size
}