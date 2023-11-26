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

	response.json({
		result: result
	});
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