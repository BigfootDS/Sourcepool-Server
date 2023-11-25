const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');



class Condition extends ContentBaseDocument {
	constructor(){
		super();
		
		// TODO - Conditions should apply AdditionalModifiers
		
	}
}



module.exports = { Condition }