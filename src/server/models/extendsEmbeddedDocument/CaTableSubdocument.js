const camo = require("camo");
const EmbeddedDocument = camo.EmbeddedDocument;



class CaTable extends EmbeddedDocument {
	constructor(){
		super();
		
		this.requiredExp = {
			type: Number,
			required: true
		}

		this.levelNum = {
			type: Number,
			required: true
		}

		this.proficiencyBonus = {
			type: Number,
			required: true
		}
		
	}
}



module.exports = { CaTable }