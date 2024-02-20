const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Grant } = require('../extendsCustomBaseDocument/GrantModel');
const { Prerequisite } = require('../extendsEmbeddedDocument/PrerequisiteSubdocument');

class Property extends ContentBaseDocument { 
	constructor(){
		super();

		this.propertyPrototype = {
			type: Property,
			required: false
		}
		
		this.grants = {
			type: [Grant],
			required: false
		}

		this.prerequisiteAny = {
			type: [Prerequisite],
			required: false
		}

		this.prerequisiteAll = {
			type: [Prerequisite],
			required: false
		}
	}


}

module.exports = {Property}