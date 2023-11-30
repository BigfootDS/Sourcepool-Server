const Month = global.modelUtils.models.extendsContentBaseDocument.Month;
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
					name:'January',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 0,
			numberOfDays: 31
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'February',
					content: 'No leap years in Sourcepool at this time, sorry!'
				})
			],
			// Model-specific fields:
			positionInYear: 1,
			numberOfDays: 28
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'March',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 2,
			numberOfDays: 31
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'April',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 3,
			numberOfDays: 30
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'May',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 4,
			numberOfDays: 31
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'June',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 5,
			numberOfDays: 30
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'July',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 6,
			numberOfDays: 31
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'August',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 7,
			numberOfDays: 31
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'September',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 8,
			numberOfDays: 30
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'October',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 9,
			numberOfDays: 31
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'November',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 10,
			numberOfDays: 30
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'December',
					content: ''
				})
			],
			// Model-specific fields:
			positionInYear: 11,
			numberOfDays: 31
		},
	];

	let newDataDocs = await Promise.all(dataSet.map(async (obj) => {
		let newDoc = await Month.create(obj).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};