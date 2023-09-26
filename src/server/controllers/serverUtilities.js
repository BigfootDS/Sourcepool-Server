const express = require('express');
const camo = require('camo');
const { User } = require('../models/UserModel');
const { requiresAdminUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/databaseHealth", requiresAdminUser, (request, response) => {
	let collectionsList = camo.getClient().driver();
	response.json({
		collections: Object.keys(collectionsList)
	});
});

router.get("/envs", requiresAdminUser, (request, response) => {
	response.json({
		envs: process.env
	});
});

router.get("/info", requiresAdminUser, async (request, response) => {
	let adminCount = await User.count({isAdmin: true});

	response.json({
		adminCount: adminCount,
		settings: request.serverSettings
	});
});

router.get("/clientHandshake", async (request, response) => {
	let adminCount = await User.count({isAdmin: true});

	response.json({
		adminCount: adminCount,
		name: request.serverSettings.name
	});
});


module.exports = router;