const camo = require("camo");
const { Entity } = require("../extendsContentBaseDocument/EntityModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class Initiative extends EmbeddedDocument {
	constructor(){
		super();
		
		this.creature = {
			type: [Entity],
			required: true
		}

		this.initiativeValue = {
			type: Number,
			required: true
		}
		
	}
}



module.exports = { Initiative }