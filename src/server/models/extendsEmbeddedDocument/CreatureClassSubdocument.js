const camo = require("camo");
const { HeroClass } = require("../extendsContentBaseDocument/HeroClassModel");
const { HitDice } = require("./HitDiceSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class CreatureClass extends EmbeddedDocument {
	constructor(){
		super();
		
		this.classRef = {
			type: HeroClass,
			required: true
		}

		this.level = {
			type: Number,
			required: true,
			default: 1
		}

		this.hitDice = {
			type: HitDice,
			required: true
		}
		
	}
}



module.exports = { CreatureClass }