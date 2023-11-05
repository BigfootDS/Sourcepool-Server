const { DamageType } = require('../DamageTypeModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;


/**
 * Basically a join table between DamageType and a character.
 * As an embedded document, this only exists within other documents, such as characters.
 * @date 8/29/2023 - 11:10:01 AM
 * @author BigfootDS
 *
 * @class
 * @property {Number} multiplier Required, default 1. Higher numbers (eg. 2) represent a vulnerability, lower numbers (eg. 0.5) represent resistance. Zero represents immunity to the damage type.
 * @property {DamageType} damageType Required. The specific damage type affected by the multiplier.
 * @extends {EmbeddedDocument}
 */
class DamageMultiplier extends EmbeddedDocument{
	constructor(){
		super();

		this.multiplier = {
			type: Number,
			required: true,
			default: 1,
		}

		this.damageType = {
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