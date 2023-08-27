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

	let newDamageTypes = srdDamageTypes.map(async (dmgType) => {
		return await DamageType.create({
			description: {
				language: "en",
				name:dmgType.name,
				content:dmgType.content
			}
		}).save();
	});

	// SRD 5.1 CC page 358
	let srdConditions = [
		{
			name: "blinded",
			content: "A blinded creature can't see and automatically fails any ability check that requires sight.\nAttack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
		},
		{
			name: "charmed",
			content: "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.\nThe charmer has advantage on any ability check to interact socially with the creature."
		},
		{
			name: "exhaustion",
			content: "Some special abilities and environmental hazards, such as starvation and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An affect can give a creature one or more levels of exhaustion, as specified in the effect's description.\nIf an already exhausted creature suffers another effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect's description.\nA creature suffers the effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on ability checks.\nAn effect that removes exhaustion reduces its level as specified in the effect's description, with all exhaustion effects ending if a creature's exhaustion level is reduced below 1.\nFinishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink."
		},
		{
			name: "frightened",
			content: "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.\nThe creature can't willingly move closer to the source of its fear."
		},
		{
			name:"grappled",
			content:"A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.\nThe condition ends if the grappler is incapacitated (see the condition).\nThe	condition	also	ends	if	an	effect	removes	the grappled	creature	from	the	reach	of	the	grappler or	grappling	effect,	such	as	when	a	creature	is hurled	away	by	the	thunder-wave spell."
		},
		{
			name:"incapacitated",
			content:"An incapacitated creature can't take actions or reactions."
		},
		{
			name:"invisible",
			content:"An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves.\nAttack rolls against the creature have disadvantage, and the creature's attack rolls have advantage."
		},
		{
			name:"paralyzed",
			content:"A paralyzed creature is incapacitated (see the condition) and can't move or speak.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
		},
		{
			name:"petrified",
			content:"A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.\nThe creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.\nAttack rolls against the creature have advantage.\nThe creature automatically fails Strength and Dexterity saving throws.\nThe creature has resistance to all damage.\nThe creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
		},
		{
			name:"poisoned",
			content:"A poisoned creature has disadvantage on attack rolls and ability checks."
		},
		{
			name:"prone",
			content:"A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.\nThe creature has disadvantage on attack rolls.\nAn attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage."
		},
		{
			name:"restrained",
			content:"A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.\nAttack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.\nThe creature has disadvantage on Dexterity saving throws."
		},
		{
			name:"stunned",
			content:"A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage."
		},
		{
			name:"unconscious",
			content:"An unconscious creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.\nThe creature drops whatever it's holding and falls prone.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
		}
	];

	let newConditions = srdConditions.map(async (condition) => {
		return await Condition.create({
			description: {
				language: "en",
				name:condition.name,
				content:condition.content
			}
		}).save();
	});

	// SRD 5.1 CC pages 76-83
	let srdAbilities = [
		{
			name:"strength",
			content:"Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force."
		},
		{
			name:"dexterity",
			content:"Dexterity measures agility, reflexes, and balance."
		},
		{
			name:"constitution",
			content:"Constitution measures health, stamina, and vital force."
		},
		{
			name:"intelligence",
			content:"Intelligence measures mental acuity, accuracy of recall, and the ability to reason."
		},
		{
			name:"wisdom",
			content:"Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition."
		},
		{
			name:"charisma",
			content:"Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality."
		},
	];

	let newAbilities = srdAbilities.map(async (ability) => {
		return await Ability.create({
			description: {
				language: "en",
				name:ability.name,
				content:ability.content
			}
		}).save();
	});

	// We need to retrieve these to associate the skills to abilities.
	let freshStrength = await Ability.findOne({description:{name:"strength"}});
	let freshDexterity = await Ability.findOne({description:{name:"dexterity"}});
	let freshConstitution = await Ability.findOne({description:{name:"constitution"}});
	let freshIntelligence = await Ability.findOne({description:{name:"intelligence"}});
	let freshWisdom = await Ability.findOne({description:{name:"wisdom"}});
	let freshCharisma = await Ability.findOne({description:{name:"charisma"}});

	let srdSkills = [
		{
			ability: freshStrength._id,
			description: {
				name: "athletics",
				content:"Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming. Examples include the following activities:\nYou attempt to climb a sheer or slippery cliff, avoid hazards while scaling a wall, or cling to a surface while something is trying to knock you off.\nYou try to jump an unusually long distance or pull off a stunt midjump.\nYou struggle to swim or stay afloat in treacherous currents, storm-tossed waves, or areas of thick seaweed. Or another creature tries to push or pull you underwater or otherwise interfere with your swimming."
			}
		},
		{
			ability: freshDexterity._id,
			description: {
				name: "acrobatics",
				content:""
			}
		},
		{
			ability: freshDexterity._id,
			description: {
				name: "sleight of hand",
				content:""
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "arcana",
				content:""
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "history",
				content:""
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "investigation",
				content:""
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "nature",
				content:""
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "religion",
				content:""
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "animal handling",
				content:""
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "insight",
				content:""
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "medicine",
				content:""
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "perception",
				content:""
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "survival",
				content:""
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "deception",
				content:""
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "intimidation",
				content:""
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "performance",
				content:""
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "persuasion",
				content:""
			}
		},
	]


	let newGame = await Game.create({
		description: [
			Lore.create({
				language: "en",
				name:"SRD 5.1",
				content:"Compatible with fifth edition."
			})
		]
	}).save();






	let newCampaign = await Campaign.create({
		description: [
			Lore.create({
				language: "en",
				name:"Example campaign",
				content:`An example campaign using rules and systems from ${newGame.description.name} to show how data can be set up for your own campaigns.`
			})
		],
		game: newGame._id,
		managers: adminUsers
	}).save();



}