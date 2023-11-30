const Skill = global.modelUtils.models.extendsCustomBaseDocument.Skill;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;
	let abilities = sharedData.abilities;

	// SRD 5.1 CC pages 79-83
	let srdSkills = [
		{
			ability: abilities.strength._id,
			description: {
				name: "athletics",
				content:"Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming. Examples include the following activities:\nYou attempt to climb a sheer or slippery cliff, avoid hazards while scaling a wall, or cling to a surface while something is trying to knock you off.\nYou try to jump an unusually long distance or pull off a stunt midjump.\nYou struggle to swim or stay afloat in treacherous currents, storm-tossed waves, or areas of thick seaweed. Or another creature tries to push or pull you underwater or otherwise interfere with your swimming."
			}
		},
		{
			ability: abilities.dexterity._id,
			description: {
				name: "acrobatics",
				content:"Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you're trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship's deck. The GM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips."
			}
		},
		{
			ability: abilities.dexterity._id,
			description: {
				name: "sleight of hand",
				content:"Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. The GM might also call for a Dexterity (Sleight of Hand) check to determine whether you can lift a coin purse off another person or slip something out of another person's pocket."
			}
		},
		{
			ability: abilities.dexterity._id,
			description: {
				name: "stealth",
				content:"Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard."
			}
		},
		{
			ability: abilities.intelligence._id,
			description: {
				name: "arcana",
				content:"Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes."
			}
		},
		{
			ability: abilities.intelligence._id,
			description: {
				name: "history",
				content:"Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations."
			}
		},
		{
			ability: abilities.intelligence._id,
			description: {
				name: "investigation",
				content:"When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check."
			}
		},
		{
			ability: abilities.intelligence._id,
			description: {
				name: "nature",
				content:"Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles."
			}
		},
		{
			ability: abilities.intelligence._id,
			description: {
				name: "religion",
				content:"Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults."
			}
		},
		{
			ability: abilities.wisdom._id,
			description: {
				name: "animal handling",
				content:"When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal's intentions, the GM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver."
			}
		},
		{
			ability: abilities.wisdom._id,
			description: {
				name: "insight",
				content:"Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone's next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms."
			}
		},
		{
			ability: abilities.wisdom._id,
			description: {
				name: "medicine",
				content:"A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness."
			}
		},
		{
			ability: abilities.wisdom._id,
			description: {
				name: "perception",
				content:"Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. For example, you might try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. Or you might try to spot things that are obscured or easy to miss, whether they are orcs lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door."
			}
		},
		{
			ability: abilities.wisdom._id,
			description: {
				name: "survival",
				content:"The GM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards."
			}
		},
		{
			ability: abilities.charisma._id,
			description: {
				name: "deception",
				content:"Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast-talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone's suspicions with false assurances, or maintain a straight face while telling a blatant lie."
			}
		},
		{
			ability: abilities.charisma._id,
			description: {
				name: "intimidation",
				content:"When you attempt to influence someone through overt threats, hostile actions, and physical violence, the GM might ask you to make a Charisma (Intimidation) check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision."
			}
		},
		{
			ability: abilities.charisma._id,
			description: {
				name: "performance",
				content:"Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment."
			}
		},
		{
			ability: abilities.charisma._id,
			description: {
				name: "persuasion",
				content:"When you attempt to influence someone or a group of people with tact, social graces, or good nature, the GM might ask you to make a Charisma (Persuasion) check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. Examples of persuading others include convincing a chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk."
			}
		},
	];


	let newDataDocs = await Promise.all(srdSkills.map(async (skill) => {
		let newSkill = await Skill.create({
			ability: skill.ability,
			tags: srdTags,
			descriptions: [
				await LocalizedContent.create({
					language: "en",
					name:skill.description.name,
					content:skill.description.content
				})
			],
			product: newDndProduct._id
		}).save();
		return newSkill;
	}));
	
	

	return newDataDocs;
}

module.exports = {createData};