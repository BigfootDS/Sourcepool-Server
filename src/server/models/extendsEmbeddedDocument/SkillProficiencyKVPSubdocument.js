const camo = require("camo");
const { Skill } = require("../extendsContentBaseDocument/SkillModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class SkillProficiencyKVP extends EmbeddedDocument {
	constructor(){
		super();
		
		this.skill = {
			type: Skill,
			required: true
		}

		this.halfProficiency = {
			type: Boolean,
			required: false
		}

		this.proficiency = {
			type: Boolean,
			required: false
		}

		this.expertise = {
			type: Boolean,
			required: false
		}
		
	}
}



module.exports = { SkillProficiencyKVP }