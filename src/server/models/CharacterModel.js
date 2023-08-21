const { AbilityScore } = require('./AbilityScoreModel');
const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;

class Character extends Document{
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}
		this.isPlayable = {
			type: Boolean,
			required: false
		};


		this.abilityScores = {
			type: [AbilityScore],
			required: true
		}
	}

	static collectionName() {
		return 'characters';
	}


}


module.exports = {
	Character: Character
}