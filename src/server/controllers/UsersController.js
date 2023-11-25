const express = require('express');
const { User } = require('../models/extendsDocument/UserModel');
const { checkUpsertFlag } = require('../middleware/serverMiddleware');
const { requiresAdminUser } = require('../middleware/authMiddleware');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { comparePassword, generateUserJwt, validateUserJwt, regenerateUserJwt } = require('../functions/userAuthUtils');

router.get("/", async (request, response) => {
	let result = await User.find({});

	// If admin & query param "full=true" provided, show full user data
	// otherwise, strip sensitive data out of the result array
	if (!request.showFullDocuments){
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

	// If admin & query param "full=true" provided, show full user data
	// otherwise, strip sensitive data out of the result array
	if (!request.showFullDocuments){
		result = {
			_id: result._id, 
			username: result.username
		}
	}

	response.json({
		user: result
	});
});

router.get("/username/:userUsername", async (request, response) => {
	let result = await User.findOne({username: request.params.userUsername})

	// If admin & query param "full=true" provided, show full user data
	// otherwise, strip sensitive data out of the result array
	if (!request.showFullDocuments){
		result = {
			_id: result._id, 
			username: result.username
		}
	}

	response.json({
		user: result
	});
});

router.get("/admins", async (request, response) => {
	let result = await User.find({isAdmin: true});

	// If admin & query param "full=true" provided, show full user data
	// otherwise, strip sensitive data out of the result array
	if (!request.showFullDocuments){
		result = result.map((user) => {
			return {_id: user._id, username: user.username}
		});
	}

	response.json({
		users: result
	});
});

router.post("/", async (request, response) => {
	let hashedAndSaltedPassword = await bcrypt.hash(request.body.password, 16);
	let newModelInstance = User.create({
		username: request.body.username,
		password: hashedAndSaltedPassword
	});

	// Only admins can make admins!
	// Or, if no admins exist, then the first user made is the admin
	let adminCount = await User.count({isAdmin: true});
	if (adminCount == 0){
		newModelInstance.isAdmin = true;
	} else if (request.auth.isAdmin){
		newModelInstance.isAdmin = request.body.isAdmin;
	}

	let result = await newModelInstance.save();
	let freshJwt = await generateUserJwt(result._id);

	response.json({
		user: result,
		jwt: freshJwt
	});

});


/*
Assume that request.body is:
body: {
	username: "someUser", // human-friendly unique username
	password: "Password1" // unhashed password!
}
*/
router.post("/jwt/login", async (request, response) => {
	console.log("Starting JWT login process.");
	try {
		let targetUser = await User.findOne({username: request.body.username});
		console.log(targetUser);
		if (targetUser == null) {
			throw new Error("User does not exist.");
		}
		let passwordsMatch = await comparePassword(request.body.password, targetUser.password).catch(error => {
			console.log(error);
			return false;
		});
		if (passwordsMatch){
			let newJwt = await generateUserJwt(targetUser._id).catch(error => {
				console.log(error);
				throw error;
			});
			response.json({
				jwt: newJwt
			});
		} else {
			throw new Error("Login details are incorrect.");
		}
	} catch (error) {

		response.status(403).json({
			error:error.message
		});
	}


});

router.post("/jwt/regenerate", async (request, response) => {
	// regenerateUserJwt validates the provided original JWT already
	let freshJwt = await regenerateUserJwt(request.body.jwt);

	if (freshJwt){
		response.json({
			jwt: freshJwt
		});
	} else {
		response.status(403).json({
			error:"User session token is invalid, please sign in again."
		});
	}
});


router.post("/jwt/validate", async (request, response) => {
	let result = await validateUserJwt(request.body.jwt);

	if (result){
		response.json({
			jwt: result
		});
	} else {
		response.status(403).json({
			error:"User session token is invalid, please sign in again."
		});
	}
})




// Routes below need authentication and authorization middleware

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