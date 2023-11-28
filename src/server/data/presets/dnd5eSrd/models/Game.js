const Game = global.modelUtils.models.extendsCustomBaseDocument.Game;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;



async function createData(sharedData){
	let newDndGame = await Game.create({
		abbreviation: "D&D5e",
		releaseDate: new Date(2014, 6, 3), // 3rd July 2014
		descriptions: [
			LocalizedContent.create({
				language: "en",
				name: "Dungeons & Dragons 5th Edition",
				content:"As of 2023, this is the latest edition of the most popular tabletop roleplaying game in the world."
			})
		],
		tags: sharedData.tags
	}).save();

	return [newDndGame];
}

module.exports = {createData};