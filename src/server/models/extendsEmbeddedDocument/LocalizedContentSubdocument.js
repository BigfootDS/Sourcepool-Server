const camo = require('camo');
const EmbeddedDocument = camo.EmbeddedDocument;

const ISO6391 = require('iso-639-1');
let allowedLanguageCodes = ISO6391.getAllCodes();


/**
 * A name and (optionally) a brief explanation about something. 
 * For example, a magic sword would have a LocalizedContent that details the name of the sword and a brief explanation of the sword, in a specific language.
 * Entities can have multiple LocalizedContent subdocuments, and should be used to represent translations or localizations of content across multiple languages.
 * @author BigfootDS
 *
 * @class
 * @property {String} language Required. The language of this Lore entry. Should be an ISO-639-1-compliant two-letter code.
 * @property {String} name Required. The name of this item in the appropriate language. 
 * @property {String} content Optional. A brief explanation of this item in the appropriate language.
 * @extends {EmbeddedDocument}
 
Example data:
 ```js
 {
 	language: "en",
	name: "Excalibur",
	content: "That super cool sword from legends of old. "
 }
 ```
 */
class LocalizedContent extends EmbeddedDocument {
	constructor(){
		super();

		/**
		 * A two-letter language code that matches the language of this subdocument's name and content.
		 * Examples: "EN", "FR", "DE"
		 * Refer to the ISO-639-1 standard online for the full list of usable codes.
		 */
		this.language = {
			type: String,
			choices: allowedLanguageCodes,
			unique: false,
			required: true
		}

		/**
		 * A document uses LocalizedContent as a subdocument. The name here is the name of the entity represented by that document.
		 */
		this.name = {
			type: String,
			unique: false,
			required: true
		}

		/**
		 * A document uses LocalizedContent as a subdocument. The content here is the brief blurb or description of the entity represented by that document.
		 */
		this.content = {
			type: String,
			unique: false,
			required: false
		}
	}

	static collectionName() {
		return 'localizedContents';
	}
}


module.exports = { LocalizedContent };