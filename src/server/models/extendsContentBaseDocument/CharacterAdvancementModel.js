const { ContentBaseDocument } = require('../extendsCustomBaseDocument/ContentBaseDocument');
const { CaTable } = require('../extendsEmbeddedDocument/CaTableSubdocument');



class CharacterAdvancement extends ContentBaseDocument {
	constructor(){
		super();
		
		this.values = {
			type: [CaTable],
			required: true,
			default: [
				CaTable.create({requiredExp: 0, levelNum: 1, proficiencyBonus: 2}),
				CaTable.create({requiredExp: 300, levelNum: 2, proficiencyBonus: 2}),
				CaTable.create({requiredExp: 900, levelNum: 3, proficiencyBonus: 2}),
				CaTable.create({requiredExp: 2700, levelNum: 4, proficiencyBonus: 2}),
				CaTable.create({requiredExp: 6500, levelNum: 5, proficiencyBonus: 3}),
				CaTable.create({requiredExp: 14000, levelNum: 6, proficiencyBonus: 3}),
				CaTable.create({requiredExp: 23000, levelNum: 7, proficiencyBonus: 3}),
				CaTable.create({requiredExp: 34000, levelNum: 8, proficiencyBonus: 3}),
				CaTable.create({requiredExp: 48000, levelNum: 9, proficiencyBonus: 4}),
				CaTable.create({requiredExp: 64000, levelNum: 10, proficiencyBonus: 4}),
				CaTable.create({requiredExp: 85000, levelNum: 11, proficiencyBonus: 4}),
				CaTable.create({requiredExp: 100000, levelNum: 12, proficiencyBonus: 4}),
				CaTable.create({requiredExp: 120000, levelNum: 13, proficiencyBonus: 5}),
				CaTable.create({requiredExp: 140000, levelNum: 14, proficiencyBonus: 5}),
				CaTable.create({requiredExp: 165000, levelNum: 15, proficiencyBonus: 5}),
				CaTable.create({requiredExp: 195000, levelNum: 16, proficiencyBonus: 5}),
				CaTable.create({requiredExp: 225000, levelNum: 17, proficiencyBonus: 6}),
				CaTable.create({requiredExp: 265000, levelNum: 18, proficiencyBonus: 6}),
				CaTable.create({requiredExp: 305000, levelNum: 19, proficiencyBonus: 6}),
				CaTable.create({requiredExp: 355000, levelNum: 20, proficiencyBonus: 6}),
			]
		}
		
	}
}



module.exports = { CharacterAdvancement }