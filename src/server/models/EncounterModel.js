const { Initiative } = require('./InitiativeEmbeddedModel');
const { Place } = require('./PlaceModel');
const { Source } = require('./SourceModel');


/**
 * Model to track progression through an Encounter, whether it's combat or social does not matter.
 * This is really just for a human (eg. a DM/GM) to see which character currently needs to do things.
 * @date 11/2/2023 - 9:01:31 AM
 * @author BigfootDS
 *
 * @extends {Source}
 */
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