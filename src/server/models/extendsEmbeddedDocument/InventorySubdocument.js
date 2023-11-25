const camo = require("camo");
const { ItemInstance } = require("./ItemInstanceSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Inventory extends EmbeddedDocument {
	constructor(){
		super();
		
		this.items = {
			type: [ItemInstance],
			required: false
		}
		
	}
}



module.exports = { Inventory }