const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { ImportantDate } = require('../extendsEmbeddedDocument/ImportantDateSubdocument');
const { ImportantEvent } = require('../extendsEmbeddedDocument/ImportantEventSubdocument');
const { Day } = require('./DayModel');
const { Epoch } = require('./EpochModel');
const { Month } = require('./MonthModel');



class Calendar extends ContentBaseDocument {
	constructor(){
		super();

		this.daysPerWeek = {
			type: [Day],
			required: true
		}

		this.epochs = {
			type: [Epoch],
			required: true
		}

		this.monthsPerYear = {
			type: [Month],
			required: true
		}

		this.historicDates = {
			type: [ImportantDate],
			required: false
		}

		this.historicEvents = {
			type: [ImportantEvent],
			required: false
		}
	}
}



module.exports = { Calendar }