const camo = require("camo");
const { Skill } = require("../extendsContentBaseDocument/SkillModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class SkillScoreKVP extends EmbeddedDocument {
	constructor(){
		super();
		
		this.skill = {
			type: Skill,
			required: true
		}

		this.score = {
			type: Number,
			required: true,
			default: 0
		}
		
	}
}



module.exports = { SkillScoreKVP }