const camo = require("camo");
const { SpellLevel } = require("../extendsContentBaseDocument/SpellLevelModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class SpellSlotCount extends EmbeddedDocument {
	constructor(){
		super();
		
		this.level = {
			type: SpellLevel,
			required: true
		}

		this.slotCount = {
			type: Number,
			required: false // not required because cantrips don't have a slot number cap!
		}
		
		
	}
}



module.exports = { SpellSlotCount }