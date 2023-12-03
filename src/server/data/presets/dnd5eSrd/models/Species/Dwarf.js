const Species = global.modelUtils.models.extendsCustomBaseDocument.Species;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;
const Size = global.modelUtils.models.extendsCustomBaseDocument.Size;
const Movement = global.modelUtils.models.extendsEmbeddedDocument.Movement;
const Language = global.modelUtils.models.extendsCustomBaseDocument.Language;
const Alignment = global.modelUtils.models.extendsCustomBaseDocument.Alignment;
const Feature = global.modelUtils.models.extendsCustomBaseDocument.Feature;
const Sense = global.modelUtils.models.extendsCustomBaseDocument.Sense;
const AdditionalModifier = global.modelUtils.models.extendsEmbeddedDocument.AdditionalModifier;
const CreatureSense = global.modelUtils.models.extendsEmbeddedDocument.CreatureSense;
const FeatureInstance = global.modelUtils.models.extendsEmbeddedDocument.FeatureInstance;

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
	let senseDarkvision = await Sense.findOne({'description.name':"Darkvision", product: newDndProduct._id});

	/*
	Features:
	Darkvision - darkvision 60ft
	Dwarven Resilience - advantage on saving throws against being poisoned (status condition), resistance to poison damage
	Dwarven Combat Training - proficiency with: battleaxe, handaxe, light hammer, warhammer
	Tool Proficiency - proficiency with choice: smith's tools, brewer's supplies, mason's tools
	Stonecunning - expertise for History related to the origin of stonework

	*/

	let featureDarkvision = await Feature.create({
		// Inherited fields:
		product: newDndProduct._id,
		tags: [...srdTags, "hidden"],
		descriptions: [
			LocalizedContent.create({
				language: 'en',
				name:'Darkvision',
				content: 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.'
			})
		],
		// Model-specific fields:
		grantedModifiers: [
			AdditionalModifier.create({
				senses: [
					CreatureSense.create({
						distance: 60,
						note: [
							LocalizedContent.create({
								language: 'en',
								name:'Darkvision',
								content: 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.'
							})
						],
						sense: senseDarkvision._id
					})
				]
			})
		]
	}).save();



	// SRD5.1 pages 3-7
	let newDoc = await Species.create({
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
			// all subdocs: FeatureInstance
		]
	}).save();

	
	return newDoc;
}

module.exports = {createData};