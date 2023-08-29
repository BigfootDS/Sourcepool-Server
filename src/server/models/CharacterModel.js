const { AbilityScore } = require('./AbilityScoreModel');
const { CharacterSkill } = require('./CharacterSkillModel');
const { Condition } = require('./ConditionModel');
const { DamageMultiplier } = require('./DamageMultiplierModel');
const { Item } = require('./ItemModel');
const { Source } = require('./SourceModel');
const { User } = require('./UserModel');



/**
 * Represents both player-characters and non-player characters, including creatures/monsters. 
 * Everyone has a stat block!
 * @date 8/29/2023 - 11:25:34 AM
 * @author BigfootDS
 *
 * @property {Boolean} isPlayable Required, default false. Flag should be true if players can use this character and modify its data.
 * @property {Player} player Optional. Cannot have a value if this.isPlayable is false. This represents the non-admin and non-manager user who is allowed to use this character and modify its data.
 * @property {Number} healthCurrent Required, default 10. Hit points (HP) that this character currently has. 0 = unconscious or dead.
 * @property {Number} healthMax Required, default 10. The maximum amount of hit points (HP) that this character can have. Should never be lower than this.healthCurrent.
 * @property {Number} healthBonus Required, default 0. Additional hit points that are consumed at a higher priority than regular hit points. Usually 0, increases and resets to 0 in specific conditions or events.
 * @property {Number} deathSaveFails Optional. Not all characters will ever need to track this - it's usually just player characters or critical non-player characters. Should be 0 if this.healthCurrent is greater than 0.
 * @property {Number} deathSaveSuccesses Optional. Not all characters will ever need to track this - it's usually just player characters or critical non-player characters. Should be 0 if this.healthCurrent is greater than 0.
 * 
 * @class
 * @extends {Source}
 */
class Character extends Source{
	constructor(){
		super();

		this.isPlayable = {
			type: Boolean,
			required: true,
			default: false
		};

		this.player = {
			type: User,
			required: false
		}
		
		this.healthCurrent = {
			type: Number,
			required: true,
			default: 10
		}

		this.healthMax = {
			type: Number,
			required: true,
			default: 10
		}

		this.healthBonus = {
			type: Number,
			required: true,
			default: 0
		}

		this.deathSaveFails = {
			type: Number,
			required: false
		}

		this.deathSaveSuccesses = {
			type: Number,
			required: false
		}


		this.abilityScores = {
			type: [AbilityScore],
			required: true
		}


		this.inventory = {
			type: [Item],
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
	}

	static collectionName() {
		return 'characters';
	}


}

module.exports = {
	Character
}