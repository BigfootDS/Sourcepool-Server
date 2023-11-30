const Condition = global.modelUtils.models.extendsCustomBaseDocument.Condition;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// SRD 5.1 CC page 358
	let srdConditions = [
		{
			name: "blinded",
			content: "A blinded creature can't see and automatically fails any ability check that requires sight.\nAttack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
		},
		{
			name: "charmed",
			content: "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.\nThe charmer has advantage on any ability check to interact socially with the creature."
		},
		{
			name: "exhaustion",
			content: "Some special abilities and environmental hazards, such as starvation and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An affect can give a creature one or more levels of exhaustion, as specified in the effect's description.\nIf an already exhausted creature suffers another effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect's description.\nA creature suffers the effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on ability checks.\nAn effect that removes exhaustion reduces its level as specified in the effect's description, with all exhaustion effects ending if a creature's exhaustion level is reduced below 1.\nFinishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink."
		},
		{
			name: "frightened",
			content: "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.\nThe creature can't willingly move closer to the source of its fear."
		},
		{
			name:"grappled",
			content:"A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.\nThe condition ends if the grappler is incapacitated (see the condition).\nThe	condition	also	ends	if	an	effect	removes	the grappled	creature	from	the	reach	of	the	grappler or	grappling	effect,	such	as	when	a	creature	is hurled	away	by	the	thunder-wave spell."
		},
		{
			name:"incapacitated",
			content:"An incapacitated creature can't take actions or reactions."
		},
		{
			name:"invisible",
			content:"An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves.\nAttack rolls against the creature have disadvantage, and the creature's attack rolls have advantage."
		},
		{
			name:"paralyzed",
			content:"A paralyzed creature is incapacitated (see the condition) and can't move or speak.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
		},
		{
			name:"petrified",
			content:"A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.\nThe creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.\nAttack rolls against the creature have advantage.\nThe creature automatically fails Strength and Dexterity saving throws.\nThe creature has resistance to all damage.\nThe creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
		},
		{
			name:"poisoned",
			content:"A poisoned creature has disadvantage on attack rolls and ability checks."
		},
		{
			name:"prone",
			content:"A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.\nThe creature has disadvantage on attack rolls.\nAn attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage."
		},
		{
			name:"restrained",
			content:"A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.\nAttack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.\nThe creature has disadvantage on Dexterity saving throws."
		},
		{
			name:"stunned",
			content:"A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage."
		},
		{
			name:"unconscious",
			content:"An unconscious creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.\nThe creature drops whatever it's holding and falls prone.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
		}
	];

	let newDataDocs = await Promise.all(srdConditions.map(async (condition) => {
		let newCondition = await Condition.create({
			tags: srdTags,
			descriptions: [
				await LocalizedContent.create({
					language: "en",
					name:condition.name,
					content:condition.content
				})
			],
			product: newDndProduct._id
		}).save();
		return newCondition;
	}));

	return newDataDocs;
}

module.exports = {createData};