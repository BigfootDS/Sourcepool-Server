const express = require('express');
const camo = require('camo');

const router = express.Router();

router.get("/databaseHealth", (request, response) => {
	let collectionsList = camo.getClient().driver();
	response.json({
		collections: Object.keys(collectionsList)
	});
});

router.get("/envs", (request, response) => {
	response.json({
		envs: process.env
	});
});


module.exports = router;