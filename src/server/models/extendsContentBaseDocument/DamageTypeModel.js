const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');

class DamageType extends ContentBaseDocument { 
	constructor(){
		super();

		
	}

	static getCollectionName() {
		return 'damageTypes';
	}
}

module.exports = {DamageType}