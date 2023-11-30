const ActionType = global.modelUtils.models.extendsCustomBaseDocument.ActionType;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// Should be stuff like:
	// Action, Bonus Action, Reaction, Other
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Action',
					content: ''
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
					name:'Bonus Action',
					content: ''
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
					name:'Reaction',
					content: ''
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
					name:'Other',
					content: ''
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
	];

	let newDataDocs = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await ActionType.create(action).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};