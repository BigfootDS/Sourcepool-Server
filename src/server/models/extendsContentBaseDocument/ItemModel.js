const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { CurrencyQuantity } = require('../extendsEmbeddedDocument/CurrencyQuantitySubdocument');
const { ItemProperty } = require('../extendsEmbeddedDocument/ItemPropertySubdocument');



class Item extends ContentBaseDocument {
	constructor(){
		super();
		
		this.isAttuneable = {
			type: Boolean,
			required: true,
			default: false
		}

		this.properties = {
			type: [ItemProperty],
			required: false
		}

		this.weight = {
			type: Number,
			required: true,
			default: 0
		}

		this.value = {
			type: [CurrencyQuantity],
			required: true
		}
		
	}
}



module.exports = { Item }