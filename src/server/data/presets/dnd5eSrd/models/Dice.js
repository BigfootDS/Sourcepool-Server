const Dice = global.modelUtils.models.extendsCustomBaseDocument.Dice;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;

	let diceSizes = [
		{
			size: 2,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Two-sided Dice or Coin',
					content: 'Two possible outcomes - heads or tails, true or false, yes or no, and so on...'
				})
			],
		},
		{
			size: 4,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Four-sided Dice',
					content: 'Four possible outcomes - a small pool of numbers. Usually used for some damage rolls and hit dice.'
				})
			],
		},
		{
			size: 6,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Six-sided Dice',
					content: 'Six possible outcomes - the standard non-TTRPG dice size, too. Usually used for some damage rolls and hit dice.'
				})
			],
		},
		{
			size: 8,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Eight-sided Dice',
					content: 'Eight possible outcomes - typically a pool of numbers. Usually used for some damage rolls and hit dice.'
				})
			],
		},
		{
			size: 10,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Ten-sided Dice',
					content: 'Ten possible outcomes - typically a pool of numbers. Usually used for some damage rolls and hit dice.'
				})
			],
		},
		{
			size: 12,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Twelve-sided Dice',
					content: 'Twelve possible outcomes - typically a pool of numbers. Usually used for some damage rolls and hit dice.'
				})
			],
		},
		{
			size: 20,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Twenty-sided Dice',
					content: 'Twenty possible outcomes - typically a pool of numbers. Usually used for ability checks, attack rolls, saving throws, and hit dice.'
				})
			],
		},
		{
			size: 100,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'One Hundred-sided Dice or Percentile Dice',
					content: 'A hundred possible outcomes - typically a pool of numbers. Usually used for picking a single option from a random table, or for rolling for something really rare such as a Cleric\'s Divine Intervention.'
				})
			],
		},
	];
	
	let newData = await Promise.all(diceSizes.map(async (dice) => {
		let newDiceSize = await Dice.create(dice).save();
		return newDiceSize;
	}))

	return newData;
}

module.exports = {createData};