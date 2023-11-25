const camo = require("camo");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const { CastingComponent } = require("../extendsContentBaseDocument/CastingComponentModel");
const EmbeddedDocument = camo.EmbeddedDocument;



class SpellComponent extends EmbeddedDocument {
	constructor(){
		super();
		
		this.description = {
			type: [LocalizedContent],
			required: true
		}

		this.componentType = {
			type: CastingComponent,
			requireud: true
		}
		
	}
}



module.exports = { SpellComponent }