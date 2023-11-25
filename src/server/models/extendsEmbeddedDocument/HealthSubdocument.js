const camo = require("camo");
const { TempHealth } = require("./TempHealthSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Health extends EmbeddedDocument {
	constructor(){
		super();
		
		this.current = {
			type: Number,
			required: true,
			default: 1
		}

		this.max = {
			type: Number,
			required: true,
			default: 1
		}

		this.tempHealth = {
			type: [TempHealth],
			required: true
		}

		this.numOfTempHealthAllowed = {
			type: Number,
			required: true,
			default: 1
		}

		this.maxSetOverride = {
			type: Number,
			required: false
		}

		this.maxBonusOverride = {
			type: Number,
			required: false
		}
		
	}
}



module.exports = { Health }