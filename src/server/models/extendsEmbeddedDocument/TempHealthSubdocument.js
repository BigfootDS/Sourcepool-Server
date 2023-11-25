const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class TempHealth extends EmbeddedDocument {
	constructor(){
		super();
		
		this.value = {
			type: Number,
			required: true,
			default: 1
		}

		this.notes = {
			type: [LocalizedContent],
			required: false
		}
		
	}
}



module.exports = { TempHealth }