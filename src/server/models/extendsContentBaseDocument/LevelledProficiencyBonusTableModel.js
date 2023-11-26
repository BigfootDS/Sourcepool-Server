const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');



class LevelledProficiencyBonusTable extends ContentBaseDocument {
	constructor(){
		super();
		
		this.values = {
			type: [Number],
			required: true,
			default: [
				2,2,2,2,
				3,3,3,3,
				4,4,4,4,
				5,5,5,5,
				6,6,6,6
			]
		}
		
	}
}



module.exports = { LevelledProficiencyBonusTable }