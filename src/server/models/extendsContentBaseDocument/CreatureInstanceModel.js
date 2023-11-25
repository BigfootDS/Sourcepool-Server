const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { User } = require('../extendsDocument/UserModel');
const { Creature } = require('../extendsEmbeddedDocument/CreatureSubdocument');



class CreatureInstance extends ContentBaseDocument {
	constructor(){
		super();
		
		this.player = {
			type: User,
			required: false
		}

		this.creatureSubdoc = {
			type: Creature,
			required: true
		}
		
	}
}



module.exports = { CreatureInstance }