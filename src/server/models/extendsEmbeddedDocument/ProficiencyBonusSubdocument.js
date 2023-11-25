const camo = require("camo");
const EmbeddedDocument = camo.EmbeddedDocument;



class ProficiencyBonus extends EmbeddedDocument {
	constructor(){
		super();
		
		this.value = {
			type: Number,
			required: true,
			default: 1
		}

		this.valueSetOverride = {
			type: Number,
			required: false
		}

		this.valueBonusOverride = {
			type: Number,
			required: false
		}
		
	}
}



module.exports = { ProficiencyBonus }