const { InGameDate } = require("./InGameDateModel");
const { Source } = require("./SourceModel");


/**
 * Lore and content about a thing associated with a given date or range of dates.
 * Even if the event only was a part of one day, this.dates is still an array of dates!
 * @date 9/12/2023 - 10:11:17 AM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class InGameEvent extends Source {
	constructor(){
		super();

		this.dates = {
			type: [InGameDate],
			required: true,
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

		this.countdownDaysTilRepeat = {
			type: Number,
			required: true,
			default: 0
		}

		this.maxDaysTilRepeat = {
			type: Number,
			required: true,
			default: 0
		}
	}
}


module.exports = {
	InGameEvent
}