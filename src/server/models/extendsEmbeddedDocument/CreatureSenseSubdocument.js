const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const { Sense } = require("../extendsContentBaseDocument/SenseModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class CreatureSense extends EmbeddedDocument {
	constructor(){
		super();
		
		this.distance = {
			type: Number,
			required: false
		}

		this.note = {
			type: [LocalizedContent],
			required: false
		}

		this.sense = {
			type: Sense,
			required: true
		}
		
	}
}



module.exports = { CreatureSense }