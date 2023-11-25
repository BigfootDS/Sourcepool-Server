const camo = require("camo");
const { SpellSlotCount } = require("./SpellSlotCountSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class LevelledResourceTable extends EmbeddedDocument {
	constructor(){
		super();
		
		this.cantripsPrepared = {
			type: Number,
			required: false
		}

		this.levelledResource = {
			type: [SpellSlotCount],
			required: false
		}
		
	}
}



module.exports = { LevelledResourceTable }