const camo = require("camo");
const { Item } = require("../extendsContentBaseDocument/ItemModel");
const { CurrencyQuantity } = require("./CurrencyQuantitySubdocument");
const { ItemProperty } = require("./ItemPropertySubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class ItemInstance extends EmbeddedDocument {
	constructor(){
		super();
		
		this.itemRef = {
			type: Item,
			required: true
		}

		this.valueOverride = {
			type: [CurrencyQuantity],
			required: false
		}

		this.propertiesSetOverride = {
			type: [ItemProperty],
			required: false
		}

		this.propertiesAdditionalOverride = {
			type: [ItemProperty],
			required: false
		}

		this.weightOverride = {
			type: Number,
			required: false
		}

		this.isAttuned = {
			type: Boolean,
			required: true,
			default: false
		}

		this.subItems = {
			type: [ItemInstance],
			required: false
		}
		
	}
}



module.exports = { ItemInstance }