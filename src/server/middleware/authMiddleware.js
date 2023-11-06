const { validateUserJwt } = require("../functions/userAuthUtils");
const { User } = require("../models/UserModel")


const prepareJwtHeader = async (request, response, next) => {
	if (!request.user || typeof(request.user) != "object") {
		request.user = {}
	}

	// Assign the header to something easier to work with, if it exists.
	let jwtHeader = request.headers["jwt"] ?? null;
	console.log("jwtHeader:" + jwtHeader);

	// If auth not provided, check if that matters:
	// - return an error if auth is required
	// - move on to next middleware in chain if auth is not required	
	if (jwtHeader == null || jwtHeader?.length < 1){
		// request.serverSettings is provided by another, global, middleware function.
		if (request.serverSettings.requireAuth){
			return response.status(403).json({
				error: "Authentication required to access this resource."
			});
		} else {
			return next();
		}
	}


	// So, JWT is required AND is provided.
	// Verify that the JWT is valid.
	let result = await validateUserJwt(jwtHeader);

	// result is an object if JWT is valid, or false if JWT is invalid.
	if (result){
		request.user = await User.findOne({_id: result.userId});
		return next();
	} else {
		return response.status(403).json({
			error:"User session token is invalid, please sign in again."
		});
	}
}


const enableFullDocumentDataInQueries = async (request, response, next) => {
	let showFullDocuments = false;
	showFullDocuments = request.user?.isAdmin && request.query.full == "true";

	request.showFullDocuments = showFullDocuments;
	return next();
}

const requiresValidUserJwt = async (request, response ,next) => {
	if (!request.user || typeof(request.user) != "object") {
		request.user = {}
	}

	// Assign the header to something easier to work with, if it exists.
	let jwtHeader = request.headers["jwt"] ?? null;
	console.log("jwtHeader:" + jwtHeader);

	if (jwtHeader == null || jwtHeader?.length < 1){
		return response.status(403).json({
			error: "Authentication required to access this resource."
		});
	}

	// So, JWT is required AND is provided.
	// Verify that the JWT is valid.
	let result = await validateUserJwt(jwtHeader);

	// result is an object if JWT is valid, or false if JWT is invalid.
	if (result){
		request.user = await User.findOne({_id: result.userId});
		return next();
	} else {
		return response.status(403).json({
			error:"User session token is invalid, please sign in again."
		});
	}
}

const requiresAdminUser = async (request, response, next) => {
	if (request.user.isAdmin){
		return next();
	} else {
		return response.status(403).json({
			error:"You do not have permissions to perform that action."
		});
	}

}





module.exports = {
	requiresValidUserJwt, 
	requiresAdminUser,
	prepareJwtHeader,
	enableFullDocumentDataInQueries
}