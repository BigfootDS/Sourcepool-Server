const { Ability } = require('../models/AbilityModel');

const router = require('express').Router();

// Get all objects of this model.
router.get("/all", async (request, response) => {
	let result = await Ability.find({});

	response.json({
		result
	});
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
