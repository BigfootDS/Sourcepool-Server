const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');



class Month extends ContentBaseDocument {
	constructor(){
		super();

		this.positionInYear = {
			type: Number,
			required: true,
			default: 1
		}

		this.numberOfDays = {
			type: Number,
			required: true,
			default: 30
		}
	}
}



module.exports = { Month }