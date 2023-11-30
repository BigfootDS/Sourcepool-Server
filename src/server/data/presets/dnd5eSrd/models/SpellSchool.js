const SpellSchool = global.modelUtils.models.extendsContentBaseDocument.SpellSchool;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// SRD5.1 Page 103
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Abjuration',
					content: 'Abjuration spells are protective in nature, though some of them have aggressive uses. They create magical barriers, negate harmful effects, harm trespassers, or banish creatures to other planes of existence.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Conjuration',
					content: 'Conjuration spells involve the transportation of objects and creatures from one location to another. Some spells summon creatures or objects to the caster\'s side, whereas others allow the caster to teleport to another location. Some conjurations create objects or effects out of nothing.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Divination',
					content: 'Divination spells reveal information, whether in the form of secrets long forgotten, glimpes of the future, the locations of hidden things, the truth behind illusions, or visions of distant people or places.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Enchantment',
					content: 'Enchantment spells affect the minds of others, influencing or controlling their behaviour. Such spells can make enemies see the caster as a friend, force creatures to take a course of action, or even control another creature like a puppet.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Evocation',
					content: 'Evocation spells manipulate magical energy to produce a desired effect. Some call up blasts of fire or lightning. Others channel positive energy to heal wounds.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Illusion',
					content: 'Illusion spells deceive the senses or minds of others. They cause people to see things that are not there, to miss things that are there, to hear phantom noises, or to remember things that never happened. Some illusions create phantom images that any creature can see, but the most insidious illusions plant an image directly in the mind of a creature.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Necromancy',
					content: 'Necromancy spells manipulate the energies of life and death. Such spells can grant an extra reserve of life force, drain the life energy from another creature, create the undead, or even bring the dead back to life.\nCreating the undead through the use of necromancy spells such as [[Spell:Animate Dead]] is not a good act, and only evil casters use such spells frequently.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Transmutation',
					content: 'Transmutation spells change the properties of a creature, object or environment. They might turn an enemy into a harmless creature, bolster the strength of an ally, make an object move at the caster\'s command, or enhance a creature\'s innate healing abilities to rapidly recover from injury.'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Other',
					content: 'This school should only be used if the creator of some content did not finish implementing their homebrew into Sourcepool! Use a proper school!'
				})
			],
			// Model-specific fields:
			// None for this model!
		},
		
	];

	let newDataDocs = await Promise.all(dataSet.map(async (obj) => {
		let newDoc = await SpellSchool.create(obj).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};