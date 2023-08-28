const { Place } = require('./PlaceModel');
const { Source } = require('./SourceModel');



/**
 * A universe or "plane" of existence within the campaign setting. Just a helper to organize scenes, places, characters, and so on.
 * @date 8/28/2023 - 8:49:22 PM
 * @author BigfootDS
 *
 * @class
 * @property {[Place]} places Optional. A collection of places within this universe.
 * @extends {Source}
 */
class Universe extends Source {
	constructor(){
		super();

		this.places = {
			type: [Place],
			required: false
		}
	}
}

module.exports = {
	Universe
}