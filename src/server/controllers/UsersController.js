const express = require('express');
const { User } = require('../models/UserModel');
const { checkUpsertFlag } = require('../middleware/serverMiddleware');
const { requiresAdminUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/", async (request, response) => {
	let actingUser = await User.findOne({username: request.auth?.username, password: request.auth?.password});

	let result = await User.find({});

	if (!actingUser?.isAdmin || request.query.full != "true"){
		result = result.map((user) => {
			return {_id: user._id, username: user.username}
		});
	}

	response.json({
		users: result
	});
});

router.get("/id/:userId", async (request, response) => {
	let result = await User.findOne({_id: request.params.userId})

	response.json({
		user: result
	});
});

router.get("/username/:userUsername", async (request, response) => {
	let result = await User.findOne({username: request.params.userUsername})

	response.json({
		user: result
	});
});

router.get("/admins", async (request, response) => {
	let result = await User.find({isAdmin: true});

	response.json({
		users: result
	});
});

router.post("/", async (request, response) => {
	let newModelInstance = User.create({
		username: request.body.username,
		password: request.body.password
	});

	// Only admins can make admins!
	if (request.auth.isAdmin){
		newModelInstance.isAdmin = request.body.isAdmin;
	}

	let result = await newModelInstance.save();

	response.json({
		user: result
	});

});

router.put("/", checkUpsertFlag, requiresAdminUser, async (request, response) => {
	let targetModelInstance = await User.findOneAndUpdate(
		{
			_id: request.body.id
		},
		{
			username: request.body.username,
			password: request.body.password,
			isAdmin: request.body.isAdmin
		}, 
		{
			upsert: true
		}
	);

	response.json({
		user: targetModelInstance
	})
	
});

router.patch("/", async (request, response) => {
	// Camo/NeDB doesn't actually have "patch one bit of data and return the full object"
	// so we gotta be careful and slow here, do the properties one-by-one.
	let target = await User.findOne({_id: request.body.id});

	target.username = request.body.username || target.username;
	target.password = request.body.password || target.password;

	if (request.auth.isAdmin){
		target.isAdmin = request.body.isAdmin || target.isAdmin;
	}

	let result = await target.save();

	response.json({
		user: result
	})
	
});


router.delete("/", async (request, response) => {

	let actingUser = await User.findOne({username: request.auth.username, password: request.auth.password});
	if (!actingUser){
		response.status(403).json({
			error:"Invalid user attempting to delete users. Please log in again."
		});
	}

	if (request.serverSettings.usersCanDeleteSelf){
		if (actingUser._id == request.body.id || actingUser.isAdmin){
			let result = await User.findOneAndDelete({_id: request.body.id});

			response.json({
				result: result
			});
		} else {
			response.status(403).json({
				result: "You do not have permissions to delete users other than yourself."
			});
		}
	} else if (actingUser.isAdmin){
		let result = await User.findOneAndDelete({_id: request.body.id});

		response.json({
			result: result
		});
	} else {
		response.status(403).json({
			result:"Authorization case not supported, no data has been deleted."
		});
	}


	
});

module.exports = router;