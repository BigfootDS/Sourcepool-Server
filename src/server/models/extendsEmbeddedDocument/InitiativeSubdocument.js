const camo = require("camo");
const { CreatureInstance } = require("../extendsContentBaseDocument/CreatureInstanceModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class Initiative extends EmbeddedDocument {
	constructor(){
		super();
		
		this.creature = {
			type: [CreatureInstance],
			required: true
		}

		this.initiativeValue = {
			type: Number,
			required: true
		}
		
	}
}



module.exports = { Initiative }