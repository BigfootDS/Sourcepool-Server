const { Property } = require('../extendsContentBaseDocument/PropertyModel');
const { CustomBaseDocument } = require('../extendsDocument/CustomBaseDocumentModel');
const { ValueModifier } = require('../extendsEmbeddedDocument/ValueModifierSubdocument');


class Grant extends CustomBaseDocument {
	constructor(){
		super();

		// Might be unused now that we've generic-ised everything into Entities and Properties?
		this.modelName = {
			type: String,
			required: false
		}
		this.modelRefId = {
			type: String,
			required: false
		}

		// Target property (lowercase P) to modify with a ValueModifier.
		this.propertyValueName = {
			type: String,
			required: false
		}

		// If a grant does something like modify a movement speed or HP total, this modifier does it.
		this.propertyValueModifier = {
			type: ValueModifier,
			required: false
		}

		// Used for when a Grant just grants more Properties to an Entity.
		this.propertyGroup = {
			type: [Property],
			required: false
		}
		
	}

	static getCollectionName() {
		return 'grants';
	}
}


module.exports = { Grant };