const camo = require("camo");
const { Reference } = require("./ReferenceSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Choice extends EmbeddedDocument {
	constructor(){
		super();
		
		this.choicePool = {
			type: [Reference],
			required: true
		}

		this.chosenValues = {
			type: [Reference]
		}
		
	}
}



module.exports = { Choice }