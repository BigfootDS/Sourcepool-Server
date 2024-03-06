const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');



class Epoch extends ContentBaseDocument {
	constructor(){
		super();

		this.yearStart = {
			type: Number,
			required: false,
			default: 0,
		}

		this.yearEnd = {
			type: Number,
			required: false,
			default: 0,
		}
	}
}



module.exports = { Epoch }