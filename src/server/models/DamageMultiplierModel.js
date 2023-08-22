const { DamageType } = require('./DamageTypeModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;

class DamageMultiplier extends EmbeddedDocument{
	constructor(){
		super();

		this.multiplier = {
			type: Number,
			required: true,
			default: 1,
		}

		this.skill = {
			type: DamageType,
			required: true
		}
	}

	static collectionName() {
		return 'damagemultipliers';
	}
}


module.exports = {
	DamageMultiplier
}