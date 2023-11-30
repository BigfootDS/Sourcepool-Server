const DamageType = global.modelUtils.models.extendsCustomBaseDocument.DamageType;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let srdProduct = sharedData.product;

		// SRD 5.1 CC page 97
	let dataSet = [
		{
			name:"acid",
			content: "The corrosive spray of a black dragon's breath and the dissolving enzymes secreted by a black pudding deal acid damage."
		},
		{
			name:"bludgeoning",
			content:"Blunt force attacks -- hammers, falling, constriction, and the like -- deal bludgeoning damage."
		},
		{
			name: "cold",
			content:"The infernal chill radiating from an ice devil's spear and the frigid blast of a white dragon's breath deal cold damage."
		},
		{
			name: "fire",
			content:"Red dragons breathe fire, and many spells conjure flames to deal fire damage."
		},
		{
			name: "force",
			content:"Force is pure magical energy focused into a damaging form. Most effects that deal force damage are spells, including magic missile and spiritual weapon."
		},
		{
			name: "lightning",
			content:"A lightning bolt spell and a blue dragon's breath deal lightning damage."
		},
		{
			name: "necrotic",
			content:"Necrotic damage, dealt by certain undead and a spell such as chill touch, withers matter and even the soul."
		},
		{
			name: "piercing",
			content:"Puncturing and impaling attacks, including spears and monsters' bites, deal piercing damage."
		},
		{
			name: "poison",
			content:"Venomous stings and the toxic gas of a green dragon's breath deal poison damage."
		},
		{
			name: "psychic",
			content:"Mental abilities such as a mind flayer's psionic blast deal psychic damage."
		},
		{
			name: "radiant",
			content:"Radiant damage, dealt by a cleric's flame strike spell or an angel's smiting weapon, sears the flesh like fire and overloads the spirit with power."
		},
		{
			name: "slashing",
			content:"Swords, axes, and monsters' claws deal slashing damage."
		},
		{
			name: "thunder",
			content:"A concussive burst of sound, such as the effect of the thunderwave spell, deals thunder damage."
		},
	];

	let newDataDocs = await Promise.all(dataSet.map(async (dmgType) => {
		//console.log("Working through dmgType:\n" + JSON.stringify(dmgType,null,4));
		let newDmgType = await DamageType.create({
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:dmgType.name,
					content:dmgType.content
				})
			],
			product: srdProduct._id
		}).save();
		return newDmgType;
	}));

	return newDataDocs;
}

module.exports = {createData};