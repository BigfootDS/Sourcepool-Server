const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { CreatureLanguage } = require('../extendsEmbeddedDocument/CreatureLanguageSubdocument');
const { CreatureSize } = require('../extendsEmbeddedDocument/CreatureSizeSubdocument');
const { Movement } = require('../extendsEmbeddedDocument/MovementSubdocument');
const { Alignment } = require('./AlignmentModel');
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
		
		this.ageAdult = {
			type: Number,
			required: false,
			default: 18
		}

		this.ageTypicalMax = {
			type: Number,
			required: false,
			default: 100
		}

		this.typicalAlignments = {
			type: [Alignment],
			required: false
		}

		this.allowedSizes = {
			type: [CreatureSize],
			required: true
		}

		this.startingMovements = {
			type: [Movement],
			required: true
		}

		this.startingLanguages = {
			type: [CreatureLanguage],
			required: true
		}
	}
}



module.exports = { Species }