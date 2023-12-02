const Sense = global.modelUtils.models.extendsCustomBaseDocument.Sense;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// SRD5.1 pages 257
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Blindsight',
					content: 'A monster with blindsight can perceive its surroundings without relying on sight, within a specific radius.\nCreatures without eyes, such as [[URL:CreatureInstance:Grimlock:grimlocks]] and [[URL:CreatureInstance:Gray Ooze:gray oozes]], typically have this special sense, as do creatures with echolocation or heightened senses, such as [[SearchResults:Tag:bat:bats]] and [[SearchResults:Tag:true dragon:true dragons]].\nIf a monster is naturally blind, it has a parenthetical note to this effect, indicating that the radius of its blindsight defines the maximum range of its perception.'
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
					name:'Darkvision',
					content: 'A monster with darkvision can see in the dark within a specific radius. The monster can see in dim light within the radius as if it were bright light, and in darkness as if it were dim light. The monster can\'t discern color in darkness, only shades of gray. Many creatures that live underground have this special sense.'
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
					name:'Tremorsense',
					content: 'A monster with tremorsense can detect and pinpoint the origin of vibrations within a specific radius, provided that the monster and the source of the vibrations are in contact with the same ground or substance. Tremorsense can\'t be used to detect flying or incorporeal creatures. Many burrowing creatures, such as [[URL:CreatureInstance:Ankheg:ankhegs]] and [[NOTE:Hover:Umber Hulks are found in the Monster Manual, but not within the SRD. Dunno why WOTC would do this.:umber hulks]], have this special sense.'
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
					name:'Truesight',
					content: 'A monster with truesight can, out to a specific range, see in normal and magical darkness, see invisible creatures and objects, automatically detect visual illusions and succeed on saving throws against them, and perceive the original form of a shapechanger or a creature that is transformed by magic.\nFurthermore, the monster can see into the [[URL:Universe:Ethereal Plane:Ethereal Plane]] within the same range.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
	];

	let newData = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await Sense.create(action).save();
		return newDoc;
	}));

	return newData;
}

module.exports = {createData};