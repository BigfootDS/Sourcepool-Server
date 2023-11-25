const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');



class ActionType extends ContentBaseDocument {
	constructor(){
		super();
		
		// Should be stuff like:
		// Action, Bonus Action, Reaction, Other
		
	}
}



module.exports = { ActionType }