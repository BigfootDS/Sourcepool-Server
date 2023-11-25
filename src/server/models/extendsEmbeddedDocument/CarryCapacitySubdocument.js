const camo = require("camo");
const EmbeddedDocument = camo.EmbeddedDocument;



class CarryCapacity extends EmbeddedDocument {
	constructor(){
		super();

		this.calculatedWeightCapacity = {
			type: Number,
			required: true,
			default: 0
		}

		this.capacityBonus = {
			type: Number,
			required: true,
			default: 0
		}

		this.capacityOverride = {
			type: Number,
			required: false
		}
	}
}



module.exports = { CarryCapacity }