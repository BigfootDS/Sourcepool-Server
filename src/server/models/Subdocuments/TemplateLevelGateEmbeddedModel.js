const { Template } = require('../TemplateModel');

const EmbeddedDocument = require('camo').EmbeddedDocument;


/**
 * Per-character instance of a feature. Some features include options that a user must make, so they are managed here.
 * @date 8/31/2023 - 11:20:08 AM
 * @author BigfootDS
 *
 * @class
 * @property {Feature} feature Required. The associated feature for this instance.
 * @extends {EmbeddedDocument}
 */
class TemplateLevel extends EmbeddedDocument{
	constructor(){
		super();

		this.level = {
			type: Number,
			default: 1,
			required: true
		}

		this.template = {
			type: Template,
			required: true
		}
	}
}

module.exports = {
	TemplateLevel
}