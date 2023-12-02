# D&D 5E SRD 5.1 Data Pack

> This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of 
the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The 
SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at 
https://creativecommons.org/licenses/by/4.0/legalcode.

# Models Used

## Extends CustomBaseDocument

- [x] Game
- [x] Product
- [x] Dice

## Extends ContentBaseDocument, smaller amounts of data 

- [x] ActionType
- [x] CastingComponent
- [x] SpellSchool
- [x] SpellLevel
- [x] AttackType
- [x] DamageType
- [x] Condition
- [x] Alignment
- [x] Ability
- [x] Skill
- [x] Currency
- [x] CurrencyExchange
- [x] Language
- [x] CharacterAdvancementTable
- [x] Sense
- [x] Size
- [ ] Species
- [x] SubcreatureCategory
- [x] Universe

## Extends ContentBaseDocument, does not use SRD-specific data

- [x] Day
- [x] Month
- [x] Epoch
- [x] Calendar

## Extends ContentBaseDocument, larger amounts of data 

- [ ] Spell 
- [ ] Item
- [ ] CreatureInstance
- [ ] HeroClass
- [ ] Feature

# Models Not Used

## Extends ContentBaseDocument, but NOT needed

- [x] Encounter
- [x] Lore (could be used to add in the SRD as readable content, useful for explanations of rules or whatever else?)
- [x] Place

## Extends CustomBaseDocument, but NOT needed

- [x] Campaign