const camo = require('camo');
const { DamageType } = require('../extendsContentBaseDocument/DamageTypeModel');
const EmbeddedDocument = camo.EmbeddedDocument;

class AdditionalDamage extends EmbeddedDocument {
	constructor(){
		super();

		this.damageType = {
			type: DamageType,
			required: true,
		}

		this.value = {
			type: Number,
			required: true,
			default: 0
		}

	}


}

module.exports = {AdditionalDamage}