const Product = global.modelUtils.models.extendsCustomBaseDocument.Product;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let newProduct = await Product.create({
		tags: sharedData.tags,
		descriptions: [
			LocalizedContent.create({
				language: 'en',
				name:'System Reference Document 5.1',
				content: 'The freebie content available so that players can get their taste of Dungeons & Dragons 5th Edition.'
			})
		],
		abbreviation: "SRD5.1",
		releaseDate: new Date(2023, 0, 23),
		game: sharedData.game.newDndGame._id
	}).save();

	return [newProduct];
}

module.exports = {createData};