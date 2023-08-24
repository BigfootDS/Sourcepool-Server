const { Ability } = require('../../models/AbilityModel');
const { AbilityScore } = require('../../models/AbilityScoreModel');
const { Campaign } = require('../../models/CampaignModel');
const { Character } = require('../../models/CharacterModel');
const { CharacterSkill } = require('../../models/CharacterSkillModel');
const { Condition } = require('../../models/ConditionModel');
const { DamageMultiplier } = require('../../models/DamageMultiplierModel');
const { DamageType } = require('../../models/DamageTypeModel');
const { Game } = require('../../models/GameModel');
const { Item } = require('../../models/ItemModel');
const { Lore } = require('../../models/LoreEmbeddedModel');
const { Place } = require('../../models/PlaceModel');
const { Prop } = require('../../models/PropModel');
const { Skill } = require('../../models/SkillModel');
const { Universe } = require('../../models/UniverseModel');
const { User } = require('../../models/UserModel');


const createDefaultData = async () => {
	// Check if this game already exists in the DB,
	// only proceed if it's not found
	let matchingGame = await Game.count({description: [{name: "srd5.1"}]});

	if (matchingGame > 0){
		throw new Error("Attempted to seed default data for SRD 5.1 but the game already exists. Was a prior deletion interrupted?");
	}

	let adminUsers = await User.find({isAdmin:true});

	if (adminUsers.length == 0){
		throw new Error("No admins found. Something has gone wrong with the server data.");
	} else {
		adminUsers = adminUsers.map((user) => {
			return user._id;
		});
	}

	let newGame = await Game.create({
		description: [
			{
				language: "en",
				name:"SRD 5.1",
				content:"Compatible with fifth edition."
			}
		]
	}).save();

	let newCampaign = new Campaign({
		description: [
			{
				language: "en",
				name:"Example campaign",
				content:`An example campaign using rules and systems from ${newGame.description.name} to show how data can be set up for your own campaigns.`
			}
		],
		game: newGame._id,
		managers: adminUsers
	}).save();

	// SRD 5.1 CC page 97
	// Note that (at least on 24th August 2023) D&D Beyond uses different wording in some of these 
	// in their Basic Rules (Chapter 9, Damage and Healing), for some reason.
	// So, make sure you use the SRD for data - 
	// D&D Beyond's custom content is not covered by the same licence.
	let srdDamageTypes = [
		{
			name:"acid",
			content: "The corrosive spray of a black dragon's breath and the dissolving enzymes secreted by a black pudding deal acid damage."
		},
		{
			name:"bludgeoning",
			content:"Blunt force attacks -- hammers, falling, constriction, and the like -- deal bludgeoning damage."
		},
		{
			name: "cold",
			content:"The infernal chill radiating from an ice devil's spear and the frigid blast of a white dragon's breath deal cold damage."
		},
		{
			name: "fire",
			content:"Red dragons breathe fire, and many spells conjure flames to deal fire damage."
		},
		{
			name: "force",
			content:"Force is pure magical energy focused into a damaging form. Most effects that deal force damage are spells, including magic missile and spiritual weapon."
		},
		{
			name: "lightning",
			content:"A lightning bolt spell and a blue dragon's breath deal lightning damage."
		},
		{
			name: "necrotic",
			content:"Necrotic damage, dealt by certain undead and a spell such as chill touch, withers matter and even the soul."
		},
		{
			name: "piercing",
			content:"Puncturing and impaling attacks, including spears and monsters' bites, deal piercing damage."
		},
		{
			name: "poison",
			content:"Venomous stings and the toxic gas of a green dragon's breath deal poison damage."
		},
		{
			name: "psychic",
			content:"Mental abilities such as a mind flayer's psionic blast deal psychic damage."
		},
		{
			name: "radiant",
			content:"Radiant damage, dealt by a cleric's flame strike spell or an angel's smiting weapon, sears the flesh like fire and overloads the spirit with power."
		},
		{
			name: "slashing",
			content:"Swords, axes, and monsters' claws deal slashing damage."
		},
		{
			name: "thunder",
			content:"A concussive burst of sound, such as the effect of the thunderwave spell, deals thunder damage."
		},
	];

	let newDamageTypes = srdDamageTypes.map((dmgType) => {
		return DamageType.create({
			description: {
				language: "en",
				name:dmgType.name,
				content:dmgType.content
			}
		})
	})

}