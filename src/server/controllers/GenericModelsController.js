const express = require('express');
const router = express.Router();

const { modelsFlat, helpers: {filterForUserRead} } = require('../functions/modelUtils');



router.get("/all/:modelName", async (request, response) => {
	let result = await modelsFlat[request.params.modelName].find({});
	result = await filterForUserRead(request.user._id, result);
	response.json({
		results: result
	});
})

router.get("/one/:modelName/:id", async (request, response) => {
	let result = await modelsFlat[request.params.modelName].findOne({_id: request.params.id});
	result = await filterForUserRead(request.user._id, [result]);
	response.json({
		results: result
	});
});

router.get("/multiple/:modelName/:key/:value", async (request, response) => {
	let result = [];
	let tempFiltering = [];

	switch (request.params.key) {
		case "name":
			result = await modelsFlat[request.params.modelName].find(
				{"descriptions.name": {$regex: new RegExp(`(${request.params.value})`, 'gi')}}
			).catch(error => error);
			break;
		case "tags":
		case "tag":
			result = await modelsFlat[request.params.modelName].find(
				{"tags": {$regex: new RegExp(`(${request.params.value})`, 'gi')}}
			).catch(error => error);
			break;
		case "editedBy":
			result = await modelsFlat[request.params.modelName].find(
				{"editedBy._id": {$regex: new RegExp(`(${request.params.value})`, 'gi')}}
			).catch(error => error);
			break;
		case "productName":
			// Find across populated Document-based models does not work
			// Must find all of modelName, and then filter it manually.
			result = await modelsFlat[request.params.modelName].find({}).catch(error => error);
			result = result.map((doc) => {
				if (doc.product.descriptions.some(localizedInfo => localizedInfo.name == request.params.value)){
					return doc;
				}
			})
			break;
		case "productId":
			result = await modelsFlat[request.params.modelName].find({}).catch(error => error);
			result = result.map((doc) => {
				if (doc.product._id == request.params.value){
					return doc;
				}
			})
			break;
		case "productAbbreviation":
			result = await modelsFlat[request.params.modelName].find({}).catch(error => error);
			result = result.map((doc) => {
				if (doc.product.abbreviation == request.params.value){
					return doc;
				}
			})
			break;
		case "gameName":
			result = await modelsFlat[request.params.modelName].find({}).catch(error => error);
			tempFiltering = [];
			for await (let doc of result) {
				let tempGame = await modelsFlat.Game.findOne({_id: doc.product.game}).catch(error => error);
				console.log("Found game:");
				console.log(tempGame);

				if (tempGame.descriptions.some(localizedInfo => localizedInfo.name == request.params.value)){

					tempFiltering.push(doc);
				}
			}

			result = tempFiltering;

			break;
		case "gameId":
			result = await modelsFlat[request.params.modelName].find({}).catch(error => error);
			tempFiltering = [];

			result.forEach(doc => {
				if (doc.product.game == request.params.value) {
					tempFiltering.push(doc);
				}
			})

			result = tempFiltering;
			break;
		case "gameAbbreviation":
			result = await modelsFlat[request.params.modelName].find({}).catch(error => error);
			tempFiltering = [];
			for await (let doc of result) {
				let tempGame = await modelsFlat.Game.findOne({_id: doc.product.game}).catch(error => error);
				
				if (tempGame.abbreviation == request.params.value){
					tempFiltering.push(doc);
				}
			}

			result = tempFiltering;
			break;
		default:		
			result = await modelsFlat[request.params.modelName].find(
				{[request.params.key]: request.params.value}
			).catch(error => error);
			break;
	}

	result = await filterForUserRead(request.user._id, result).catch(error => error);
	response.json({
		results: result
	});
});

router.post("/one/:modelName/", async (request, response) => {
	let result = await modelsFlat[request.params.modelName].create(
		request.body
	).catch(error => error);

	response.json({
		result: result
	})
});


router.patch("/one/:modelName/:id", async (request, response) => {
	let result = await modelsFlat[request.params.modelName].findOneAndUpdate(
		{_id: request.params.id},
		request.body,
		{upsert: false, returnUpdatedDocs: true}
	).catch(error => error);

	response.json({
		result: result
	})
});

router.delete("/one/:modelName/:id", async (request, response) => {
	let result = await modelsFlat[request.params.modelName].findOneAndDelete(
		{_id: request.params.id}
	).catch(error => error);

	response.json({
		result: result
	})
});


module.exports = router;