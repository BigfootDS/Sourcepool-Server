const { Ability } = require('./AbilityModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;

class AbilityScore extends EmbeddedDocument{
	constructor(){
		super();

		this.value = {
			type: Number,
			required: true,
			default: 8,
		}

		this.ability = {
			type: Ability,
			required: true
		}
	}
}


module.exports = {
	AbilityScore
}