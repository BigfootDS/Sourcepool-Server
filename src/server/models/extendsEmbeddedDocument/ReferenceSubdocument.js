const camo = require("camo");
const { HeroClass } = require("../extendsContentBaseDocument/HeroClassModel");
const { AbilityScoreKVP } = require("./AbilityScoreKVPSubdocument");
const { ClassLevelKVP } = require("./ClassLevelKVPSubdocument");
const { ItemProficiency } = require("./ItemProficiencySubdocument");
const { SkillProficiencyKVP } = require("./SkillProficiencyKVPSubdocument");
const { Spell } = require("../extendsContentBaseDocument/SpellModel");
const { SpellSchool } = require("../extendsContentBaseDocument/SpellSchoolModel");
const { Species } = require("../extendsContentBaseDocument/SpeciesModel");
const { Alignment } = require("../extendsContentBaseDocument/AlignmentModel");
const { CreatureLanguage } = require("./CreatureLanguageSubdocument");
const { CreatureSense } = require("./CreatureSenseSubdocument");
const { CreatureSize } = require("./CreatureSizeSubdocument");
const { Feature } = require("../extendsContentBaseDocument/FeatureModel");
const { DamageMultiplier } = require("./DamageMultipierSubdocument");
const { CurrencyQuantity } = require("./CurrencyQuantitySubdocument");
const { Inventory } = require("./InventorySubdocument");
const { ItemProperty } = require("./ItemPropertySubdocument");
const { Action } = require("./ActionSubdocument");
const { Spellcasting } = require("./SpellcastingSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Reference extends EmbeddedDocument {
	constructor(){
		super();
		
		this.classes = {
			type: [HeroClass],
			required: false
		}

		this.tags = {
			type: [String],
			required: false
		}

		this.abilityScoreKVPs = {
			type: [AbilityScoreKVP],
			required: false
		}

		this.totalCharacterLevel = {
			type: Number,
			required: false
		}

		this.classLevels = {
			type: [ClassLevelKVP],
			required: false
		}

		this.skillHalfProficiencies = {
			type: [SkillProficiencyKVP],
			required: false
		}

		this.skillProficiencies = {
			type: [SkillProficiencyKVP],
			required: false
		}

		this.skillExpertises = {
			type: [SkillProficiencyKVP],
			required: false
		}

		this.itemProficiencies = {
			type: [ItemProficiency],
			required: false
		}

		this.knownSpells = {
			type: [Spell],
			required: false
		}

		this.knownSpellSchools = {
			type: [SpellSchool],
			required: false
		}

		this.capableSpellLevel = {
			type: Number,
			required: false
		}

		this.isSpecies = {
			type: [Species],
			required: false
		}

		this.hasParentSpecies = {
			type: [Species],
			required: false
		}

		this.alignments = {
			type: [Alignment],
			required: false
		}

		this.languages = {
			type: [CreatureLanguage],
			required: false
		}

		this.sizes = {
			type: [CreatureSize],
			required: false
		}

		this.senses = {
			type: [CreatureSense],
			required: false
		}

		this.features = {
			type: [Feature],
			required: false
		}

		this.damageMultipliers = {
			type: [DamageMultiplier],
			required: false
		}

		this.currencyQuantities = {
			type: [CurrencyQuantity],
			required: false
		}

		this.items = {
			type: [Inventory],
			required: false
		}

		this.itemProperties = {
			type: [ItemProperty],
			required: false
		}

		this.actions = {
			type: [Action],
			required: false
		}

		this.spellcastings = {
			type: [Spellcasting],
			required: false
		}
		
	}
}



module.exports = { Reference }