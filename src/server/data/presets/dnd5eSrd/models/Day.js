const Day = global.modelUtils.models.extendsContentBaseDocument.Day;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// ISO 8601 sets Monday as the start of the week.
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Monday',
					content: 'ISO-8601 sets Monday as the start of the week.'
				})
			],
			// Model-specific fields:
			positionInWeek: 0
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Tuesday',
					content: ''
				})
			],
			// Model-specific fields:
			positionInWeek: 1
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Wednesday',
					content: ''
				})
			],
			// Model-specific fields:
			positionInWeek: 2
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Thursday',
					content: ''
				})
			],
			// Model-specific fields:
			positionInWeek: 3
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Friday',
					content: ''
				})
			],
			// Model-specific fields:
			positionInWeek: 4
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Saturday',
					content: ''
				})
			],
			// Model-specific fields:
			positionInWeek: 5
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Sunday',
					content: ''
				})
			],
			// Model-specific fields:
			positionInWeek: 6
		},
	];

	let newDataDocs = await Promise.all(dataSet.map(async (obj) => {
		let newDoc = await Day.create(obj).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};