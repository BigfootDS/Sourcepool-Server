const Currency = global.modelUtils.models.extendsCustomBaseDocument.Currency;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;
const CurrencyQuantity = global.modelUtils.models.extendsEmbeddedDocument.CurrencyQuantity;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;
	let {copper, silver, electrum, gold, platinum} = sharedData.currencies;

	// SRD5.1 page 62
	let dataSet = [
		
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Standard Exchange Rates',
					content: ''
				})
			],
			// Model-specific fields:
			lowestCurrencyValue: copper,
			currencies: [
				CurrencyQuantity.create({
					currency: copper,
					value: 1
				}),
				CurrencyQuantity.create({
					currency: silver,
					value: 10
				}),
				CurrencyQuantity.create({
					currency: electrum,
					value: 50
				}),
				CurrencyQuantity.create({
					currency: gold,
					value: 100
				}),
				CurrencyQuantity.create({
					currency: platinum,
					value: 100
				}),
			]
		}
		
	];

	let newData = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await Currency.create(action).save();
		return newDoc;
	}));

	return newData;
}

module.exports = {createData};