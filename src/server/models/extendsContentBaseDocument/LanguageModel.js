const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { LocalizedContent } = require('../extendsEmbeddedDocument/LocalizedContentSubdocument');



class Language extends ContentBaseDocument {
	constructor(){
		super();
		
		this.typicalSpeakersTags = {
			type: [String],
			required: false
		}

		this.script = {
			type: [LocalizedContent],
			required: false
		}
		
	}
}



module.exports = { Language }