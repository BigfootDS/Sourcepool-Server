const camo = require('camo');
const { DamageType } = require('../extendsContentBaseDocument/DamageTypeModel');
const EmbeddedDocument = camo.EmbeddedDocument;

class DamageMultiplier extends EmbeddedDocument {
	constructor(){
		super();

		this.damageType = {
			type: DamageType,
			required: true,
		}

		this.multiplier = {
			type: Number,
			required: true,
			default: 1
		}

	}


}

module.exports = {DamageMultiplier}