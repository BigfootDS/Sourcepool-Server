const { Game } = require('./GameModel');
const { Lore } = require('./Subdocuments/LoreEmbeddedModel');

const Document = require('camo').Document;

/**
 * Bundle of an item's name and a brief description. An item should have one of these for each language that it is localized into.
 * @date 8/28/2023 - 8:35:27 PM
 * @author BigfootDS
 *
 * @class
 * @property {String} language Required. The language of this Lore entry. Should be an ISO-639-1-compliant two-letter code.
 * @property {String} name Required. The name of this item in the appropriate language. 
 * @property {String} content Optional. A brief explanation of this item.
 * @extends {Document}
 */
class Product extends Document {
	constructor(){
		super();

		this.description = {
			type:[Lore],
			required: true
		}

		this.tags = {
			type: [String],
			required: false
		}

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
			required: false,
			unique: false
		}
	}
}

module.exports = {Product};