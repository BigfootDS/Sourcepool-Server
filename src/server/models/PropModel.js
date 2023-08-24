const { Lore } = require('./LoreEmbeddedModel');
const { Item } = require('./ItemModel');
const Document = require('camo').Document;

/**
 * ORM model for in-game objects or scene props. These cannot be moved into a character's inventory, but can contain items that can be found and moved to a character's inventory instead.
 * @date 8/21/2023 - 2:12:05 PM
 * @author BigfootDS
 *
 * @class Item
 * @property {[Lore]} description Localized name and description data about the item. Requires at least one Lore entry within the array.
 * @property {[Item]} subItems Items stored within this prop. References other Item entries. If this prop was a cupboard, these items would be things you would find within the cupboard.
* @extends {Document}
 */
class Prop extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}

		this.items = {
			type: [Item],
			required: false
		}


	}

	static collectionName() {
		return 'props';
	}


}


module.exports = {
	Prop
}