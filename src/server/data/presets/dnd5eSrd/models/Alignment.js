const Alignment = global.modelUtils.models.extendsCustomBaseDocument.Alignment;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// SRD5.1 pages 58-59
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Lawful Good',
					content: 'Lawful good (LG) creatures can be counted on to do the right thing as expected by society. [[URL:CreatureInstance:Adult Gold Dragon:Gold dragons]], [[URL:HeroClass:Paladin:paladins]], and most [[URL:Species:Dwarf:dwarves]] are lawful good.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Neutral Good',
					content: 'Neutral good (NG) folk do the best they can to help others according to their needs. Many [[URL:SearchResults:Tag:celestial:celestials]], some [[URL:CreatureInstance:Cloud Giant:cloud giants]], and most [[URL:Species:Gnome:gnomes]] are neutral good.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Chaotic Good',
					content: 'Chaotic good (CG) creatures act as their conscience directs, with little regard for what others expect. [[URL:CreatureInstance:Adult Copper Dragon:Copper dragons]], many [[URL:Species:Elf:elves]], and [[URL:CreatureInstance:Unicorn:unicorns]] are chaotic good.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Lawful Neutral',
					content: 'Lawful neutral (LN) individuals act in accordance with law, tradition, or personal codes. Many [[URL:HeroClass:Monk:monks]] and some [[URL:HeroClass:Wizard:wizards]] are lawful neutral.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Neutral',
					content: 'Neutral (N) is the alignment of those who prefer to steer clear of moral questions and don\'t take sides, doing what seems best at the time. [[URL:CreatureInstance:Lizardfolk:Lizardfolk]], most [[URL:HeroClass:Druid:druids]], and many [[URL:Species:Human:humans]] are neutral.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Chaotic Neutral',
					content: 'Chaotic neutral (CN) creatures follow their whims, holding their personal freedom above all else. Many [[URL:HeroClass:Barbarian:barbarians]] and [[URL:HeroClass:Rogue:rogues]], and some [[URL:HeroClass:Bard:bards]], are chaotic neutral.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Lawful Evil',
					content: 'Lawful evil (LE) creatures methodically take what they want, within the limits of a code of tradition, loyalty, or order. [[URL:SearchResults:Tag:devil:Devils]], [[URL:CreatureInstance:Adult Blue Dragon:blue dragons]], and [[URL:CreatureInstance:Hobgoblin:hobgoblins]] are lawful evil.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Neutral Evil',
					content: 'Neutral evil (NE) is the alignment of those who do whatever they can get away with, without compassion or qualms. Many [[URL:CreatureInstance:Elf, Drow:drow]], some [[URL:CreatureInstance:Cloud Giant:cloud giants]], and [[URL:CreatureInstance:Goblin:goblins]] are neutral evil.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Chaotic Evil',
					content: 'Chaotic evil (CE) creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust. [[URL:SearchResults:Tag:demon:Demons]], [[URL:CreatureInstance:Adult Red Dragon:red dragons]], and [[URL:CreatureInstance:Orc:orcs]] are chaotic evil.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
	];

	let newData = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await Alignment.create(action).save();
		return newDoc;
	}));

	return newData;
}

module.exports = {createData};