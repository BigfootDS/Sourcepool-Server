const { CustomBaseDocument } = require('../extendsDocument/CustomBaseDocumentModel');
const { Game } = require('./GameModel');


/**
 * Description placeholder
 * @author BigfootDS
 *
 * @class
 * @extends {CustomBaseDocument}
 */
class Product extends CustomBaseDocument {
	constructor(){
		super();

		this.abbreviation = {
			type: String,
			unique: true,
			required: true
		}

		this.releaseDate = {
			type: Date,
			unique: false,
			default: new Date(Date.now())
		}

		this.game = {
			type: Game,
			required: true,
			unique: false
		}
	}

	static getCollectionName() {
		return 'products';
	}
}


module.exports = { Product }