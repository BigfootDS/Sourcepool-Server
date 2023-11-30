const { Ability } = require('../../../models/extendsContentBaseDocument/AbilityModel');
const { Condition } = require('../../../models/extendsContentBaseDocument/ConditionModel');
const { DamageType } = require('../../../models/extendsContentBaseDocument/DamageTypeModel');
const { Game } = require('../../../models/extendsCustomBaseDocument/GameModel');
const { LocalizedContent } = require('../../../models/extendsEmbeddedDocument/LocalizedContentSubdocument');
const { Product } = require("../../../models/extendsCustomBaseDocument/ProductModel");
const { Skill } = require('../../../models/extendsContentBaseDocument/SkillModel');
const modelUtils = require('../../../functions/modelUtils');
const { Dice } = require('../../../models/extendsCustomBaseDocument/DiceModel');
const { CastingComponent } = require('../../../models/extendsContentBaseDocument/CastingComponentModel');
const { ActionType } = require('../../../models/extendsContentBaseDocument/ActionTypeModel');


/**
 * This function creates default data based on SRD 5.1, available here: 
 * https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1.pdf
 * And here in the repository:
 * Sourcepool-Server/src/server/data/presets/SRD_CC_v5.1.pdf
 * 
 * Note that (at least on 24th August 2023) D&D Beyond uses different wording in some of these in their Basic Rules (Chapter 9, Damage and Healing), usually due to the referencing or linking functionality of the website/app.
 * 
 * For example, the SRD may reference a green dragon - but a green dragon is not a thing. The D&D Beyond content refers to the specific age-appropriate variant of a creature, such as adult green dragon, since that lets them hyperlink to a monster manual entry.
 * They also refer to the "DM" instead of "GM" - no clear reason for this.
 * 
 * So, make sure you use the SRD for data - D&D Beyond's custom content is not covered by the same licence.
 * @date 8/28/2023 - 4:59:09 PM
 * @author BigfootDS
 *
 * @async
 * @returns
 */
const createDefaultData = async () => {

	let srdTags = [
		"dnd5e", "srd5.1", "default data",
	]

	// Check if data already exists.
	let matchingGame = await Game.count({'descriptions.name':'Dungeons & Dragons 5th Edition',  tags: srdTags});
	console.log(`Found ${matchingGame} matching games in the default data.`);
	if (matchingGame > 0){
		// Stop if data already exists, we shouldn't overwrite it.
		console.warn("Attempted to seed default data for SRD 5.1 but the game already exists. Seeding did not proceed.");
		return;
	}


	// let admins = await modelUtils.helpers.getAdminCount();
	// if (admins.count == 0){
	// 	throw new Error("No admins found. Something has gone wrong with the server data.");
	// } 
	// console.log("Retrieved admin data:\n" + JSON.stringify(admins, null, 4));







	// Create data 

	let newGames = await require("./models/Game").createData({
		tags:srdTags
	});

	let newProducts = await require("./models/Product").createData({
		game: newGames[0],
		tags:srdTags
	});

	// Not specifically in SRD, but SRD provides no days/months/calendar info. 
	// Real world info should be used.
	let newDays = await require("./models/Day").createData({
		tags:srdTags,
		product: newProducts[0]
	});
	let newMonths = await require("./models/Month").createData({
		tags:srdTags,
		product: newProducts[0]
	});
	let newEpochs = await require("./models/Epoch").createData({
		tags:srdTags,
		product: newProducts[0]
	});
	// Calendars depend on Days, Months, and Epochs - make sure those exist first.
	let newCalendars = await require("./models/Calendar").createData({
		tags:srdTags,
		days: newDays,
		months: newMonths,
		epochs: newEpochs,
		product: newProducts[0]
	});


	let newDice = await require("./models/Dice").createData({
		tags:srdTags,
		product: newProducts[0]
	});

	let newAttackTypes = await require('./models/AttackType').createData({
		tags:srdTags,
		product: newProducts[0]
	});

	let newActionTypes = await require('./models/ActionType').createData({
		tags: srdTags,
		product: newProducts[0]
	});

	let newCastingComponents = await require('./models/CastingComponent').createData({
		tags: srdTags,
		product: newProducts[0]
	});

	let newDamageTypes = await require('./models/DamageType').createData({
		tags: srdTags,
		product: newProducts[0]
	});

	let newConditions = await require('./models/Condition').createData({
		tags: srdTags,
		product: newProducts[0]
	});

	let newAbilities = await require('./models/Ability').createData({
		tags: srdTags,
		product: newProducts[0]
	});

	/*
	newAbilities = [
		{
			descriptions: [
				{
					name: "Strength"
				}
			]
		}
	]
	*/

	// We need to retrieve these to associate the skills to abilities.

	let freshStrength = null;
	let freshDexterity = null;
	// let freshConstitution = await Ability.findOne({'descriptions.name':'constitution', 'descriptions.language':'en'});
	let freshIntelligence = null;
	let freshWisdom = null;
	let freshCharisma = null;

	newAbilities.forEach(ability => {
		ability.descriptions.forEach(localContent => {
			switch (localContent.name.toLowerCase()) {
				case 'strength':
					freshStrength = ability;
					break;
				case 'dexterity':
					freshDexterity = ability;
					break;
				case 'intelligence':
					freshIntelligence = ability;
					break;
				case 'wisdom':
					freshWisdom = ability;
					break;
				case 'charisma':
					freshCharisma = ability;
					break;
				default:
					break;
			}
		})
	});

	let newSkills = await require('./models/Skill').createData({
		tags: srdTags,
		product: newProducts[0],
		abilities: {
			strength: freshStrength,
			dexterity: freshDexterity,
			intelligence: freshIntelligence,
			wisdom: freshWisdom,
			charisma: freshCharisma
		}
	});

	let newSpellSchools = await require('./models/SpellSchool').createData({
		tags: srdTags,
		product: newProducts[0]
	});

	
	let newAlignments = await require('./models/Alignment').createData({
		tags: srdTags,
		product: newProducts[0]
	});
}


module.exports = {
	createDefaultData
}