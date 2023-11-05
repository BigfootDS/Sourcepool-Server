# Controller Base Code

This should be a nice starting point for any controllers in the Sourcepool Server code.

## Code

This code should be used in a file representing the controller of one (1) model.

```js
const router = require('express').Router();

// Get all objects of this model.
router.get("/all", async (request, response) => {

});

// Get one object.
// If no key is provided, or if a key is provided without a value, this returns nothing.
router.get("/one/:key/:value", async (request, response) => {

});

// Create new object.
// Expects object data to be on the request body.
router.post("/one", async (request, response) => {

});

// Edit whole object and return whole object.
// Expects object data to be on the request body.
router.put("/one", async (request, response) => {

});

// Delete an object and return a success/fail result of the delet operation.
router.delete("/one", async (request, response) => {

});

module.exports = router;
```

Things like middleware and specific models must be implemented yourself.

The mounting or using of the router in the server must also be implemented yourself.

## Example Usage

The file name should be `{CollectionName}Controller.js`. For example, the Ability model has a collection name of `Abilities`, so the file name for its controller should be `AbilitiesController.js`.

You can find a model's collection name within its model file.

Models that inherit from `EmbeddedDocument` do not need controllers, as they cannot exist outside of a regular `Document`-based Model.

Here's what a developed `AbilitiesController.js` looks like, based on the above starter code:

```js
const { Ability } = require('../models/AbilityModel');

const router = require('express').Router();

// Get all objects of this model.
router.get("/all", async (request, response) => {
	let result = await Ability.find({}).catch(error => error);

	response.json({
		result
	});
});

// Get one object of this model, searching by its document "_id" property.
router.get("/one/:id", async (request, response) => {
	let result = await Ability.findOne({_id: request.params.id}).catch(error => error);

	response.json({
		result
	});
});

// Get one or many objects.
// If no key is provided, or if a key is provided without a value, this returns nothing.
router.get("/multiple/:key/:value", async (request, response) => {
	// Our data structure is too nested to do this simply:
	//let result = await Ability.find({[request.params.key]: request.params.value}).catch(error => error);
	let results = [];

	// let allDocuments = await Ability.find({});

	switch (request.params.key) {
		case "name":
			results = await Ability.find({"description.name": {$regex: new RegExp(`(${request.params.value})`, 'gi')}}).catch(error => error);
			break;
		case "tags":
		case "tag":
			results = await Ability.find({"tags": {$regex: new RegExp(`(${request.params.value})`, 'gi')}}).catch(error => error);
			break;
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
    "tags":"testo",
    "description": [
        {
            "language":"en",
            "name":"Testo Ability",
            "content":"Test of functionality."
        },
                {
            "language":"fr",
            "name":"Ability de Testo",
            "content":"Test de logicel."
        }
    ]
}
*/
router.post("/one", async (request, response) => {
	// let newAbility = await Ability.create({
	// 	tags: request.body.tags,
	// 	description: [
	// 		await Lore.create({
	// 			language: "en",
	// 			name:ability.name,
	// 			content:ability.content
	// 		})
	// 	],
	// }).save();

	let newDoc = await Ability.create(request.body).save().catch(error => error);

	response.json({
		result: newDoc
	});
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
	let result = await Ability.findOne({_id: request.body.targetDocId});

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
	let result = await Ability.findOneAndDelete({_id: request.body.targetDocId});

	response.json({
		result: result
	});
});

module.exports = router;

```


Then, such a controller is used by the ExpressJS server like so:

```js
const abilityController = require('./controllers/AbilitiesController');
router.use("/abilities", abilityController);
```

The controllers _can_ be basic, but should have plans to implement thorough or robust functionality somewhere in the Sourcepool project task list. The above controller has no implementation of authorisation or user access roles, for example, which is not ideal - but at least it lets the frontend developers start working on UI for your controller!
