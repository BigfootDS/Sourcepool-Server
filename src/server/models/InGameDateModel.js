const { Month } = require("./MonthModel");

const Document = require("camo").Document;



/**
 * Custom date to use in a plane's or universe's calendar system. Calendars should have a lot of dates!
 * Note that this does not have usual data found in Source-based models.
 * Dates do not have names or lore - that stuff should be stored in an Event, and the event should be associated with a date.
 * @date 9/12/2023 - 10:08:57 AM
 * @author BigfootDS
 *
 * @class
 * @extends {Document}
 */
class InGameDate extends Document {
	constructor(){
		super();

		this.isCurrent = {
			type: Boolean,
			required: true,
			default: false
		}

		this.positionInMonth = {
			type: Number,
			required: true,
			default: 1
		}

		this.month = {
			type: Month,
			required: true
		}
	}
}

module.exports = {
	InGameDate
}