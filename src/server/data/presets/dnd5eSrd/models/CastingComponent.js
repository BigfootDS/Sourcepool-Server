const CastingComponent = global.modelUtils.models.extendsCustomBaseDocument.CastingComponent;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:"Verbal (V)",
					content: "Most spells require the chanting of mystic words. The words themselves aren't the source of the spell's power; rather, the particular combination of sounds, with specific pitch and resonance, sets the threads of magic in motion. Thus, a character who is gagged or in an area of silence, such as one created by the [[HOVER:Spell:Silence:silence]] spell, can't cast a spell with a verbal component."
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:"Somatic (S)",
					content: "Spellcasting gestures might include a forceful gesticulation or an intricate set of gestures. If a spell requires somatic components, the caster must have free use of at least one hand to perform these gestures."
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:"Material (M)",
					content: "Casting some spells requires particular objects, specified in parentheses in the component entry. A character can use a component pouch of a spellcasting focus (found in \"Equipment\") in place of the components specified for a spell. But if a cost is indicated for a component, a character must have that specific component before he or she can cast the spell.\nIf a spell states that a material component is consumed by the spell, the caster must provide this component for each casting of the spell.\nA spellcaster must have a free hand to access a spell's material components - or to hold a spellcasting focus - but it can be the same hand that he or she uses to perform somatic components."
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
	];

	let newDataDocs = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await CastingComponent.create(action).save();
		return newDoc;
	}));

	return newDataDocs;
}

module.exports = {createData};