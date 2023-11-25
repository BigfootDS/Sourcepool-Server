const express = require('express');
const router = express.Router();

const { modelsFlat } = require('../models/modelUtils');


router.get("/all/:modelname", async (request, response) => {
	console.log("Generic controller working on model: " + request.params.modelname);
	console.log(modelsFlat);
	let result = await modelsFlat[request.params.modelname].find({});

	response.json({
		results: result
	})
})


module.exports = router;