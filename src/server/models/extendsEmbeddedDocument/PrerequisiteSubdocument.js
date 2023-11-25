const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const { Reference } = require("./ReferenceSubdocument");
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

		this.greaterThan = {
			type: Boolean,
			required: false
		}

		this.equalTo = {
			type: Boolean,
			required: false
		}

		this.lesserThan = {
			type: Boolean,
			required: false
		}

		this.anyOf = {
			type: Boolean,
			required: false
		}

		this.allOf = {
			type: Boolean,
			required: false
		}

		this.reference = {
			type: Reference,
			required: true
		}
		
	}
}



module.exports = { Prerequisite }