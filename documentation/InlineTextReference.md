# Inline Text Reference


## Inline Hoverable Preview

Some content benefits from letting users see a snippet or preview of another model, such as letting users see information about the condition that a spell will apply to its victim.

Syntax to enable this is as follows:

`[[HOVER:ModelName:NameValue:DisplayedText]]`

That would be inserted into the content of any relevant document, alongside its regular text. So for example:

```
"Most spells require the chanting of mystic words. The words themselves aren't the source of the spell's power; rather, the particular combination of sounds, with specific pitch and resonance, sets the threads of magic in motion. Thus, a character who is gagged or in an area of silence, such as one created by the [[HOVER:Spell:Silence:Silence]] spell, can't cast a spell with a verbal component."
```

The text content above would show a differently-styled chunk of text for the word "Silence", indicating that it is a hoverable preview and clickable link.

- The frontend client must perform logic to find that Silence spell, build the hoverable preview, and create an appropriate clickable link.
- If the frontend client cannot find the Silence spell, it should fall back to showing the `NameValue` as-is, with styling that indicates that it's _meant_ to be something more but the system cannot find appropriate data.

Yes, this is very much like D&D Beyond's system - it's extremely good UX! We should absolutely have that as part of Sourcepool too.

![A screenshot of D&D Beyond and how they render a spell's content, including the hoverable preview for a condition that the spell applies to its victim.](./assets/DNDBeyondHoverPreview_27Nov2023.png)

## Inline URL

Some content is not really suitable for a hoverable preview, but still worth referencing from the content. This is the stock-standard HTML hyperlink, but jazzed up so we can manage it appropriately in localized content strings.

Syntax to enable this is as follows:

`[[URL:ModelName:NameValue:DisplayedText]]`

That would be inserted into the content of any relevant document, alongside its regular text. So for example:

```
'Chaotic neutral (CN) creatures follow their whims, holding their personal freedom above all else. Many [[URL:HeroClass:Barbarian:barbarians]] and [[URL:HeroClass:Rogue:rogues]], and some [[URL:HeroClass:Bard:bards]], are chaotic neutral.'
```

If you need to show a result of a search, such as showing a list of all creatures with the "celestial" tag, then you could write an inline URL like so:

```
'Neutral good (NG) folk do the best they can to help others according to their needs. Many [[URL:SearchResults:Tag:celestial:celestials]], some [[URL:CreatureInstance:Cloud Giant:cloud giants]], and most [[URL:Species:Gnome:gnomes]] are neutral good.'
```

Yes, this makes the plaintext content / developer view look awful. But that's not the primary view of this content, so we can live with that.

## Editor's Notes

Sometimes, the content that a server admin is adding to their server just isn't right. 

When this happens, and if the content adder wants to preserve the content as-is, the server ends up with incorrect content within it. To help users and players work with incorrect, broken, or not-yet-implemented content, we can add Editor's Notes.

There are two types of editor notes:

### Editor's Hovernotes

A hovernote is similar to the Inline Hoverable Preview shown earlier on this page - it shows content without directing the user away from the page that they're on. 

This is good for quick, brief comments, such as:

```
'A monster with tremorsense can detect and pinpoint the origin of vibrations within a specific radius, provided that the monster and the source of the vibrations are in contact with the same ground or substance. Tremorsense can\'t be used to detect flying or incorporeal creatures. Many burrowing creatures, such as [[URL:CreatureInstance:Ankheg:ankhegs]] and [[NOTE:Hover:Umber Hulks are found in the Monster Manual, but not within the SRD. Dunno why WOTC would do this.:umber hulks]], have this special sense.'
```

### Editor's Footnotes

A footnote is the traditional, typical editor or author note that you'd see in ye olde textbooks and other non-fiction work. A little symbol or number appears next to the noted content, and then at the bottom of the page the note itself will be shown.

This is good for keeping all notes together in one place, and looks like:

```
'A monster with tremorsense can detect and pinpoint the origin of vibrations within a specific radius, provided that the monster and the source of the vibrations are in contact with the same ground or substance. Tremorsense can\'t be used to detect flying or incorporeal creatures. Many burrowing creatures, such as [[URL:CreatureInstance:Ankheg:ankhegs]] and [[NOTE:Foot:Umber Hulks are found in the Monster Manual, but not within the SRD. Dunno why WOTC would do this.:umber hulks]], have this special sense.'
```