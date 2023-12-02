const camo = require("camo");
const { Species } = require("../extendsContentBaseDocument/SpeciesModel");
const { Alignment } = require("../extendsContentBaseDocument/AlignmentModel");
const { Health } = require("./HealthSubdocument");
const { CarryCapacity } = require("./CarryCapacitySubdocument");
const { CreatureSize } = require("./CreatureSizeSubdocument");
const { ProficiencyBonus } = require("./ProficiencyBonusSubdocument");
const { Movement } = require("./MovementSubdocument");
const { AbilityScore } = require("./AbilityScoreSubdocument");
const { ArmourClass } = require("./ArmourClassSubdocument");
const { CreatureClass } = require("./CreatureClassSubdocument");
const { Inventory } = require("./InventorySubdocument");
const { CreatureLanguage } = require("./CreatureLanguageSubdocument");
const { AppliedCondition } = require("./AppliedConditionSubdocument");
const { DamageMultiplier } = require("./DamageMultipierSubdocument");
const { CreatureSense } = require("./CreatureSenseSubdocument");
const { CreatureSkill } = require("./CreatureSkillSubdocument");
const { ItemProficiency } = require("./ItemProficiencySubdocument");
const { FeatureInstance } = require("./FeatureInstanceSubdocument");
const { SubcreatureCategory } = require("../extendsContentBaseDocument/SubcreatureCategoryModel");
const { CharacterAdvancement } = require("../extendsContentBaseDocument/CharacterAdvancementModel");

const EmbeddedDocument = camo.EmbeddedDocument;



class Creature extends EmbeddedDocument {
	constructor(){
		super();
		
		this.species = {
			type: Species,
			required: true
		}

		this.alignment = {
			type: Alignment,
			required: true
		}

		this.health = {
			type: Health,
			required: true
		}

		this.carryCapacity = {
			type: CarryCapacity,
			required: true
		}
		
		this.attuneMaxCount = {
			type: Number,
			required: true,
			default: 3
		}

		this.size = {
			type: CreatureSize,
			required: true
		}

		this.proficiencyBonus = {
			type: ProficiencyBonus,
			required: true
		}

		this.movements = {
			type: [Movement],
			required: true
		}

		this.abilityScores = {
			type: [AbilityScore],
			required: true
		}

		this.armourClass = {
			type: ArmourClass,
			required: true
		}

		this.attacksPerAction = {
			type: Number,
			required: true,
			default: 1
		}

		this.classes = {
			type: [CreatureClass],
			required: false
		}

		this.inventory = {
			type: Inventory,
			required: false
		}

		this.languages = {
			type: [CreatureLanguage],
			required: false
		}

		this.conditionsActive = {
			type: [AppliedCondition],
			required: false
		}

		this.conditionsImmune = {
			type: [AppliedCondition],
			required: false
		}

		this.damageModifiers = {
			type: [DamageMultiplier],
			required: false
		}

		this.senses = {
			type: [CreatureSense],
			required: false
		}

		this.skills = {
			type: [CreatureSkill],
			required: true
		}

		this.itemProficiencies = {
			type: [ItemProficiency],
			required: false
		}

		this.features = {
			type: [FeatureInstance],
			required: false
		}

		this.subcreatureCategory = {
			type: SubcreatureCategory,
			required: false
		}

		this.characterAdvancementTable = {
			type: CharacterAdvancement,
			required: false
		}

	}
}



module.exports = { Creature }