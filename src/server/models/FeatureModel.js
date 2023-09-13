const { Source } = require('./SourceModel');



/**
 * Standalone entry of a given feature, feat, mechanic, or other special modular thing that characters could have.
 * This will be expanded as the app is developed, as mechanical things are mostly tied to features.
 * @date 8/31/2023 - 11:18:04 AM
 * @author BigfootDS
 *
 * @class
 * 
 * @extends {Source}
 */
class Feature extends Source {
	constructor(){
		super();


	}
}

module.exports = {
	Feature
}