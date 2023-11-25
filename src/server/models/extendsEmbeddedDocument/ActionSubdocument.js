const camo = require("camo");
const { ActionType } = require("../extendsContentBaseDocument/ActionTypeModel");
const { Attack } = require("./AttackSubdocument");
const { LocalizedContent } = require("./LocalizedContentSubdocument");
const EmbeddedDocument = camo.EmbeddedDocument;



class Action extends EmbeddedDocument {
	constructor(){
		super();
		
		this.actionType = {
			type: ActionType,
			required: true
		}

		this.attack = {
			type: Attack,
			required: false
		}

		this.description = {
			type: [LocalizedContent],
			required: false
		}

		this.descriptionBrief = {
			type: [LocalizedContent],
			required: false
		}
		
	}
}



module.exports = { Action }