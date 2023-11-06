const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../models/ServerConfig');


const hashPassword = async (unsecurePassword) => {
	let passwordSalt = await bcrypt.genSalt(16);
	return bcrypt.hashSync(unsecurePassword, passwordSalt)
}

const comparePassword = async (unsecurePassword, securePassword) => {
	let result = await bcrypt.compare(unsecurePassword, securePassword).catch(error => {
		console.log(error);
		return false;
	});
	if (result){
		return result;
	} else {
		throw new Error("Password was not correct.");
	}
}

const generateUserJwt = async (userId) => {
	let config = await ServerConfig.findOne({});
	return jwt.sign(
		{
			userId: userId
		}, 
		config.jwtEncryptionKey, 
		{
			expiresIn: config.jwtLifetimeBeforeExpiry
		}
	);
}

const validateUserJwt = async (userJwt) => {
	let config = await ServerConfig.findOne({});
	try {
		let decodedToken = jwt.verify(
			userJwt,
			config.jwtEncryptionKey
		);
		return decodedToken;
	} catch (error) {
		return false;
	}
}

const regenerateUserJwt = async (userJwt) => {
	let verifyResult = await validateUserJwt(userJwt);
	if (verifyResult){
		let freshJwt = await generateUserJwt(verifyResult.userId);
		return freshJwt;
	} else {
		return false;
	}
}

module.exports = {
	hashPassword, comparePassword,
	generateUserJwt, validateUserJwt, regenerateUserJwt
}