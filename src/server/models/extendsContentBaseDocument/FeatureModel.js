const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');

class Feature extends ContentBaseDocument { 
	constructor(){
		super();

		
	}

	static getCollectionName() {
		return 'features';
	}
}

module.exports = {Feature}