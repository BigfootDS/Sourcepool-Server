const { Place } = require('./PlaceModel');
const { Source } = require('./SourceModel');


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