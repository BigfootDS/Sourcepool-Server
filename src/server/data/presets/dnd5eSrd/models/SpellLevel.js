const SpellLevel = global.modelUtils.models.extendsContentBaseDocument.SpellLevel;
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
					name:'Cantrip',
					content: ''
				})
			],
			// Model-specific fields:
			level: 0
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'1st Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 1
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'2nd Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 2
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'3rd Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 3
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'4th Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 4
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'5th Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 5
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'6th Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 6
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'7th Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 7
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'8th Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 8
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'9th Level',
					content: ''
				})
			],
			// Model-specific fields:
			level: 9
		},
	];

	let newDataDocs = await Promise.all(dataSet.map(async (obj) => {
		let newDoc = await SpellLevel.create(obj).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};