const camo = require("camo");
const { Feature } = require("../extendsContentBaseDocument/FeatureModel");
const { Choice } = require("./ChoiceSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class FeatureInstance extends EmbeddedDocument {
	constructor(){
		super();
		
		this.featureRef = {
			type: Feature,
			required: true
		}

		this.choices = {
			type: [Choice],
			required: false
		}
		
	}
}



module.exports = { FeatureInstance }