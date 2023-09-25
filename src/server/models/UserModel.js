const Document = require('camo').Document;


/**
 * A user of this Sourcepool server.
 * @date 8/28/2023 - 8:43:37 PM
 * @author BigfootDS
 *
 * @class
 * @property {String} username Required. Unique. A user's name.
 * @property {String} password Optional. Password to control access to a user account. Accounts with no passwords could be used by anyone, which can be useful when a player misses a game session. NOT YET SECURE!
 * @property {Boolean} isAdmin Optional. Cannot be set by a user that is not an admin - this controls access to additional, sensitive server settings.
 * @extends {Document}
 */
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
			default: false,
			required: false
		}

	}

	static collectionName() {
		return 'users';
	}


}


module.exports = {
	User
}