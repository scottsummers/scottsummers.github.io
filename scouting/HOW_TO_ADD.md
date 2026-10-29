# How to add a scouting resource

The page at <https://scottsummers.github.io/scouting/> is built from one data file,
[`resources.json`](resources.json). Adding a resource means:

1. Put the file in `scouting/files/` (skip this for Google Slides and web links).
2. Add one entry to the `resources` list in `scouting/resources.json`.
3. Commit and push to `main`. GitHub Pages republishes in a minute or two.

A category with no entries shows "More coming soon" automatically, so there is
nothing to remove when a category is empty.

## Supported types

| `type`   | What it is                  | Where it lives                              | Button on the card |
|----------|-----------------------------|---------------------------------------------|--------------------|
| `pdf`    | PDF document                | `scouting/files/…pdf`                       | Open PDF           |
| `pptx`   | PowerPoint deck             | `scouting/files/…pptx`                      | Download PPTX      |
| `slides` | Google Slides deck          | A share link (`url`)                         | Open slides        |
| `link`   | Any other web page          | A link (`url`)                               | Visit link         |

**Add a PDF copy of every PPTX.** Many phones, and most school Chromebooks, can't
open a `.pptx`. In PowerPoint use *File → Export → PDF* (Keynote and Google Slides
have the same option), save it next to the deck, and set `"pdf"` on the entry. The
card then shows **Open PDF** first and **Download PPTX** second.

For Google Slides, set sharing to **Anyone with the link → Viewer** before you add
it, or scouts will hit a sign-in wall. You can also add a `"pdf"` copy for those.

## Categories

Use one of these `category` ids:

| id              | Shows as            |
|-----------------|---------------------|
| `briefs`        | Briefs              |
| `presentations` | Presentations       |
| `handouts`      | Handouts & Guides   |
| `skills`        | Skills / How-tos    |
| `links`         | Links               |

To add a new category, add an object to `categories` with an `id`, `name` and `blurb`.

## Entry fields

```json
{
  "title": "Knots you should know",
  "description": "Six knots with uses and step-by-step pictures.",
  "category": "skills",
  "type": "pptx",
  "file": "files/knots-you-should-know.pptx",
  "pdf": "files/knots-you-should-know.pdf",
  "size": "4.2 MB",
  "updated": "2026-11",
  "tags": ["knots", "rope"]
}
```

| Field         | Required | Notes |
|---------------|----------|-------|
| `title`       | yes      | Card heading. |
| `description` | yes      | One or two sentences. |
| `category`    | yes      | One of the ids above. |
| `type`        | yes      | `pdf`, `pptx`, `slides` or `link`. |
| `file`        | for `pdf` / `pptx` | Path relative to `scouting/`, e.g. `files/name.pdf`. |
| `url`         | for `slides` / `link` | Full `https://` link. |
| `pdf`         | recommended for `pptx` / `slides` | PDF copy, e.g. `files/name.pdf`. |
| `size`, `updated` | no   | Shown small on the card, e.g. `"2.1 MB"`, `"2026-11"`. |
| `tags`        | no       | Extra words the search box will match. |

The example above is only an illustration; it is not on the site.

Remember the commas between entries, and check the JSON is valid before pushing
(`python3 -m json.tool scouting/resources.json`). If the file is broken, the page
says "The resource list could not be loaded".

File names: lowercase, hyphens, no spaces (`patrol-method-brief.pdf`).

## Size limits

- **Keep each file under about 20 MB.** Phones on cell data will thank you.
  Compress big PDFs (*Reduce File Size* in Preview or Acrobat) and shrink photos in decks
  (*Compress Pictures* in PowerPoint).
- Uploading through the github.com web page is limited to **25 MB per file**.
- Git pushes warn above **50 MB** and reject anything over **100 MB**.
- The whole Pages site should stay under **1 GB**. For big videos or decks, put them in
  Google Drive or Slides and add a `link` or `slides` entry instead.

## Keep it safe for a public site

Everything here is public and the audience includes minors, so before you post:

- No scout names, photos, ages, phone numbers or emails.
- No troop number, meeting place, addresses, schedules or trip dates.
- No official logos or trademarked artwork.
- Check document properties: PowerPoint and PDFs often carry the author's name in
  their metadata (*File → Info* / *Inspect Document* in PowerPoint).
