const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Inventory } = require('../extendsEmbeddedDocument/InventorySubdocument');
const { CreatureInstance } = require('./CreatureInstanceModel');



class Place extends ContentBaseDocument {
	constructor(){
		super();
		
		this.inhabitants = {
			type: [CreatureInstance],
			required: false
		}

		this.inventory = {
			type: Inventory,
			required: false
		}

		this.subPlaces = {
			type: [Place],
			required: false
		}
		
	}
}



module.exports = { Place }