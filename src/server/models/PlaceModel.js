const { Character } = require('./CharacterModel');
const { Prop } = require('./PropModel');
const { Source } = require('./SourceModel');


/**
 * A representation of a location. 
 * This can be as fine-grain as a specific encounter location, or as grandiose as an entire continent or even a planet. 
 * No real limits here - just group things together through this data structure.
 * @date 8/29/2023 - 10:59:06 AM
 * @author BigfootDS
 *
 * @class
 * @property {[Character]} characters Optional. Reference to any characters that exist in this place. Useful for grouping creatures into an encounter.
 * @property {[Place]} subPlaces Optional. Any places that exist within this place. Useful for grouping encounters by dungeon, or towns by country.
 * @property {[Prop]} props Optional. Any diegetic containers of items, treasure, and so on. For example, a treasure chest (Prop) that exists in this place, and also contains treasure.
 * @extends {Source}
 */
class Place extends Source {
	constructor(){
		super();

		this.characters = {
			type: [Character],
			required: false
		}

		this.subPlaces = {
			type: [Place],
			required: false
		}

		this.props = {
			type: [Prop],
			required: false
		}
	}

	static collectionName(){
		return 'places';
	}
}

module.exports = {
	Place
}