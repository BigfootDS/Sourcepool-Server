const { Game } = require('./GameModel');
const { Source } = require('./SourceModel');
const { Universe } = require('./UniverseModel');
const { User } = require('./UserModel');



/**
 * Description placeholder
 * @date 8/30/2023 - 5:28:07 PM
 * @author BigfootDS
 *
 * @class
 * @property {Game} game Required. The specific ruleset that this campaign is adhering to. For example, "SRD 5.1".
 * @property {[User]} managers Required, at least one User. The humans with more-than-regular permissions over the campaign.
 * @property {[User]} players Optional. The humans with regular permissions within the campaign.
 * @extends {Source}
 */
class Campaign extends Source{
	constructor(){
		super();
		
		this.game = {
			type: Game,
			unique: false,
			required: true
		};



		this.managers = {
			type: [User],
			required: true
		}

		this.players = {
			type: [User],
			required: false
		}



	}

	static collectionName() {
		return 'campaigns';
	}


}


module.exports = {
	Campaign
}