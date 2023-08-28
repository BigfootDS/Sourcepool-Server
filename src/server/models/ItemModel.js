const { Source } = require('./SourceModel');


/**
 * ORM model for in-game items, such as swords and chests.
 * @date 8/21/2023 - 2:12:05 PM
 * @author BigfootDS
 *
 * @class Item
 * @property {[Item]} subItems Items stored within this item. References other Item entries. Typically useful for chests, bags, or other container items.
* @extends {Source}
 */
class Item extends Source{
	constructor(){
		super();



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