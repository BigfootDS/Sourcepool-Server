const { User } = require("../models/UserModel")


const requiresAdminUser = async (request, response, next) => {
	if (!request.auth || (!request.auth.username || !request.auth.password)){
		return response.status(500).json({
			error: "Authentication failed."
		});
	}
	let requestUser = await User.findOne({ username: request.auth.username, password: request.auth.password });
	if (requestUser.isAdmin) {
		console.log("Admin is doing stuff!");
		request.auth.isAdmin = true;
		next();
	} else {
		return response.status(403).json({
			error: "You do not have access to this resource."
		})
	}

}


const validateBasicAuth = (request, response, next) => {

	// Assign the header to something easier to work with, if it exists.
	let authHeader = request.headers["authorization"] ?? null;
	console.log("authheader:" + authHeader);

	// If no auth header provided, don't waste our time on the rest of this function.
	if (authHeader == null || authHeader?.length < 1) {
		return response.status(403).json({
			error: "Authentication required to access this resource."
		});
	}

	// Confirm it's a Basic auth string, 
	// and store only the encoded string.
	if (authHeader?.startsWith("Basic ")) {
		authHeader = authHeader.substring(5).trim();

		//console.log("Provided base64 auth string is: " + authHeader);

		// Decode the string.
		let decodedAuth = Buffer.from(authHeader, 'base64').toString('ascii');
		//console.log("Decoded auth data is: " + decodedAuth);

		// Convert it into a usable object.
		let objDecodedAuth = { username: '', password: '' };
		objDecodedAuth.username = decodedAuth.substring(0, decodedAuth.indexOf(":"));
		objDecodedAuth.password = decodedAuth.substring(decodedAuth.indexOf(":") + 1);
		// console.log(objDecodedAuth)

		// Add decoded data to the request object
		// for other middleware and functions to access.
		request.auth = { ...objDecodedAuth };

		// Call the next step in the server's middleware chain or go to the route's callback.
		next();

	} else {
		// If it's not basic, other stuff needs to be done to process
		// the auth data.
		next();
	}

}



module.exports = {
	validateBasicAuth, requiresAdminUser
}