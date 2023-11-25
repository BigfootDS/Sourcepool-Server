const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');



class AttackType extends ContentBaseDocument {
	constructor(){
		super();
		
		// should be stuff like "Melee" or "Ranged"
		
	}
}



module.exports = { AttackType }