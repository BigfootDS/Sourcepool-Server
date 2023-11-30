const Epoch = global.modelUtils.models.extendsContentBaseDocument.Epoch;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// Keep this religously neutral for the typical Western calendar.
	// eg. no AD/BC stuff.
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Common Era',
					content: ''
				})
			],
			// Model-specific fields:
			yearStart: 1,
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Before Common Era',
					content: ''
				})
			],
			// Model-specific fields:
			yearStart: Number.MIN_SAFE_INTEGER,
			yearEnd: 0
		}
	];

	let newDataDocs = await Promise.all(dataSet.map(async (obj) => {
		let newDoc = await Epoch.create(obj).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};