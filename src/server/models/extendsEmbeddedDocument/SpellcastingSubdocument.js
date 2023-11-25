const camo = require("camo");
const { Ability } = require("../extendsContentBaseDocument/AbilityModel");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const { LevelledResourceTable } = require("./LevelledResourceTableSubdocument");
const { Spell } = require("../extendsContentBaseDocument/SpellModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class Spellcasting extends EmbeddedDocument {
	constructor(){
		super();
		
		this.spellcastingAbility = {
			type: Ability,
			required: true
		}

		this.spellcastingAbilityOverride = {
			type: Ability,
			required: true
		}
		
		this.preparedSpellCategoryName = {
			type: [LocalizedContent],
			required: true,
			default: [
				LocalizedContent.create({
					language: "en",
					name: "Prepared Spells",
					content: ""
				})
			]
		}

		this.spellChangeEvent = {
			type: [LocalizedContent],
			required: true,
			default: [
				LocalizedContent.create({
					language: "en",
					name: "Long Rest",
					content: ""
				})
			]
		}

		this.spellSlotsRegainedEvent = {
			type: [LocalizedContent],
			required: true,
			default: [
				LocalizedContent.create({
					language: "en",
					name: "Long Rest",
					content: ""
				})
			]
		}

		this.ritualsAllowed = {
			type: Boolean,
			required: true,
			default: false
		}

		this.slotsProgressionTable = {
			type: [LevelledResourceTable],
			required: true,
		}

		this.slotsUsed = {
			type: LevelledResourceTable,
			required: true
		}

		this.preparedSpells = {
			type: [Spell],
			required: true
		}

		this.spellsLearned = {
			type: [Spell],
			required: true
		}

		this.spellsLearnable = {
			type: [Spell],
			required: true
		}

	}
}



module.exports = { Spellcasting }