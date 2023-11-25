const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { AdditionalModifier } = require('../extendsEmbeddedDocument/AdditionalModifierSubdocument');
const { HitDice } = require('../extendsEmbeddedDocument/HitDiceSubdocument');



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
		
	}
}



module.exports = { HeroClass }