const camo = require("camo");
const { Ability } = require("../extendsContentBaseDocument/AbilityModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class AbilityScoreKVP extends EmbeddedDocument {
	constructor(){
		super();
		
		this.ability = {
			type: Ability,
			required: true
		}

		this.score = {
			type: Number,
			required: true,
			default: 0
		}
		
	}
}



module.exports = { AbilityScoreKVP }