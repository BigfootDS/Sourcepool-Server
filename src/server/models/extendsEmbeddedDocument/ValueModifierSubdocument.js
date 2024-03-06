const camo = require('camo');
const { LocalizedContent } = require('./LocalizedContentSubdocument');
const EmbeddedDocument = camo.EmbeddedDocument;

class ValueModifier extends EmbeddedDocument {
	constructor(){
		super();

		this.targetPropertyName = {
			type: String,
			required: true
		}

		this.source = {
			type: LocalizedContent,
			required: false
		}

		this.numBonusValue = {
			type: Number,
			default: 0,
			required: false
		}

		this.numReplaceValue = {
			type: Number,
			required: false
		}

		this.strReplaceValue = {
			type: String,
			required: false
		}

	}


}

module.exports = {ValueModifier}