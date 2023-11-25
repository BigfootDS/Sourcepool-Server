const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const { Condition } = require("../extendsContentBaseDocument/ConditionModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class AppliedCondition extends EmbeddedDocument {
	constructor(){
		super();
		
		this.durationRounds = {
			type: Number,
			required: false
		}

		this.durationMinutes = {
			type: Number,
			required: false
		}

		this.durationNotes = {
			type: [LocalizedContent],
			required: false
		}

		this.causeNotes = {
			type: [LocalizedContent],
			required: false
		}

		this.condition = {
			type: Condition,
			required: true
		}
		
	}
}



module.exports = { AppliedCondition }