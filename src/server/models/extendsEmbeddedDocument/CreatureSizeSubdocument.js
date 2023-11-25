const camo = require("camo");
const { Size } = require("../extendsContentBaseDocument/SizeModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class CreatureSize extends EmbeddedDocument {
	constructor(){
		super();
		
		this.category = {
			type: Size,
			required: true
		}

		this.height = {
			type: Number,
			required: false
		}

		this.width = {
			type: Number,
			required: false
		}

		this.depth = {
			type: Number,
			required: false
		}
		
	}
}



module.exports = { CreatureSize }