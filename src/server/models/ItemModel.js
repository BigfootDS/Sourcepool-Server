const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;

/**
 * ORM model for in-game items, such as swords and chests.
 * @date 8/21/2023 - 2:12:05 PM
 * @author BigfootDS
 *
 * @class Item
 * @property {[Lore]} description Localized name and description data about the item. Requires at least one Lore entry within the array.
 * @property {[Item]} subItems Items stored within this item. References other Item entries. Typically useful for chests, bags, or other container items.
* @extends {Document}
 */
class Item extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}

		this.subItems = {
			type: [Item],
			required: false
		}


	}

	static collectionName() {
		return 'items';
	}


}


module.exports = {
	Item
}