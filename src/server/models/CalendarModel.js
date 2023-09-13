const { Epoch } = require("./EpochModel");
const { InGameDate } = require("./InGameDateModel");
const { Month } = require("./MonthModel");
const { Source } = require("./SourceModel");


/**
 * Calendar system for a given plane or universe.
 * @date 9/12/2023 - 10:26:44 AM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Calendar extends Source {
	constructor(){
		super();

		this.currentYearIndex = {
			type: Number,
			required: true,
			default: 0
		}

		this.daysPerWeek = {
			type: Number,
			required: true,
			default: 7
		}

		this.dayNames = {
			type: [String],
			required: true,
			default: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
		}

		this.currentEpochs = {
			type: [Epoch],
			required: true
		}

		this.dates = {
			type: [InGameDate],
			required: false
		}

		this.monthsPerYear = {
			type: [Month],
			required: true,
		}
	}
}

module.exports = {
	Calendar
}