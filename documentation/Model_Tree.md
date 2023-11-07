# Model Tree

This document outlines the models and how they depend on each other. 

This can help with data import/export code and other database-related functionality, as we need to know which models must be made first so that other models can reference their documents.

## 0. The Source model

The Source model is not used directly, but is the base class for models that we intend on using.

It contains these properties:

- description: An array of Lore subdocuments, it is required and must have at least one Lore subdocument in its array.
	- lore documents contain these properties:
		- language: a string representing the ISO-639-1 code of which language this lore subdocument is written in.
		- name: a required string providing a name of the parent document.
		- content: an optional string providing a brief description of the parent document.
- tags: An array of strings, it is not required.
- product: A reference to a Product document by its `_id` value, it is not required.

Documents that do not inherit from Source are not meant to be game data, such as Users and ServerConfigs. Some documents, such as Products, are game data and do not inherit from Source though - this may change in future.


## 1. Does not inherit from Source and does not require other models

These models do not inherit from the Source model and does not require any references to other models, so they can be created first.

1. ServerConfig
2. User
3. Product
	- Optionally requires:
		- Game


## 2. Does inherit from Source but does not require other models

1. Game
2. Ability
3. Condition
4. DamageType
5. Epoch
6. Feature
7. Item
8. Month

## 3. Does require models from Section 1 and/or 2

1. InGameDate
	- Does not inherit from Source
	- Does require:
		- Month
2. Campaign
	- Does require:
		- Game
		- User
3. Prop
	- Optionally requires:
		- Item
4. Skill
	- Does require:
		- Ability



## 4. Does require models from Section 2 and/or 3

1. InGameEvent
	- Does require:
		- InGameDate
2. Calendar
	- Does require:
		- Epoch
		- InGameDate
		- Month


## 5. Does require models from prior sections

1. Template
	- Optionally requires:
		- AbilityScore
			- Is a subdocument
			- Does require: 
				- Ability
		- CharacterSkill
			- Is a subdocument
			- Does require:
				- Skill
			- Optionally requires:
				- Ability
		- Condition
		- DamageMultiplier
			- Is a subdocument
			- Does require:
				- DamageType
		- CharacterFeature
			- Is a subdocument
			- Does require:
				- Feature
2. Character
	- Does require:
		- AbilityScore
			- Is a subdocument
			- Does require: 
				- Ability
	- Optionally requires:
		- User
		- Item
		- CharacterSkill
			- Is a subdocument
			- Does require:
				- Skill
			- Optionally requires:
				- Ability
		- Condition
		- DamageMultiplier
			- Is a subdocument
			- Does require:
				- DamageType
		- CharacterFeature
			- Is a subdocument
			- Does require:
				- Feature
 


## 6. Does require models from prior sections

1. Place
	- Optionally requires:
		- Character
		- Place
		- Prop

## 7. Does require models from prior sections

1. Encounter
	- Does require:
		- Initiative
			- Is a subdocument
			- Does require: 
				- Character
	- Optionally requires:
		- Place
2. Universe
	- Optionally requires:
		- Place
		- Calendar