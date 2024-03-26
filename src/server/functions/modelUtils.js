// #region Imports
// Extends Document
const { Role } = require("../models/extendsDocument/RoleModel");
const { ServerConfig } = require("../models/extendsDocument/ServerConfig");
const { User } = require("../models/extendsDocument/UserModel");
const { ServerPlugin } = require("../models/extendsDocument/ServerPluginModel");

// Extends CustomBaseDocument
const { Campaign } = require("../models/extendsCustomBaseDocument/CampaignModel");
const { Game } = require("../models/extendsCustomBaseDocument/GameModel");
const { Product } = require("../models/extendsCustomBaseDocument/ProductModel");

// Extends ContentBaseDocument
const { Lore } = require("../models/extendsContentBaseDocument/LoreModel");

// Extends EmbeddedDocument
const { ContentPermission } = require("../models/extendsEmbeddedDocument/ContentPermissionSubdocument");
const { LocalizedContent } = require("../models/extendsEmbeddedDocument/LocalizedContentSubdocument");


//#endregion

const models = {
	extendsDocument: {
		User,
		Role,
		ServerConfig,
		ServerPlugin
	},
	extendsCustomBaseDocument: {
		Campaign,
		Game,
		Product,
	},
	extendsContentBaseDocument: {
		Lore
	},
	extendsEmbeddedDocument: {
		ContentPermission,
		LocalizedContent
	}
}

const referenceModelsFlat = Object.assign(
	models.extendsDocument,
	models.extendsCustomBaseDocument,
	models.extendsContentBaseDocument
);



async function pingAllModels(){

	await Promise.all(Object.entries(referenceModelsFlat).map(async (kvp) => {
		await kvp[1].findOne({});
	}));
}


async function serverMinimalSetup(){
	let roles = await models.extendsDocument.Role.find({});
	let regularUserRole = null;
	let adminUserRole = null; 

	if (roles.length == 0){
		// create user and admin roles
		regularUserRole = await models.extendsDocument.Role.create({
			admin: false,
			descriptions: [
				{
					language: "en",
					name: "User",
					content:"Default user type. Permissions may be limited by the server owner."
				}
			]
		}).save();

		adminUserRole = await models.extendsDocument.Role.create({
			admin: true,
			descriptions: [
				{
					language: "en",
					name:"Admin",
					content:"Elevated permissions granted. Admins have full control over the server."
				}
			]
		}).save();

		// and then update roles to match new data
		roles = await models.extendsDocument.Role.find({});
	}

	let serverConfig = await models.extendsDocument.ServerConfig.find({});
	if (serverConfig.length == 0){

		if (!regularUserRole){
			regularUserRole = await models.extendsDocument.Role.find({admin:false, "descriptions.name": "User"});
		}

		if (!adminUserRole){
			adminUserRole = await models.extendsDocument.Role.find({admin: true, 'descriptions.name':'Admin'});
		}

		let defaultPermissions = [
			ContentPermission.create({
				role: regularUserRole._id,
				create: false,
				read: true,
				update: false,
				delete: false
			}),
			ContentPermission.create({
				role: adminUserRole._id,
				create: true,
				read: true,
				update: true,
				delete: true
			})
		];

		let newServerConfig = await models.extendsDocument.ServerConfig.create({
			name: "Sourcepool Server",
			ftueComplete: false,
			usersNeedPasswords: true,
			onlyAdminCanEditContent: true,
			usersCanDeleteSelf: true,
			localWebClientVersion: "0.0.0",
			shouldAutoUpdateLocalClient: true,
			clientAutoUpdateInterval: 1000 * 60 * 60, // one hour
			jwtEncryptionKey: "Customise this to increase the security level of the server's password encryption.",
			jwtLifetimeBeforeExpiry: "7d",
			passwordSaltCostFactor: 8,
			permissions: defaultPermissions,
			defaultDatapacksCRUDPermissions: defaultPermissions,
			defaultPluginsCRUDPermissions: defaultPermissions,
			datapacksCreateDuplicateProducts: false
		}).save();
	}

}

async function getAdminCount(){
	let adminCount = 0;
	let tempAllUsers = await models.extendsDocument.User.find({});
	let adminUsers = tempAllUsers.map((user) => {
		let result = user.roles.filter(role => {
			return role.admin === true;
		})

		if (result) return user;

	});

	if (adminUsers.length){
		adminCount = adminUsers.length;
	}

	return {count: adminCount, users: adminUsers};
}



async function filterForUserRead (userId, targetDocuments) {
	let filteredDocuments = [];

	
	let actingUser = await User.findOne({_id: userId});
	console.log("Acting user:");
	console.log(actingUser);

	if (actingUser.roles.some(role => role.admin)){
		filteredDocuments = targetDocuments;
	} else {
		targetDocuments.forEach((doc) => {
			// Filter each document role for the ones that have read:true
			let rolesThatCanRead = doc.permissions?.map(perm => {
				if (perm.read){
					return perm.role;
				}
			}) || [];
			
			//console.log(rolesThatCanRead);
	
			// Foreach role that can read this document, check if the user has that role
			let userHasRightRoles = actingUser.roles.some((role) => {
				// console.log("Checking if this role is in the rolesThatCanRead:" + role._id);
				return rolesThatCanRead.includes(role._id);
			})
			
			// If user has that role, return that document
			if (userHasRightRoles){
				filteredDocuments.push(doc);
			}
	
		});
	}

	

	return filteredDocuments;
}

let utils = {
	helpers: {
		pingAllModels,
		serverMinimalSetup,
		getAdminCount,
		filterForUserRead
	},
	models: models,
	modelsFlat: referenceModelsFlat
}

module.exports = {...utils};


