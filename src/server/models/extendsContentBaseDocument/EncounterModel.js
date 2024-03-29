const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { Initiative } = require('../extendsEmbeddedDocument/InitiativeSubdocument');
const { Entity } = require('./EntityModel');



class Encounter extends ContentBaseDocument {
	constructor(){
		super();
		
		this.location = {
			type: Entity,
			required: false
		}

		this.round = {
			type: Number,
			required: true
		}
		
		// related to this.participants
		this.currentParticipantIndexInRound = {
			type: Number,
			required: true
		}

		this.participants = {
			type: [Initiative],
			required: true
		}

		this.playersCanView = {
			type: Boolean,
			required: true,
			default: false
		}

		this.playersCanSeeEnemies = {
			type: Boolean,
			required: true,
			default: false
		}
	}
}



module.exports = { Encounter }