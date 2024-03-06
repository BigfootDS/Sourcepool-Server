const camo = require("camo");
const { ImportantDate } = require("./ImportantDateSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class ImportantEvent extends EmbeddedDocument {
	constructor(){
		super();

		this.descriptions = {
			type: [LocalizedContent],
			required: false
		}

		this.startDate = {
			type: ImportantDate,
			required: true
		}

		this.endDate = {
			type: ImportantDate,
			required: true
		}

		this.repeatCount = {
			type: Number,
			required: true,
			default: 0
		}

		this.repeatForever = {
			type: Boolean,
			required: true,
			default: false
		}

		this.numberOfDaysUntilRepeat = {
			type: Number,
			required: true,
			default: 0
		}

		this.numberOfDaysBetweenRepeats = {
			type: Number,
			required: true,
			default: 0
		}
	}
}



module.exports = { ImportantEvent }