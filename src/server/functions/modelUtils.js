// #region Imports
// Extends Document
const { Role } = require("../models/extendsDocument/RoleModel");
const { ServerConfig } = require("../models/extendsDocument/ServerConfig");
const { User } = require("../models/extendsDocument/UserModel");

// Extends CustomBaseDocument
const { Campaign } = require("../models/extendsCustomBaseDocument/CampaignModel");
const { Dice } = require("../models/extendsCustomBaseDocument/DiceModel");
const { Game } = require("../models/extendsCustomBaseDocument/GameModel");
const { Product } = require("../models/extendsCustomBaseDocument/ProductModel");
const { Grant } = require("../models/extendsCustomBaseDocument/GrantModel");

// Extends ContentBaseDocument

const { Calendar } = require("../models/extendsContentBaseDocument/CalendarModel");
const { Day } = require("../models/extendsContentBaseDocument/DayModel");
const { Encounter } = require("../models/extendsContentBaseDocument/EncounterModel");
const { Epoch } = require("../models/extendsContentBaseDocument/EpochModel");
const { Entity } = require("../models/extendsContentBaseDocument/EntityModel");
const { Lore } = require("../models/extendsContentBaseDocument/LoreModel");
const { Month } = require("../models/extendsContentBaseDocument/MonthModel");
const { Property } = require("../models/extendsContentBaseDocument/PropertyModel");
const { Universe } = require("../models/extendsContentBaseDocument/UniverseModel");

// Extends EmbeddedDocument
const { CampaignCalendar } = require("../models/extendsEmbeddedDocument/CampaignCalendarSubdocument");
const { ContentPermission } = require("../models/extendsEmbeddedDocument/ContentPermissionSubdocument");
const { DiceRoll } = require("../models/extendsEmbeddedDocument/DiceRollSubdocument");
const { ImportantDate } = require("../models/extendsEmbeddedDocument/ImportantDateSubdocument");
const { ImportantEvent } = require("../models/extendsEmbeddedDocument/ImportantEventSubdocument");
const { Initiative } = require("../models/extendsEmbeddedDocument/InitiativeSubdocument");
const { LocalizedContent } = require("../models/extendsEmbeddedDocument/LocalizedContentSubdocument");
const { Prerequisite } = require("../models/extendsEmbeddedDocument/PrerequisiteSubdocument");
const { ValueModifier } = require("../models/extendsEmbeddedDocument/ValueModifierSubdocument");


//#endregion

const models = {
	extendsDocument: {
		User,
		Role,
		ServerConfig
	},
	extendsCustomBaseDocument: {
		Campaign,
		Dice,
		Game,
		Product,
		Grant
	},
	extendsContentBaseDocument: {
		Calendar,
		Day,
		Encounter,
		Epoch,
		Entity,
		Lore,
		Month,
		Property,
		Universe
	},
	extendsEmbeddedDocument: {
		CampaignCalendar,
		ContentPermission,
		DiceRoll,
		ImportantDate, ImportantEvent,
		Initiative,
		LocalizedContent, 
		Prerequisite,
		ValueModifier
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
	if (roles.length == 0){
		// create user and admin roles
		let regularUserRole = await models.extendsDocument.Role.create({
			admin: false,
			descriptions: [
				{
					language: "en",
					name: "User",
					content:"Default user type. Permissions may be limited by the server owner."
				}
			]
		}).save();

		let adminUserRole = await models.extendsDocument.Role.create({
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
			passwordSaltCostFactor: 8
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


