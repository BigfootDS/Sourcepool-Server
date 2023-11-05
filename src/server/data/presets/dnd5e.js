const { Ability } = require('../../models/AbilityModel');
const { AbilityScore } = require('../../models/Subdocuments/AbilityScoreEmbeddedModel');
const { Campaign } = require('../../models/CampaignModel');
const { Character } = require('../../models/CharacterModel');
const { CharacterSkill } = require('../../models/Subdocuments/CharacterSkillEmbeddedModel');
const { Condition } = require('../../models/ConditionModel');
const { DamageMultiplier } = require('../../models/Subdocuments/DamageMultiplierEmbeddedModel');
const { DamageType } = require('../../models/DamageTypeModel');
const { Game } = require('../../models/GameModel');
const { Item } = require('../../models/ItemModel');
const { Lore } = require('../../models/Subdocuments/LoreEmbeddedModel');
const { Place } = require('../../models/PlaceModel');
const { Prop } = require('../../models/PropModel');
const { Skill } = require('../../models/SkillModel');
const { Universe } = require('../../models/UniverseModel');
const { User } = require('../../models/UserModel');


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
	// Check if this game already exists in the DB,
	// only proceed if it's not found
	let matchingGame = await Game.count({'description.name':'SRD 5.1',  tags: ["default data", "srd5.1"]});
	console.log(`Found ${matchingGame} matching games in the default data.`);
	if (matchingGame > 0){
		throw new Error("Attempted to seed default data for SRD 5.1 but the game already exists. Was a prior deletion interrupted?");
	}

	let adminUsers = await User.find({isAdmin:true});
	console.log("Found admin data:\n" + JSON.stringify(adminUsers, null, 4));
	if (adminUsers.length == 0){
		throw new Error("No admins found. Something has gone wrong with the server data.");
	} else {
		console.log("Found an admin, mapping their IDs into adminUsers now...")
		adminUsers = adminUsers.map((user) => {
			return user._id;
		});
	}

	console.log("Processed admin data:\n" + JSON.stringify(adminUsers, null, 4));

	// SRD 5.1 CC page 97
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


	let newDamageTypes = await Promise.all(srdDamageTypes.map(async (dmgType) => {
		//console.log("Working through dmgType:\n" + JSON.stringify(dmgType,null,4));
		let newDmgType = await DamageType.create({
			tags: ["default data", "srd5.1"],
			description: [
				Lore.create({
					language: 'en',
					name:dmgType.name,
					content:dmgType.content
				})
			],
		}).save();
		return newDmgType;
	}));

	//console.log("Damage types:\n" + JSON.stringify(newDamageTypes, null, 4));


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

	let newConditions = await Promise.all(srdConditions.map(async (condition) => {
		let newCondition = await Condition.create({
			tags: ["default data", "srd5.1"],
			description: [
				await Lore.create({
					language: "en",
					name:condition.name,
					content:condition.content
				})
			],
		}).save();
		return newCondition;
	}));

	//console.log("Conditions:\n" + JSON.stringify(newConditions, null, 4));


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

	let newAbilities = await Promise.all(srdAbilities.map(async (ability) => {
		let newAbility = await Ability.create({
			tags: ["default data", "srd5.1"],
			description: [
				await Lore.create({
					language: "en",
					name:ability.name,
					content:ability.content
				})
			],
		}).save();
		return newAbility;
	}));

	//console.log("Abilities:\n" + JSON.stringify(newAbilities, null, 4));


	// We need to retrieve these to associate the skills to abilities.

	let freshStrength = await Ability.findOne({'description.name':'strength', 'description.language':'en'});
	//console.log("Found freshStrength:\n" + JSON.stringify(freshStrength,null,4));

	let freshDexterity = await Ability.findOne({'description.name':'dexterity', 'description.language':'en'});
	let freshConstitution = await Ability.findOne({'description.name':'constitution', 'description.language':'en'});
	let freshIntelligence = await Ability.findOne({'description.name':'intelligence', 'description.language':'en'});
	let freshWisdom = await Ability.findOne({'description.name':'wisdom', 'description.language':'en'});
	let freshCharisma = await Ability.findOne({'description.name':'charisma', 'description.language':'en'});

	// SRD 5.1 CC pages 79-83
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
				content:"Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you're trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship's deck. The GM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips."
			}
		},
		{
			ability: freshDexterity._id,
			description: {
				name: "sleight of hand",
				content:"Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. The GM might also call for a Dexterity (Sleight of Hand) check to determine whether you can lift a coin purse off another person or slip something out of another person's pocket."
			}
		},
		{
			ability: freshDexterity._id,
			description: {
				name: "stealth",
				content:"Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard."
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "arcana",
				content:"Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes."
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "history",
				content:"Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations."
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "investigation",
				content:"When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check."
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "nature",
				content:"Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles."
			}
		},
		{
			ability: freshIntelligence._id,
			description: {
				name: "religion",
				content:"Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults."
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "animal handling",
				content:"When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal's intentions, the GM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver."
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "insight",
				content:"Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone's next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms."
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "medicine",
				content:"A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness."
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "perception",
				content:"Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. For example, you might try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. Or you might try to spot things that are obscured or easy to miss, whether they are orcs lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door."
			}
		},
		{
			ability: freshWisdom._id,
			description: {
				name: "survival",
				content:"The GM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards."
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "deception",
				content:"Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast-talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone's suspicions with false assurances, or maintain a straight face while telling a blatant lie."
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "intimidation",
				content:"When you attempt to influence someone through overt threats, hostile actions, and physical violence, the GM might ask you to make a Charisma (Intimidation) check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision."
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "performance",
				content:"Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment."
			}
		},
		{
			ability: freshCharisma._id,
			description: {
				name: "persuasion",
				content:"When you attempt to influence someone or a group of people with tact, social graces, or good nature, the GM might ask you to make a Charisma (Persuasion) check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. Examples of persuading others include convincing a chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk."
			}
		},
	];


	let newSkills = await Promise.all(srdSkills.map(async (skill) => {
		let newSkill = await Skill.create({
			ability: skill.ability,
			tags: ["default data", "srd5.1"],
			description: [
				await Lore.create({
					language: "en",
					name:skill.description.name,
					content:skill.description.content
				})
			],
		}).save();
		return newSkill;
	}));

	//console.log("Skills:\n" + JSON.stringify(newSkills, null, 4));


	let newGame = await Game.create({
		description: [
			await Lore.create({
				language: "en",
				name:"SRD 5.1",
				content:"Compatible with fifth edition."
			})
		],
		tags: ["default data", "srd5.1"],
		damageTypes: newDamageTypes.map(dmg => {return dmg._id}),
		conditions: newConditions.map(condition => {return condition._id}),
		abilities: newAbilities.map(ability => {return ability._id}),
		skills: newSkills.map(skill => {return skill._id})
	}).save();

	//console.log("Game:\n" + JSON.stringify(newGame, null, 4));


	let newCampaign = await Campaign.create({
		description: [
			await Lore.create({
				language: "en",
				name:"Example campaign",
				content:`An example campaign using rules and systems from ${newGame.description.name} to show how data can be set up for your own campaigns.`
			})
		],
		tags: ["default data", "srd5.1"],
		game: newGame._id,
		managers: adminUsers
	}).save();


	console.log("Campaign:\n" + JSON.stringify(newCampaign, null, 4));

}


module.exports = {
	createDefaultData
}