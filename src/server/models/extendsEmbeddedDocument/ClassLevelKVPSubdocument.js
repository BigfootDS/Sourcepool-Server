const camo = require("camo");
const { HeroClass } = require("../extendsContentBaseDocument/HeroClassModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class ClassLevelKVP extends EmbeddedDocument {
	constructor(){
		super();
		
		this.level = {
			type: Number,
			required: true,
			default: 1
		}

		this.classRef = {
			type: HeroClass,
			required: true
		}
		
	}
}



module.exports = { ClassLevelKVP }