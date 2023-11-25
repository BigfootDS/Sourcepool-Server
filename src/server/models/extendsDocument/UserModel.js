const camo = require('camo');
const Document = camo.Document;
const {Role} = require("./RoleModel");

class User extends Document {
	constructor(){
		super();

		this.username = {
			type: String,
			required: true,
			unique: true
		}

		this.password = {
			type: String,
			required: true,
			unique: true
		}

		this.roles = {
			type: [Role],
			required: true
		}
	}

	static getCollectionName() {
		return 'users';
	}
}


module.exports = { User };