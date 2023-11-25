const camo = require("camo");
const { Currency } = require("../extendsContentBaseDocument/CurrencyModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class CurrencyQuantity extends EmbeddedDocument {
	constructor(){
		super();
		
		this.currency = {
			type: Currency,
			required: true
		}

		this.value = {
			type: Number,
			required: true,
			default: 0
		}
		
	}
}



module.exports = { CurrencyQuantity }