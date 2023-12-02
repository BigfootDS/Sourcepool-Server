const CharacterAdvancement = global.modelUtils.models.extendsCustomBaseDocument.CharacterAdvancement;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// SRD5.1 pages 56-57
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Character Advancement',
					content: 'The Character Advancement table summarizes the XP you need to advance in levels from level 1 through level 20, and the proficiency bonus for a character of that level. Consult the information in your character\'s class description to see what other improvements you gain at each level.'
				})
			],
			// Model-specific fields:
			// Default values should hopefully be enough here?
		}
	];

	let newData = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await CharacterAdvancement.create(action).save();
		return newDoc;
	}));

	return newData;
}

module.exports = {createData};