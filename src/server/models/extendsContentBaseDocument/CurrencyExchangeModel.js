const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { CurrencyQuantity } = require('../extendsEmbeddedDocument/CurrencyQuantitySubdocument');
const { Currency } = require('./CurrencyModel');



class CurrencyExchange extends ContentBaseDocument {
	constructor(){
		super();
		
		this.lowestValueCurrency = {
			type: Currency,
			required: true
		}

		this.currencies = {
			type: [CurrencyQuantity],
			required: true
		}
		
	}
}



module.exports = { CurrencyExchange }