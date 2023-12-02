const Language = global.modelUtils.models.extendsCustomBaseDocument.Language;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// SRD5.1 page 59
	let dataSet = [
		//#region Standard Languages
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Common',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"human"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Common',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarvish',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"dwarf"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarvish',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Elvish',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"elf"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Elvish',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Giant',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"ogre", "giant"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarvish',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Gnomish',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"gnome"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarvish',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Goblin',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"goblinoid"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarvish',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Halfling',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"halfling"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Common',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Orc',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"orc"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarvish',
					content: ''
				})
			]
		},
		//#endregion
		//#region Exotic languages
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Abyssal',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"demon"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Infernal',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Celestial',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"celestial"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Celestial',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Draconic',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"dragon", "dragonborn"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Draconic',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Deep Speech',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"aboleth","cloaker"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'None',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Infernal',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"devil"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Infernal',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Primordial',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"elemental"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Dwarvish',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Sylvan',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"fey"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Elvish',
					content: ''
				})
			]
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Undercommon',
					content: ''
				})
			],
			// Model-specific fields:
			typicalSpeakersTags: [
				"underworld", "underworld trader", "trader"
			],
			script: [
				LocalizedContent.create({
					language: 'en',
					name:'Elvish',
					content: ''
				})
			]
		},
		//#endregion
	];

	let newDataDocs = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await Language.create(action).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};