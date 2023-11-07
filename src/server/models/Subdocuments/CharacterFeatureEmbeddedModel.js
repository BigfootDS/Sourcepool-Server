const { Feature } = require('../FeatureModel');
const { AbilityScore } = require('./AbilityScoreEmbeddedModel');
const { CharacterSkill } = require('./CharacterSkillEmbeddedModel');
const { TemplateLevel } = require('./TemplateLevelGateEmbeddedModel');

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

		this.isUnlocked = {
			type: Boolean,
			required: true,
			default: false,
			unique: false
		}

		this.requiredTotalLevel = {
			type: Number,
			required: false,
			unique: false
		}

		this.unlockableFeatures = {
			type: [Feature],
			required: true,
			unique: false
		}

		this.requiredTemplateLevels = {
			type: [TemplateLevel],
			required: false
		}

		this.requiredProficiencies = {
			type: [CharacterSkill],
			required: false
		}

		this.requiredAbilityScores = {
			type: [AbilityScore],
			required: false
		}
	}
}

module.exports = {
	CharacterFeature
}