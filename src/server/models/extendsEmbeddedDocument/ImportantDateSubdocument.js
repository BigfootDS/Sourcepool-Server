const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class ImportantDate extends EmbeddedDocument {
	constructor(){
		super();

		this.dayNum = {
			type: Number,
			required: true, 
			default: 1
		}

		this.monthNum = {
			type: Number,
			required: true, 
			default: 1
		}

		this.yearNum = {
			type: Number,
			required: true, 
			default: 1
		}

		this.isCurrent = {
			type: Boolean,
			required: true, 
			default: false
		}

		this.descriptions = {
			type: [LocalizedContent],
			required: false
		}
	}
}



module.exports = { ImportantDate }