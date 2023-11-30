const Ability = global.modelUtils.models.extendsCustomBaseDocument.Ability;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	
	
	// SRD 5.1 CC pages 76-83
	let srdAbilities = [
		{
			name:"strength",
			content:"Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force."
		},
		{
			name:"dexterity",
			content:"Dexterity measures agility, reflexes, and balance."
		},
		{
			name:"constitution",
			content:"Constitution measures health, stamina, and vital force."
		},
		{
			name:"intelligence",
			content:"Intelligence measures mental acuity, accuracy of recall, and the ability to reason."
		},
		{
			name:"wisdom",
			content:"Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition."
		},
		{
			name:"charisma",
			content:"Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality."
		},
	];

	let newDataDocs = await Promise.all(srdAbilities.map(async (ability) => {
		let newAbility = await Ability.create({
			tags: srdTags,
			descriptions: [
				await LocalizedContent.create({
					language: "en",
					name:ability.name,
					content:ability.content
				})
			],
			product: newDndProduct._id
		}).save();
		return newAbility;
	}));

	return newDataDocs;
}

module.exports = {createData};