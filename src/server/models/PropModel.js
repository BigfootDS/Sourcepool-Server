const { Item } = require('./ItemModel');
const { Source } = require('./SourceModel');

/**
 * ORM model for in-game objects or scene props. These cannot be moved into a character's inventory, but can contain items that can be found and moved to a character's inventory instead.
 * @date 8/21/2023 - 2:12:05 PM
 * @author BigfootDS
 *
 * @class Item
 * @property {[Item]} subItems Items stored within this prop. References other Item entries. If this prop was a cupboard, these items would be things you would find within the cupboard.
* @extends {Source}
 */
class Prop extends Source{
	constructor(){
		super();



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