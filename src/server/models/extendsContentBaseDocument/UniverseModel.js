const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Calendar } = require('./CalendarModel');
const { Entity } = require('./EntityModel');



class Universe extends ContentBaseDocument {
	constructor(){
		super();
		
		this.calendars = {
			type: [Calendar],
			required: false
		}

		this.places = {
			type: [Entity],
			required: false
		}
		
	}
}



module.exports = { Universe }