const { Source } = require('./SourceModel');




/**
 * Instances of a game's damage types, such as "bludgeoning", "slashing", "fire", and so on.
 * @date 8/21/2023 - 2:14:41 PM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class DamageType extends Source{
	constructor(){
		super();



	}

	static collectionName() {
		return 'damagetypes';
	}


}


module.exports = {
	DamageType
}