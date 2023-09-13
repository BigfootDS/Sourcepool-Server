const { Feature } = require('./FeatureModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;


/**
 * Per-character instance of a feature. Some features include options that a user must make, so they are managed here.
 * @date 8/31/2023 - 11:20:08 AM
 * @author BigfootDS
 *
 * @class
 * @property {Feature} feature Required. The associated feature for this instance.
 * @extends {EmbeddedDocument}
 */
class CharacterFeature extends EmbeddedDocument{
	constructor(){
		super();

		this.feature = {
			type: Feature,
			required: true
		}
	}
}

module.exports = {
	CharacterFeature
}