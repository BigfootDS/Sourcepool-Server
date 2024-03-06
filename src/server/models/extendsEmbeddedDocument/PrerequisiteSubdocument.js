const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Prerequisite extends EmbeddedDocument {
	constructor(){
		super();
		
		this.descriptions = {
			type: [LocalizedContent],
			required: false
		}

		this.lastCheckResult = {
			type: Boolean,
			required: true,
			default: false
		}

		this.lastCheckTimestamp = {
			type: Date,
			required: true,
			default: new Date(Date.now())
		}

		this.requiredPropertyName = {
			type: String,
			required: true
		}
		
		this.requiredPropertyValueMatch = {
			type: String,
			required: false
		}

		this.requiredPropertyValueMinimum = {
			type: Number,
			required: false
		}

		this.requiredPropertyValueMaximum = {
			type: Number,
			required: false
		}

		this.requiredPropertyValuePresence = {
			type: Boolean,
			required: false
		}
	}
}



module.exports = { Prerequisite }