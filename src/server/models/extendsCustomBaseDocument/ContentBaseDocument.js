const { Product } = require('./ProductModel');
const { CustomBaseDocument } = require('../extendsDocument/CustomBaseDocumentModel');


/**
 * Localized content and tags of an entity. This model should be used via inheritance (Camo, NeDB) or discriminators (MongooseJS).
 * @author BigfootDS
 *
 * @class
 * @property {[LocalizedContent]} descriptions Required. A collection of LocalizedContent subdocuments to store variations of names & descriptions of this entity in multiple languages. At least one LocalizedContent (title and content) must exist so that humans can see what entity they're looking at.
 * @property {[String]} tags Optional. A list of strings that can be used to filter and search for this entity.
 * @extends {CustomBaseDocument}
 
Example data:
 ```js
 {
	descriptions: [
		 {
			language: "en",
			name: "Excalibur",
			content: "That super cool sword from legends of old. "
		},
		{
			language: "fr",
			name: "Excalibur",
			content: "C'est l'epee super cool de myths. "
		}
	],
	tags: [
		"sword", 
		"magic"
	],
	product: "91385612iou98612310"
 }
 ```
 */
class ContentBaseDocument extends CustomBaseDocument {
	constructor(){
		super();

		/**
		 * An entity should be associated with or "from" a particular product, such as a specific D&D sourcebook, and that product should be referenced here.
		 * Required. All entities should be grouped into a product, even if its "Homebrew Ideas" or "Random Junk Storage".
		 */
		this.product = {
			type: Product,
			required: true
		}

		/**
		 * An entity can be an instance based on another entity. Instances may have looser permissions, or may synchronise from an upstream "prototype" entity.
		 * Required. Gotta know whether or not it's true or false. Default is false.
		 */
		this.isInstance = {
			type: Boolean,
			required: true,
			default: false
		}
	}

	static getCollectionName() {
		return 'customBaseDocuments';
	}
}


module.exports = { ContentBaseDocument };