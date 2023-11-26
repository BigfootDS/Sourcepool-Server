const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { AdditionalModifier } = require('../extendsEmbeddedDocument/AdditionalModifierSubdocument');
const { HitDice } = require('../extendsEmbeddedDocument/HitDiceSubdocument');
const { LevelledProficiencyBonusTable } = require('./LevelledProficiencyBonusTableModel');



class HeroClass extends ContentBaseDocument {
	constructor(){
		super();
		
		this.hitDiceStarter = {
			type: HitDice,
			required: true
		}

		this.grantedModifiers = {
			type: [AdditionalModifier],
			required: false
		}

		this.pbProgression = {
			type: LevelledProficiencyBonusTable,
			required: true
		}
		
	}
}



module.exports = { HeroClass }