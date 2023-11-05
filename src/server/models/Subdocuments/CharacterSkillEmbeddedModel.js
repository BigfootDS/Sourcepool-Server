const { Ability } = require('../AbilityModel');
const { Skill } = require('../SkillModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;

/**
 * Basically a join table between Skill and a character.
 * As an embedded document, this only exists within other documents, such as characters.
 * @date 8/29/2023 - 11:10:01 AM
 * @author BigfootDS
 *
 * @class
 * @property {Boolean} applyProficiencyBonus Required, default false. Flag to determine if a character's proficiency bonus should be applied to a skill check for this skill.
 * @property {Ability} abilityOverride Optional. Allows a character to perform a skill check using a different base ability, such as making an Intimidation check via the Strength ability instead of the Charisma ability.
 * @property {Number} proficiencyBonusMultiplier Required, default 1. Applies to the proficiency bonus added to a skill check for this skill.
 * @property {SKill} skill Required. The specific skill affected by the multiplier.
 * @extends {EmbeddedDocument}
 */
class CharacterSkill extends EmbeddedDocument{
	constructor(){
		super();

		this.applyProficiencyBonus = {
			type: Boolean,
			required: true,
			default: false,
		}

		this.abilityOverride = {
			type: Ability,
			required: false
		}

		this.proficiencyBonusMultiplier = {
			type: Number,
			required: true,
			default: 1
		}

		this.skill = {
			type: Skill,
			required: true
		}
	}

	static collectionName() {
		return 'characterskills';
	}
}


module.exports = {
	CharacterSkill
}