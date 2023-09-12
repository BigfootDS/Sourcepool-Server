const { Source } = require("./SourceModel");


/**
 * Lore and data about months used in a plane's or universe's calendar system.
 * @date 9/12/2023 - 10:04:12 AM
 * @author BigfootDS
 *
 * @class
 * @extends {Source}
 */
class Month extends Source {
	constructor() {
		super();

		this.positionInYear = {
			type: Number,
			required: true,
			default: 1
		}

		this.maxDayCount = {
			type: Number,
			required: true,
			default: 28
		}
	}
}

module.exports = {
	Month
}