// #region Imports
// Extends Document
const { Role } = require("../models/extendsDocument/RoleModel");
const { ServerConfig } = require("../models/extendsDocument/ServerConfig");
const { User } = require("../models/extendsDocument/UserModel");

// Extends CustomBaseDocument
const { Campaign } = require("../models/extendsCustomBaseDocument/CampaignModel");
const { Dice } = require("../models/extendsCustomBaseDocument/DiceModel");
const { Game } = require("../models/extendsCustomBaseDocument/GameModel");
const { Product } = require("../models/extendsCustomBaseDocument/ProductModel");

// Extends ContentBaseDocument
const { Ability } = require("../models/extendsContentBaseDocument/AbilityModel");
const { ActionType } = require("../models/extendsContentBaseDocument/ActionTypeModel");
const { Alignment } = require("../models/extendsContentBaseDocument/AlignmentModel");
const { AttackType } = require("../models/extendsContentBaseDocument/AttackTypeModel");
const { Calendar } = require("../models/extendsContentBaseDocument/CalendarModel");
const { CastingComponent } = require("../models/extendsContentBaseDocument/CastingComponentModel");
const { Condition } = require("../models/extendsContentBaseDocument/ConditionModel");
const { CreatureInstance } = require("../models/extendsContentBaseDocument/CreatureInstanceModel");
const { CurrencyExchange } = require("../models/extendsContentBaseDocument/CurrencyExchangeModel");
const { Currency } = require("../models/extendsContentBaseDocument/CurrencyModel");
const { DamageType } = require("../models/extendsContentBaseDocument/DamageTypeModel");
const { Day } = require("../models/extendsContentBaseDocument/DayModel");
const { Encounter } = require("../models/extendsContentBaseDocument/EncounterModel");
const { Epoch } = require("../models/extendsContentBaseDocument/EpochModel");
const { Feature } = require("../models/extendsContentBaseDocument/FeatureModel");
const { HeroClass } = require("../models/extendsContentBaseDocument/HeroClassModel");
const { Item } = require("../models/extendsContentBaseDocument/ItemModel");
const { Language } = require("../models/extendsContentBaseDocument/LanguageModel");
const { LevelledProficiencyBonusTable } = require("../models/extendsContentBaseDocument/LevelledProficiencyBonusTableModel");
const { Lore } = require("../models/extendsContentBaseDocument/LoreModel");
const { Month } = require("../models/extendsContentBaseDocument/MonthModel");
const { Place } = require("../models/extendsContentBaseDocument/PlaceModel");
const { Sense } = require("../models/extendsContentBaseDocument/SenseModel");
const { Size } = require("../models/extendsContentBaseDocument/SizeModel");
const { Skill } = require("../models/extendsContentBaseDocument/SkillModel");
const { Species } = require("../models/extendsContentBaseDocument/SpeciesModel");
const { SpellLevel } = require("../models/extendsContentBaseDocument/SpellLevelModel");
const { Spell } = require("../models/extendsContentBaseDocument/SpellModel");
const { SpellSchool } = require("../models/extendsContentBaseDocument/SpellSchoolModel");
const { SubcreatureCategory } = require("../models/extendsContentBaseDocument/SubcreatureCategoryModel");
const { Universe } = require("../models/extendsContentBaseDocument/UniverseModel");

// Extends EmbeddedDocument
const { AbilityScoreKVP } = require("../models/extendsEmbeddedDocument/AbilityScoreKVPSubdocument");
const { AbilityScore } = require("../models/extendsEmbeddedDocument/AbilityScoreSubdocument");
const { Action } = require("../models/extendsEmbeddedDocument/ActionSubdocument");
const { AdditionalDamage } = require("../models/extendsEmbeddedDocument/AdditionalDamageSubdocument");
const { AdditionalModifier } = require("../models/extendsEmbeddedDocument/AdditionalModifierSubdocument");
const { AppliedCondition } = require("../models/extendsEmbeddedDocument/AppliedConditionSubdocument");
const { ArmourClass } = require("../models/extendsEmbeddedDocument/ArmourClassSubdocument");
const { Attack } = require("../models/extendsEmbeddedDocument/AttackSubdocument");
const { CampaignCalendar } = require("../models/extendsEmbeddedDocument/CampaignCalendarSubdocument");
const { CarryCapacity } = require("../models/extendsEmbeddedDocument/CarryCapacitySubdocument");
const { Choice } = require("../models/extendsEmbeddedDocument/ChoiceSubdocument");
const { ClassLevelKVP } = require("../models/extendsEmbeddedDocument/ClassLevelKVPSubdocument");
const { ContentPermission } = require("../models/extendsEmbeddedDocument/ContentPermissionSubdocument");
const { CreatureClass } = require("../models/extendsEmbeddedDocument/CreatureClassSubdocument");
const { CreatureLanguage } = require("../models/extendsEmbeddedDocument/CreatureLanguageSubdocument");
const { CreatureSense } = require("../models/extendsEmbeddedDocument/CreatureSenseSubdocument");
const { CreatureSize } = require("../models/extendsEmbeddedDocument/CreatureSizeSubdocument");
const { CreatureSkill } = require("../models/extendsEmbeddedDocument/CreatureSkillSubdocument");
const { Creature } = require("../models/extendsEmbeddedDocument/CreatureSubdocument");
const { CurrencyQuantity } = require("../models/extendsEmbeddedDocument/CurrencyQuantitySubdocument");
const { DamageMultiplier } = require("../models/extendsEmbeddedDocument/DamageMultipierSubdocument");
const { DiceRoll } = require("../models/extendsEmbeddedDocument/DiceRollSubdocument");
const { FeatureInstance } = require("../models/extendsEmbeddedDocument/FeatureInstanceSubdocument");
const { Health } = require("../models/extendsEmbeddedDocument/HealthSubdocument");
const { HitDice } = require("../models/extendsEmbeddedDocument/HitDiceSubdocument");
const { ImportantDate } = require("../models/extendsEmbeddedDocument/ImportantDateSubdocument");
const { ImportantEvent } = require("../models/extendsEmbeddedDocument/ImportantEventSubdocument");
const { Initiative } = require("../models/extendsEmbeddedDocument/InitiativeSubdocument");
const { Inventory } = require("../models/extendsEmbeddedDocument/InventorySubdocument");
const { ItemInstance } = require("../models/extendsEmbeddedDocument/ItemInstanceSubdocument");
const { ItemProficiency } = require("../models/extendsEmbeddedDocument/ItemProficiencySubdocument");
const { ItemProperty } = require("../models/extendsEmbeddedDocument/ItemPropertySubdocument");
const { LevelledResourceTable } = require("../models/extendsEmbeddedDocument/LevelledResourceTableSubdocument");
const { LocalizedContent } = require("../models/extendsEmbeddedDocument/LocalizedContentSubdocument");
const { Movement } = require("../models/extendsEmbeddedDocument/MovementSubdocument");
const { Prerequisite } = require("../models/extendsEmbeddedDocument/PrerequisiteSubdocument");
const { ProficiencyBonus } = require("../models/extendsEmbeddedDocument/ProficiencyBonusSubdocument");
const { Reference } = require("../models/extendsEmbeddedDocument/ReferenceSubdocument");
const { SkillProficiencyKVP } = require("../models/extendsEmbeddedDocument/SkillProficiencyKVPSubdocument");
const { SkillScoreKVP } = require("../models/extendsEmbeddedDocument/SkillScoreKVPSubdocument");
const { Spellcasting } = require("../models/extendsEmbeddedDocument/SpellcastingSubdocument");
const { SpellComponent } = require("../models/extendsEmbeddedDocument/SpellComponentSubdocument");
const { SpellSlotCount } = require("../models/extendsEmbeddedDocument/SpellSlotCountSubdocument");
const { TempHealth } = require("../models/extendsEmbeddedDocument/TempHealthSubdocument");

//#endregion

const models = {
	extendsDocument: {
		User,
		Role,
		ServerConfig
	},
	extendsCustomBaseDocument: {
		Campaign,
		Dice,
		Game,
		Product
	},
	extendsContentBaseDocument: {
		Ability,
		ActionType,
		Alignment,
		AttackType,
		Calendar,
		CastingComponent,
		Condition,
		CreatureInstance,
		CurrencyExchange,
		Currency,
		DamageType,
		Day,
		Encounter,
		Epoch,
		Feature,
		HeroClass,
		Item,
		Language,
		LevelledProficiencyBonusTable, 
		Lore,
		Month,
		Place,
		Sense,
		Size,
		Skill,
		Species,
		SpellLevel,
		Spell,
		SpellSchool,
		SubcreatureCategory,
		Universe
	},
	extendsEmbeddedDocument: {
		AbilityScoreKVP, AbilityScore,
		Action,
		AdditionalDamage,
		AdditionalModifier,
		AppliedCondition,
		ArmourClass,
		Attack,
		CampaignCalendar,
		CarryCapacity,
		Choice,
		ClassLevelKVP,
		ContentPermission,
		CreatureClass, CreatureLanguage, CreatureSense, CreatureSize, CreatureSkill, Creature,
		CurrencyQuantity,
		DamageMultiplier,
		DiceRoll,
		FeatureInstance,
		Health,
		HitDice,
		ImportantDate, ImportantEvent,
		Initiative,
		Inventory,
		ItemInstance, ItemProficiency, ItemProperty,
		LevelledResourceTable, LocalizedContent, Movement,
		Prerequisite, ProficiencyBonus, Reference,
		SkillProficiencyKVP, SkillScoreKVP,
		Spellcasting, SpellComponent, SpellSlotCount,
		TempHealth
	}
}

const referenceModelsFlat = Object.assign(
	models.extendsDocument,
	models.extendsCustomBaseDocument,
	models.extendsContentBaseDocument
);



async function pingAllModels(){

	await Promise.all(Object.entries(referenceModelsFlat).map(async (kvp) => {
		await kvp[1].findOne({});
	}));
}


async function serverMinimalSetup(){
	let roles = await models.extendsDocument.Role.find({});
	if (roles.length == 0){
		// create user and admin roles
		let regularUserRole = await models.extendsDocument.Role.create({
			admin: false,
			descriptions: [
				{
					language: "en",
					name: "User",
					content:"Default user type. Permissions may be limited by the server owner."
				}
			]
		}).save();

		let adminUserRole = await models.extendsDocument.Role.create({
			admin: true,
			descriptions: [
				{
					language: "en",
					name:"Admin",
					content:"Elevated permissions granted. Admins have full control over the server."
				}
			]
		}).save();

		// and then update roles to match new data
		roles = await models.extendsDocument.Role.find({});
	}

	let serverConfig = await models.extendsDocument.ServerConfig.find({});
	if (serverConfig.length == 0){
		let newServerConfig = await models.extendsDocument.ServerConfig.create({
			name: "Sourcepool Server",
			ftueComplete: false,
			usersNeedPasswords: true,
			onlyAdminCanEditContent: true,
			usersCanDeleteSelf: true,
			localWebClientVersion: "0.0.0",
			shouldAutoUpdateLocalClient: true,
			clientAutoUpdateInterval: 1000 * 60 * 60, // one hour
			jwtEncryptionKey: "Customise this to increase the security level of the server's password encryption.",
			jwtLifetimeBeforeExpiry: "7d",
			passwordSaltCostFactor: 8
		}).save();
	}

}

async function getAdminCount(){
	let adminCount = 0;
	let tempAllUsers = await models.extendsDocument.User.find({});
	let adminUsers = tempAllUsers.map((user) => {
		let result = user.roles.filter(role => {
			return role.admin === true;
		})

		if (result) return user;

	});

	if (adminUsers.length){
		adminCount = adminUsers.length;
	}

	return {count: adminCount, users: adminUsers};
}



async function filterForUserRead (userId, targetDocuments) {
	let filteredDocuments = [];

	
	let actingUser = await User.findOne({_id: userId});
	console.log("Acting user:");
	console.log(actingUser);

	if (actingUser.roles.some(role => role.admin)){
		filteredDocuments = targetDocuments;
	} else {
		targetDocuments.forEach((doc) => {
			// Filter each document role for the ones that have read:true
			let rolesThatCanRead = doc.permissions?.map(perm => {
				if (perm.read){
					return perm.role;
				}
			}) || [];
			
			//console.log(rolesThatCanRead);
	
			// Foreach role that can read this document, check if the user has that role
			let userHasRightRoles = actingUser.roles.some((role) => {
				// console.log("Checking if this role is in the rolesThatCanRead:" + role._id);
				return rolesThatCanRead.includes(role._id);
			})
			
			// If user has that role, return that document
			if (userHasRightRoles){
				filteredDocuments.push(doc);
			}
	
		});
	}

	

	return filteredDocuments;
}


module.exports = {
	helpers: {
		pingAllModels,
		serverMinimalSetup,
		getAdminCount,
		filterForUserRead
	},
	models: models,
	modelsFlat: referenceModelsFlat
}


