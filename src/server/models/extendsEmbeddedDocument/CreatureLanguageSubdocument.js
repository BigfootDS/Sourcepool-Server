const camo = require("camo");
const { Language } = require("../extendsContentBaseDocument/LanguageModel");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class CreatureLanguage extends EmbeddedDocument {
	constructor(){
		super();
		
		this.language = {
			type: Language,
			required: true
		}

		this.note = {
			type: [LocalizedContent],
			required: false
		}
		
	}
}



module.exports = { CreatureLanguage }