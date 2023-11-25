const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');

// This model exists because, while yes, D&D spell levels are numbers - other game systems could change.
// Or D&D itself might change.
// Maybe one day we'll have "Common", "Heroic", "Mythical", and "Godly" spells instead of 
// numbers that don't always fit right for the spell.

class SpellLevel extends ContentBaseDocument {
	constructor(){
		super();
		
		this.level = {
			type: Number,
			required: false
		}
		
	}
}



module.exports = { SpellLevel }