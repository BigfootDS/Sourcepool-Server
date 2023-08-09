const Document = require('camo').Document;

class User extends Document{
	constructor(){
		super();

		this.username = {
			type: String,
			unique: true,
			required: true
		};
		this.password = {
			type: String,
			required: false
		};
		this.isAdmin = {
			type: Boolean,
			required: false
		}

	}

	static collectionName() {
		return 'users';
	}


}


module.exports = {
	User: User
}