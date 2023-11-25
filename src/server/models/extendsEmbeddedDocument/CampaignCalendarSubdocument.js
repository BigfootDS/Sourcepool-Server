const camo = require("camo");
const { Calendar } = require("../extendsContentBaseDocument/CalendarModel");
const { ImportantDate } = require("./ImportantDateSubdocument");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const { ImportantEvent } = require("./ImportantEventSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class CampaignCalendar extends EmbeddedDocument {
	constructor(){
		super();

		this.calendarRef = {
			type: [Calendar],
			required: true
		}

		this.currentDayNumber = {
			type: Number,
			required: true,
			default: 1
		}

		this.totalDaysPlayed = {
			type: Number,
			required: true,
			default: 0
		}

		this.currentWeekNumber = {
			type: Number,
			required: true,
			default: 1
		}
		
		this.totalWeeksPlayed = {
			type: Number,
			required: true,
			default: 0
		}

		this.currentMonthNumber = {
			type: Number,
			required: true,
			default: 1
		}

		this.totalMonthsPlayed = {
			type: Number,
			required: true,
			default: 0
		}

		this.currentYearNumber = {
			type: Number,
			required: true,
			default: 0
		}

		this.totalYearsPlayed = {
			type: Number,
			required: true,
			default: 0
		}

		this.campaignDates = {
			type: [ImportantDate],
			required: true,
			default: [
				ImportantDate.create({
					descriptions: [
						LocalizedContent.create({
							language:"en",
							name:"The Campaign Begins",
							content:"This is the in-game date for when the players began their journey in the campaign."
						})
					]
				})
			]
		}

		this.campaignEvents = {
			type: [ImportantEvent],
			required: false
		}

	}
}



module.exports = { CampaignCalendar }