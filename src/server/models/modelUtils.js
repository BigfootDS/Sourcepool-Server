
const models = {
	extendsDocument: {
		user: require("./extendsDocument/UserModel").User,
		role: require("./extendsDocument/RoleModel").Role,
		serverConfig: require('./extendsDocument/ServerConfig').ServerConfig
	},
	extendsCustomBaseDocument: {
		campaign: require("./extendsCustomBaseDocument/CampaignModel").Campaign,
		dice: require("./extendsCustomBaseDocument/DiceModel").Dice,
		game: require("./extendsCustomBaseDocument/GameModel").Game,
		product: require("./extendsCustomBaseDocument/ProductModel").Product
	},
	extendsContentBaseDocument: {
		ability: require("./extendsContentBaseDocument/AbilityModel").Ability,
		actionType: require("./extendsContentBaseDocument/ActionTypeModel").ActionType,
		alignment: require('./extendsContentBaseDocument/AlignmentModel').Alignment,
		attackType: require('./extendsContentBaseDocument/AttackTypeModel').AttackType,
		calendar: require("./extendsContentBaseDocument/CalendarModel").Calendar,
		castingComponent: require('./extendsContentBaseDocument/CastingComponentModel').CastingComponent,
		condition: require('./extendsContentBaseDocument/ConditionModel').Condition,
		creatureInstance: require('./extendsContentBaseDocument/CreatureInstanceModel').CreatureInstance,
		currencyExchange: require('./extendsContentBaseDocument/CurrencyExchangeModel').CurrencyExchange,
		currencyModel: require('./extendsContentBaseDocument/CurrencyModel').Currency,
		damageType: require("./extendsContentBaseDocument/DamageTypeModel").DamageType,
		day: require("./extendsContentBaseDocument/DayModel").Day,
		encounter: require('./extendsContentBaseDocument/EncounterModel').Encounter,
		epoch: require("./extendsContentBaseDocument/EpochModel").Epoch,
		feature: require("./extendsContentBaseDocument/FeatureModel").Feature,
		heroClass: require('./extendsContentBaseDocument/HeroClassModel').HeroClass,
		item: require('./extendsContentBaseDocument/ItemModel').Item,
		language: require('./extendsContentBaseDocument/LanguageModel').Language,
		lore: require("./extendsContentBaseDocument/LoreModel").Lore,
		month: require("./extendsContentBaseDocument/MonthModel").Month,
		place: require('./extendsContentBaseDocument/PlaceModel').Place,
		sense: require('./extendsContentBaseDocument/SenseModel').Sense,
		size: require('./extendsContentBaseDocument/SizeModel').Size,
		skill: require('./extendsContentBaseDocument/SkillModel').Skill,
		species: require('./extendsContentBaseDocument/SpeciesModel').Species,
		spellLevel: require('./extendsContentBaseDocument/SpellLevelModel').SpellLevel,
		spell: require('./extendsContentBaseDocument/SpellModel').Spell,
		spellSchool: require('./extendsContentBaseDocument/SpellSchoolModel').SpellSchool,
		subcreatureCategory: require('./extendsContentBaseDocument/SubcreatureCategoryModel').SubcreatureCategory,
		universe: require('./extendsContentBaseDocument/UniverseModel').Universe
	}
}

const modelsFlat = Object.assign(
	models.extendsDocument,
	models.extendsCustomBaseDocument,
	models.extendsContentBaseDocument
);



async function pingAllModels(){

	await Promise.all(Object.entries(modelsFlat).map(async (kvp) => {
		await kvp[1].findOne({});
	}));
}


async function serverMinimalSetup(){
	let roles = await models.extendsDocument.role.find({});
	if (roles.length == 0){
		// create user and admin roles


		// and then update roles to match new data
		roles = await models.extendsDocument.role.find({});
	}
}


module.exports = {
	helpers: {
		pingAllModels
	},
	models: models,
	modelsFlat: modelsFlat
}


