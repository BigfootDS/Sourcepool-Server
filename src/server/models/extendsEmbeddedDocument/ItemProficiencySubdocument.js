const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class ItemProficiency extends EmbeddedDocument {
	constructor(){
		super();
		
		this.descriptions = {
			type: [LocalizedContent],
			required: true
		}

		this.matchingTag = {
			type: [String],
			required: false
		}

		this.matchingName = {
			type: [String],
			required: false
		}
		
	}
}



module.exports = { ItemProficiency }