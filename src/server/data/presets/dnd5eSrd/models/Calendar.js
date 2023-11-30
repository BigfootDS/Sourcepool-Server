const Calendar = global.modelUtils.models.extendsContentBaseDocument.Calendar;
const Day = global.modelUtils.models.extendsContentBaseDocument.Day;
const Epoch = global.modelUtils.models.extendsContentBaseDocument.Epoch;
const Month = global.modelUtils.models.extendsContentBaseDocument.Month;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let days = sharedData.days;
	let epochs = sharedData.epochs;
	let months = sharedData.months;
	let newDndProduct = sharedData.product;

	
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Western Calendar',
					content: 'The calendar typically used in Western countries in the real world.'
				})
			],
			// Model-specific fields:
			daysPerWeek: [...days],
			epochs: [...epochs],
			monthsPerYear: [...months]
		}
	];

	let newDataDocs = await Promise.all(dataSet.map(async (obj) => {
		let newDoc = await Calendar.create(obj).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};