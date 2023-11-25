const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Feature } = require('./FeatureModel');



class Species extends ContentBaseDocument {
	constructor(){
		super();
		
		this.parentSpecies = {
			type: Species,
			required: false
		}

		this.grantedFeatures = {
			type: [Feature],
			required: false
		}
		
	}
}



module.exports = { Species }