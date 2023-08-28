const { Lore } = require('./LoreEmbeddedModel');

const Document = require('camo').Document;


/**
 * Base class that most other models should inherit from, if they involve TTRPG data.
 * @date 8/28/2023 - 8:27:47 PM
 * @author BigfootDS
 * 
 * @property {[Lore]} description Each item in this array contains localized data about this data, so its name and (usually) descriptive content can be localized to appropriate languages for users to read.
 * @property {[String]} tags Array of tags to help identify and find this item.
 *
 * @class
 * @typedef {Source}
 * @extends {Document}
 */
class Source extends Document {
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
	}
}

module.exports = {
	Source
}