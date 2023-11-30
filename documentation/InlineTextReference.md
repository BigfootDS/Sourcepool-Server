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