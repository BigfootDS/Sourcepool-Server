const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Calendar } = require('./CalendarModel');
const { Place } = require('./PlaceModel');



class Universe extends ContentBaseDocument {
	constructor(){
		super();
		
		this.calendars = {
			type: [Calendar],
			required: false
		}

		this.places = {
			type: [Place],
			required: false
		}
		
	}
}



module.exports = { Universe }