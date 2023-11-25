const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class ItemProperty extends EmbeddedDocument {
	constructor(){
		super();
		
		this.descriptions = {
			type: [LocalizedContent],
			required: true
		}
		
	}
}



module.exports = { ItemProperty }