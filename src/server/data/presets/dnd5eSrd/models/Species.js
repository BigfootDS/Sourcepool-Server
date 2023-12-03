const Species = global.modelUtils.models.extendsCustomBaseDocument.Species;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;
const Size = global.modelUtils.models.extendsCustomBaseDocument.Size;
const Movement = global.modelUtils.models.extendsEmbeddedDocument.Movement;
const Language = global.modelUtils.models.extendsCustomBaseDocument.Language;
const Alignment = global.modelUtils.models.extendsCustomBaseDocument.Alignment;

async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	let sizeSmall = await Size.findOne({'descriptions.name':'Small', 'descriptions.language':'en', product: newDndProduct._id});
	let languageDwarvish = await Language.findOne({'descriptions.name':'Dwarvish', 'descriptions.language':'en', product: newDndProduct._id});
	let languageCommon = await Language.findOne({'descriptions.name':'Common', 'descriptions.language':'en', product: newDndProduct._id});
	// For dwarf:
	let lawfulAlignments = await Alignment.find({'description.name': {$regex: /lawful/i}, product: newDndProduct._id});
	lawfulAlignments = lawfulAlignments.map((alignment) => {
		return alignment._id;
	});

	// SRD5.1 pages 3-7
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarf',
					content: ''
				})
			],
			// Model-specific fields:
			ageAdult: 50,
			ageTypicalMax: 350,
			allowedSizes: [
				sizeSmall._id
			],
			startingMovements: [
				Movement.create({
					name: LocalizedContent.create({
						language:"en",
						name: "Walking",
						content: ""
					}),
					speed:25,
				})
			],
			startingLanguages: [
				languageDwarvish._id,
				languageCommon._id
			],
			typicalAlignments: [
				...lawfulAlignments
			], 
			grantedFeatures: [
				// TODO
			]
		},
		
	];

	let newData = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await Species.create(action).save();
		return newDoc;
	}));

	return newData;
}

module.exports = {createData};