const ISO6391 = require('iso-639-1');

const EmbeddedDocument = require('camo').EmbeddedDocument;


let allowedLanguageCodes = ISO6391.getAllCodes();
console.log(allowedLanguageCodes);


/**
 * Bundle of an item's name and a brief description. An item should have one of these for each language that it is localized into.
 * @date 8/28/2023 - 8:35:27 PM
 * @author BigfootDS
 *
 * @class
 * @property {String} language Required. The language of this Lore entry. Should be an ISO-639-1-compliant two-letter code.
 * @property {String} name Required. The name of this item in the appropriate language. 
 * @property {String} content Optional. A brief explanation of this item.
 * @extends {EmbeddedDocument}
 */
class Lore extends EmbeddedDocument {
	constructor(){
		super();

		this.language = {
			type: String,
			choices: allowedLanguageCodes,
			unique: false,
			required: true
		}

		this.name = {
			type: String,
			unique: false,
			required: true
		}

		this.content = {
			type: String,
			unique: false,
			required: false
		}
	}
}

module.exports = {Lore};