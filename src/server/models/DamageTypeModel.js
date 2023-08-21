const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;



/**
 * Instances of a game's damage types, such as "bludgeoning", "slashing", "fire", and so on.
 * @date 8/21/2023 - 2:14:41 PM
 * @author BigfootDS
 *
 * @class
 * @property {[Lore]} description Localized name and description data about the item. Requires at least one Lore entry within the array.
 * @extends {Document}
 */
class DamageType extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}


	}

	static collectionName() {
		return 'damagetypes';
	}


}


module.exports = {
	DamageType
}