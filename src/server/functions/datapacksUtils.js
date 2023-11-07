const { Ability } = require("../models/AbilityModel");
const { Calendar } = require("../models/CalendarModel");
const { Campaign } = require("../models/CampaignModel");
const { Character } = require("../models/CharacterModel");
const { Condition } = require("../models/ConditionModel");
const { DamageType } = require("../models/DamageTypeModel");
const { Encounter } = require("../models/EncounterModel");
const { Epoch } = require("../models/EpochModel");
const { Feature } = require("../models/FeatureModel");
const { Game } = require("../models/GameModel");
const { InGameDate } = require("../models/InGameDateModel");
const { InGameEvent } = require("../models/InGameEventModel");
const { Item } = require("../models/ItemModel");
const { Month } = require("../models/MonthModel");
const { Place } = require("../models/PlaceModel");
const { Product } = require("../models/ProductModel");
const { Prop } = require("../models/PropModel");
const { Skill } = require("../models/SkillModel");
const { Template } = require("../models/TemplateModel");
const { Universe } = require("../models/UniverseModel");

const MODELS = {
	Ability, Calendar, Campaign, Character, Condition, DamageType, Encounter,
	Epoch, Feature, Game, InGameDate, InGameEvent, Item, Month, Place, Product,
	Prop, Skill, Template, Universe
}



module.exports = {
	MODELS: MODELS
}