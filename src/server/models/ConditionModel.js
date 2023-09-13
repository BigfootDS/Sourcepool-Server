const { Source } = require('./SourceModel');



/**
 * Instances of a game's damage types, such as "blinded", "paralyzed", "ethereal", and so on.
 * @date 8/21/2023 - 2:16:03 PM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Condition extends Source{
	constructor(){
		super();




	}

	static collectionName() {
		return 'conditions';
	}


}


module.exports = {
	Condition
}