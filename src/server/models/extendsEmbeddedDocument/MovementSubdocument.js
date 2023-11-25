const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Movement extends EmbeddedDocument {
	constructor(){
		super();

		this.name = {
			type: [LocalizedContent],
			required: true
		}

		this.speed = {
			type: Number,
			required: true,
			default: 0
		}

		this.note = {
			type: [LocalizedContent],
			required: false
		}
	}
}



module.exports = { Movement }