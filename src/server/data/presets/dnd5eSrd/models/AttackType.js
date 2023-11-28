const AttackType = global.modelUtils.models.extendsCustomBaseDocument.AttackType;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;

	let actionTypes = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Melee',
					content: 'Melee attacks require the attacker to be "touching bases" or within reach of the defender.'
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
					name:'Ranged',
					content: 'Ranged attacks allow an attacker to harm a defender at a distance. The ranged attack will typically require a line of sight, but sometimes don\'t. In any case, a ranged attack will have two ranges specified with it. One number is its normal range, the other number is its long-range - a distance where attacks can be made at disadvantage.'
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
					name:'Other',
					content: 'A miscellaneous action type for attacks that the developers of Sourcepool haven\'t implemented, or that the designers of the game system haven\'t specified.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
	];

	let newData = await Promise.all(attackType.map(async (action) => {
		let newAttackType = await AttackType.create(action).save();
		return newAttackType;
	}));

	return newData;
}

module.exports = {createData};