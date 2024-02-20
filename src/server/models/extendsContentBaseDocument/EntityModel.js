const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { User } = require('../extendsDocument/UserModel');
const { Property } = require('./PropertyModel');




class Entity extends ContentBaseDocument {
	constructor(){
		super();
		
		// Useful for cloned NPCs -- 
		// eg. goblin entity instances used in an encounter, 
		// update the prototype to update all instances mid-encounter
		this.entityPrototype = {
			type: Entity,
			required: false
		}

		// If this entity is a player character (PC), this should refer to the user of that PC.
		this.playerOwner = {
			type: User,
			required: false
		}

		// Feats, racial abilities, ability scores, anything and everything.
		this.properties = {
			type: [Property],
			required: false
		}

		// Useful for inventories -- 
		// eg. character subentities include a backpack entity, 
		// which also includes a sword entity and shield entity
		this.subEntities = {
			type: [Entity],
			required: false
		}
		
	}
}



module.exports = { Entity }