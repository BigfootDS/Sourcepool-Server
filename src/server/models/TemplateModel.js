const { AbilityScore } = require('./Subdocuments/AbilityScoreEmbeddedModel');
const { CharacterFeature } = require('./Subdocuments/CharacterFeatureEmbeddedModel');
const { CharacterSkill } = require('./Subdocuments/CharacterSkillEmbeddedModel');
const { Condition } = require('./ConditionModel');
const { DamageMultiplier } = require('./Subdocuments/DamageMultiplierEmbeddedModel');
const { Source } = require('./SourceModel');



/**
 * Batch of data that could be applied to characters. For example: races, species, and even modifiers like "skeletal".
 * Cannot be used directly - meaning, data here is copied to a character in order for it to be used.
 * @date 8/29/2023 - 11:25:34 AM
 * @author BigfootDS
 *
 * @property {[AbilityScore]} abilityScores Required. The template's stats for things like strength and constitution.
 * @property {[CharacterSkill]} skills Optional. Skills that a template has some sort of bonus or modifier for, if they were to make a check for that skill. This typically means proficient or expertise skills.
 * @property {[Condition]} conditionActives Optional. Conditions currently applied to the template.
 * @property {[Condition]} conditionImmunities Optional. Conditions that this template can never have as active conditions.
 * @property {[DamageMultiplier]} damageVulnerabilities Optional. Damage types and their associated multiplier for how much damage of that type would be done to this template.
 * @property {[DamageMultiplier]} damageResistances Optional. Damage types and their associated multiplier for how much damage of that type would be done to this template.
 * @property {[DamageMultiplier]} damageImmunities Optional. Damage types and their associated multiplier for how much damage of that type would be done to this template.
 * @property {[CharacterFeature]} features Optional. Mechanics, features, feats, and other modular behaviours that this template has.
 * @class
 * @extends {Source}
 */
class Template extends Source{
	constructor(){
		super();

		this.level = {
			type: Number,
			required: true, 
			default: 0
		}

		this.abilityScores = {
			type: [AbilityScore],
			required: false
		}

		this.skills = {
			type: [CharacterSkill],
			required: false
		}

		this.conditionActives = {
			type: [Condition],
			required: false
		}

		this.conditionImmunities = {
			type: [Condition],
			required: false
		}

		this.damageVulnerabilities = {
			type: [DamageMultiplier],
			required: false
		}

		this.damageResistances = {
			type: [DamageMultiplier],
			required: false
		}

		this.damageImmunities = {
			type: [DamageMultiplier],
			required: false
		}


		this.features = {
			type: [CharacterFeature],
			required: false
		}
	}

	static collectionName() {
		return 'templates';
	}


}

module.exports = {
	Template
}