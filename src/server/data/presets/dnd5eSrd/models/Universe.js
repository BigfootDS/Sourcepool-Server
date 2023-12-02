const Universe = global.modelUtils.models.extendsCustomBaseDocument.Universe;
const LocalizedContent = global.modelUtils.models.extendsEmbeddedDocument.LocalizedContent;


async function createData(sharedData){
	let srdTags = sharedData.tags;
	let newDndProduct = sharedData.product;

	// SRD5.1 pages 363-365
	let dataSet = [
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Material Plane',
					content: 'The Material Plane is the nexus where the philosophical and elemental forces that define the other planes collide in the jumbled existence of mortal life and mundane matter. All fantasy gaming worlds exist within the Material Plane, making it the starting point for most campaigns and adventures. The rest of the multiverse is defined in relation to the Material Plane.\nThe worlds of the Material Plane are infinitely diverse, for they reflect the creative imagination of the GMs who set their games there, as well as the players whose heroes adventure there. They include magic-wasted desert planets and island-dotted water worlds, worlds where magic combines with advanced technology and others trapped in an endless Stone Age, worlds where the gods walk and places they have abandoned.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Ethereal Plane',
					content: 'The Ethereal Plane is a misty, fog-bound dimension that is sometimes described as a great ocean. Its shores, called the Border Ethereal, overlap the Material Plane and the Inner Planes, so that every location on those planes has a corresponding location on the Ethereal Plane. Certain creatures can see into the Border Ethereal, and the [[HOVER:Spell:See Invisibility:see invisibility]] and [[HOVER:Spell:True Seeing:true seeing]] spell grant that ability. Some magical effects also extend from the Material Plane into the Border Ethereal, particularly effects that use force energy such as [[HOVER:Spell:Forcecage:forcecage]] and [[HOVER:Spell:Wall of Force:wall of force]]. The depths of the plane, the Deep Ethereal, are a region of swirling mists and colorful fogs.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Astral Plane',
					content: 'The Astral Plane is the realm of thought and dream, where visitors travel as disembodied souls to reach the planes of the divine and demonic. It is a great, silvery sea, the same above and below, with swirling whisps of white and gray streaking among motes of light resembling distant stars. Erratic whirlpools of color flicker in midair like spinning coins. Occasional bits of solid matter can be found here, but most of the Astral Plane is an endless, open domain.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Plane of Fire',
					content: 'The Inner Planes surround and enfold the Material Plane and its echoes, providing the raw elemental substance from which all the worlds were made. The four Elemental Planes - Air, Earth, Fire, and Water - form a ring around the Material Plane, suspended within the churning Elemental Chaos.\nAt their innermost edges, where they are closest to the Material Plane (in a conceptual if not a literal geographical sense), the four Elemental Planes resemble a world in the Material Plane. The four elements mingle together as they do in the Material Plane, forming land, sea, and sky. Farther from the Material Plane, though, the Elemental Planes are both alien and hostile. Here, the elements exist in their purest form - great expanses of solid earth, blazing fire, crystyal-clear water, and unsullied air. These regions are little-known, so when discussing the Plane of Fire, for example, a speaker usually means just the border region. At the farthest extents of the Inner Planes, the pure elements dissolve and bleed together into an unending tumult of clashing energies and colliding substance, the Elemental Chaos.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Plane of Water',
					content: 'The Inner Planes surround and enfold the Material Plane and its echoes, providing the raw elemental substance from which all the worlds were made. The four Elemental Planes - Air, Earth, Fire, and Water - form a ring around the Material Plane, suspended within the churning Elemental Chaos.\nAt their innermost edges, where they are closest to the Material Plane (in a conceptual if not a literal geographical sense), the four Elemental Planes resemble a world in the Material Plane. The four elements mingle together as they do in the Material Plane, forming land, sea, and sky. Farther from the Material Plane, though, the Elemental Planes are both alien and hostile. Here, the elements exist in their purest form - great expanses of solid earth, blazing fire, crystyal-clear water, and unsullied air. These regions are little-known, so when discussing the Plane of Fire, for example, a speaker usually means just the border region. At the farthest extents of the Inner Planes, the pure elements dissolve and bleed together into an unending tumult of clashing energies and colliding substance, the Elemental Chaos.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Plane of Earth',
					content: 'The Inner Planes surround and enfold the Material Plane and its echoes, providing the raw elemental substance from which all the worlds were made. The four Elemental Planes - Air, Earth, Fire, and Water - form a ring around the Material Plane, suspended within the churning Elemental Chaos.\nAt their innermost edges, where they are closest to the Material Plane (in a conceptual if not a literal geographical sense), the four Elemental Planes resemble a world in the Material Plane. The four elements mingle together as they do in the Material Plane, forming land, sea, and sky. Farther from the Material Plane, though, the Elemental Planes are both alien and hostile. Here, the elements exist in their purest form - great expanses of solid earth, blazing fire, crystyal-clear water, and unsullied air. These regions are little-known, so when discussing the Plane of Fire, for example, a speaker usually means just the border region. At the farthest extents of the Inner Planes, the pure elements dissolve and bleed together into an unending tumult of clashing energies and colliding substance, the Elemental Chaos.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},
		{
			// Inherited fields:
			product: newDndProduct._id,
			tags: srdTags,
			descriptions: [
				LocalizedContent.create({
					language: 'en',
					name:'Plane of Air',
					content: 'The Inner Planes surround and enfold the Material Plane and its echoes, providing the raw elemental substance from which all the worlds were made. The four Elemental Planes - Air, Earth, Fire, and Water - form a ring around the Material Plane, suspended within the churning Elemental Chaos.\nAt their innermost edges, where they are closest to the Material Plane (in a conceptual if not a literal geographical sense), the four Elemental Planes resemble a world in the Material Plane. The four elements mingle together as they do in the Material Plane, forming land, sea, and sky. Farther from the Material Plane, though, the Elemental Planes are both alien and hostile. Here, the elements exist in their purest form - great expanses of solid earth, blazing fire, crystyal-clear water, and unsullied air. These regions are little-known, so when discussing the Plane of Fire, for example, a speaker usually means just the border region. At the farthest extents of the Inner Planes, the pure elements dissolve and bleed together into an unending tumult of clashing energies and colliding substance, the Elemental Chaos.'
				})
			],
			// Model-specific fields:
			// None, for this particular model
		},

		// Of the Upper & Lower planes, Elysium is mentioned but not detailed beyond its alignment.
		// Feels kinda silly to include that - will leave out for now.
	];

	let newData = await Promise.all(dataSet.map(async (action) => {
		let newDoc = await Universe.create(action).save();
		return newDoc;
	}));

	return newData;
}

module.exports = {createData};