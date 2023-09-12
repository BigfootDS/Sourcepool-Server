const { Calendar } = require('./CalendarModel');
const { Place } = require('./PlaceModel');
const { Source } = require('./SourceModel');



/**
 * A universe or "plane" of existence within the campaign setting. Just a helper to organize scenes, places, characters, and so on.
 * @date 8/28/2023 - 8:49:22 PM
 * @author BigfootDS
 *
 * @class
 * @property {[Place]} places Optional. A collection of places within this universe.
 * @property {[Calendar]} calendars Optional. A collection of calendar systems used to track time within this universe.
 * @extends {Source}
 */
class Universe extends Source {
	constructor(){
		super();

		this.places = {
			type: [Place],
			required: false
		}

		this.calendars = {
			type: [Calendar],
			required: false
		}
	}
}

module.exports = {
	Universe
}