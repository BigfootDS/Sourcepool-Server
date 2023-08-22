const { Skill } = require('./SkillModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;

class CharacterSkill extends EmbeddedDocument{
	constructor(){
		super();

		this.multiplier = {
			type: Number,
			required: true,
			default: 1,
		}

		this.skill = {
			type: Skill,
			required: true
		}
	}

	static collectionName() {
		return 'characterskills';
	}
}


module.exports = {
	CharacterSkill
}