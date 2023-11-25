const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Ability } = require('./AbilityModel');



class Skill extends ContentBaseDocument {
	constructor(){
		super();
		
		this.ability = {
			type: Ability,
			required: true
		}
		
	}
}



module.exports = { Skill }