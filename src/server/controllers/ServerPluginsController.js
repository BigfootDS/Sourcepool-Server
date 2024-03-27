const { downloadPluginFromGithubUrl } = require('../functions/serverPluginUtils');
const { ServerPlugin } = require('../models/extendsDocument/ServerPluginModel');

const router = require('express').Router();


// Get all objects of this model.
router.get("/all", async (request, response) => {
	let result = await ServerPlugin.find({}).catch(error => error);

	response.json({
		result
	});
});

// Get one object of this model, searching by its document "_id" property.
router.get("/one/:id", async (request, response) => {
	let result = await ServerPlugin.findOne({_id: request.params.id}).catch(error => error);

	response.json({
		result
	});
});


// Get one or many objects.
// If no key is provided, or if a key is provided without a value, this returns nothing.
router.get("/multiple/:key/:value", async (request, response) => {
	// Our data structure is too nested to do this simply:
	//let result = await ServerPlugin.find({[request.params.key]: request.params.value}).catch(error => error);
	let results = [];

	// let allDocuments = await ServerPlugin.find({});

	switch (request.params.key) {
		case "name":
			results = await ServerPlugin.find({"description.name": {$regex: new RegExp(`(${request.params.value})`, 'gi')}}).catch(error => error);
			break;
		case "tags":
		case "tag":
			results = await ServerPlugin.find({"tags": {$regex: new RegExp(`(${request.params.value})`, 'gi')}}).catch(error => error);
			break;
		// case "ability":
		// 	let tempAbility = await Ability.findOne({"description.name":{$regex: new RegExp(`(${request.params.value})`, 'gi')}});
		// 	results = await ServerPlugin.find({"ability":tempAbility._id}).catch(error => error);
		// 	break;
		default:
			break;
	}

	response.json({
		results
	})
});

// Create new object.
// Expects object data to be on the request body.
// Expects request.body to look like:
/*
{
    "ability": "7865123476485"
}
*/
router.post("/one", async (request, response) => {
	let newDoc = await ServerPlugin.create(request.body).save().catch(error => error);

	response.json({
		result: newDoc
	});
});


router.post("/download", async (request, response) => {
	let result = await downloadPluginFromGithubUrl(request.body.repoUrl);
	response.json({result});
});





// Edit any property on object and return whole object.
// Expects to-be-updated data to be on the request body.
// Expects request.body to look like:
/*
{
	targetDocId: "askhgdbfa",
	newData: {
		someProperty: "someValue"
	}
}
*/
router.patch("/one", async (request, response) => {
	let result = await ServerPlugin.findOne({_id: request.body.targetDocId});

	Object.keys(request.body.newData).forEach((key, index) => {
		console.log(key, result[key]);
		result[key] = request.body.newData[key]
	});

	let savedResult = await result.save();

	response.json({
		result: savedResult
	});
});

// Delete an object and return a success/fail result of the delete operation.
router.delete("/one", async (request, response) => {
	let result = await ServerPlugin.findOneAndDelete({_id: request.body.targetDocId});

	response.json({
		result: result
	});
});

module.exports = router;