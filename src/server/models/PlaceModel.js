const { Character } = require('./CharacterModel');
const { Prop } = require('./PropModel');
const { Source } = require('./SourceModel');


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