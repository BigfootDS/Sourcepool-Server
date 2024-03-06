const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');



class Day extends ContentBaseDocument {
	constructor(){
		super();

		this.positionInWeek = {
			type: Number,
			required: true,
			default: 1
		}
	}
}



module.exports = { Day }