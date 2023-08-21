const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;


/**
 * Instances of a game's damage types, such as "blinded", "paralyzed", "ethereal", and so on.
 * @date 8/21/2023 - 2:16:03 PM
 * @author BigfootDS
 *
 * @class
 * @property {[Lore]} description Localized name and description data about the item. Requires at least one Lore entry within the array.
 * @extends {Document}
 */
class Condition extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}


	}

	static collectionName() {
		return 'conditions';
	}


}


module.exports = {
	Condition
}