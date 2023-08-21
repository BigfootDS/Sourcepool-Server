const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;



/**
 * Base reference for entity abilities, such as strength and constitution. Other models refer to this to do actual ability-based functionality.
 * @date 8/21/2023 - 3:42:07 PM
 * @author BigfootDS
 *
 * @class
 * @property {[Lore]} description Localized name and description data about the item. Requires at least one Lore entry within the array.
 * @extends {Document}
 */
class Ability extends Document {
	constructor(){
		super();

		this.description = {
			type: [Lore],
			required: true
		}
	}

	static collectionName(){
		return 'abilities';
	}
}


module.exports = {
	Ability
}