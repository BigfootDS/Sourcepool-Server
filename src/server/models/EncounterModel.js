const { Initiative } = require('./InitiativeEmbeddedModel');
const { Place } = require('./PlaceModel');
const { Source } = require('./SourceModel');


class Encounter extends Source{
	constructor(){
		super();

		this.notes = {
			type: [String],
			required: false,
			default: [""]
		};

		this.round = {
			type: Number,
			required: true,
			default: 1
		}

		this.turn = {
			type: Number,
			required: true,
			default: 1
		}

		this.playersCanAccess = {
			type: Boolean,
			required: true,
			default: false
		}

		this.playersCanSeeEnemies = {
			type: Boolean,
			required: true,
			default: false
		}

		this.place = {
			type: [Place],
			required: false
		}

		this.initiatives = {
			type: [Initiative],
			required: true
		}


	}

	static collectionName() {
		return 'encounters';
	}


}


module.exports = {
	Encounter
}