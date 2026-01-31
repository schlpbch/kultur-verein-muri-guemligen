# Content Editing Guide

This guide explains how to update and manage content on the Kulturverein Muri-Gümligen website.

## Table of Contents

- [Site Constants](#site-constants)
- [Events](#events)
- [Board Members](#board-members)

---

## Site Constants

Global site information is managed in `src/consts.ts`. These values are used for SEO, RSS feeds, and site metadata.

### File Location
`src/consts.ts`

### Fields

- **SITE_TITLE**: The name of the organization (used in page titles and RSS feed)
- **SITE_DESCRIPTION**: Meta description for SEO (appears in Google search results)
- **SITE_AUTHOR**: Object with `name` and `email` of the organization
- **SITE_URL**: Production URL of the website

### Example

```typescript
export const SITE_TITLE = 'Kulturverein Muri Gümligen'
export const SITE_DESCRIPTION =
  'Willkommen beim Kulturverein Muri Gümligen. Entdecke unser vielfältiges Kulturprogramm mit Konzerten, Theater und Events.'
export const SITE_AUTHOR = {
  name: 'Kulturverein Muri Gümligen',
  email: 'info@kulturverein-muri.ch',
}
export const SITE_URL = 'https://kulturverein-muri.ch'
```

### How to Edit

1. Open `src/consts.ts`
2. Update the desired fields
3. Save the file
4. Changes are reflected immediately in development mode

---

## Events

Events are stored as markdown files with frontmatter metadata. They are organized by year in `src/content/events/[YEAR]/`.

### File Structure

- **Location**: `src/content/events/[YEAR]/[slug].md`
- **Example**: `src/content/events/2026/abendmusik-dubach-ganz-kudryavtsev.md`
- **Images**: Stored in `src/content/events/[YEAR]/images/`

### Event Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Event title (artist name, event name) |
| `subtitle` | String | Yes | Event subtitle/category (e.g., "Klassik", "Theater", "Abendmusik") |
| `date` | ISO 8601 DateTime | Yes | Event date and time (format: `YYYY-MM-DDTHH:mm:ss`) |
| `location` | String | Yes | Venue name |
| `prices` | Array of Numbers | Yes | Price tiers (e.g., `[30, 38, 15]` for normal, full, and reduced prices) |
| `cover` | Image Path | No | Path to cover image (relative path like `./images/filename.webp`) |
| `copyright` | String | Yes | Photo/image copyright attribution |
| `reservationURL` | String | No | URL for ticket reservations (optional) |

### Example Event File

```markdown
---
title: Alexandre Dubach, Maxime Ganz, Anton Kudryavtsev
subtitle: Abendmusik
date: 2026-02-20T19:30:00
location: Reformierte Kirche Muri
prices: [30, 38, 15]
cover: './images/abendmusik-dubach-ganz-kudryavtsev.webp'
copyright: Anton Kudryavtsev
reservationURL: https://eventfrog.ch/de/p/klassik-opern/klassik/...
---

Dieser hochstehende Anlass vereint drei beeindruckende
Musikerpersönlichkeiten in einem Konzert.

Der preisgekrönte Geiger Alexandre Dubach begann seine internationale
Karriere schon in jungen Jahren...
```

### How to Add a New Event

1. **Create the markdown file** in the appropriate year directory:
   - File name should be descriptive and use lowercase with hyphens (slug format)
   - Example: `src/content/events/2026/my-event-name.md`

2. **Add frontmatter** at the top of the file between `---` markers:
   ```markdown
   ---
   title: Event Title
   subtitle: Event Category
   date: 2026-03-15T19:30:00
   location: Venue Name
   prices: [25, 30, 15]
   cover: './images/event-image.webp'
   copyright: Photo Photographer
   reservationURL: https://reservation-link.com
   ---
   ```

3. **Add event description** after the frontmatter:
   - Write in Markdown format
   - Can include formatting like **bold**, *italic*, and [links](url)
   - Use line breaks to separate paragraphs

4. **Add cover image** (optional):
   - Place image in `src/content/events/[YEAR]/images/`
   - Reference path in frontmatter: `./images/filename.webp`
   - Supported formats: `.webp`, `.jpg`, `.png`

### How to Edit an Event

1. Locate the event file in `src/content/events/[YEAR]/`
2. Edit frontmatter fields and/or description
3. Save the file

### How to Delete an Event

1. Delete the markdown file from `src/content/events/[YEAR]/`
2. (Optional) Delete associated images from `src/content/events/[YEAR]/images/` if no longer needed

### Date and Time Format

Use ISO 8601 format: `YYYY-MM-DDTHH:mm:ss`

**Examples:**
- `2026-02-20T19:30:00` - February 20, 2026 at 7:30 PM
- `2026-03-15T14:00:00` - March 15, 2026 at 2:00 PM
- `2026-01-10T18:00:00` - January 10, 2026 at 6:00 PM

### Price Array

The `prices` array typically contains three numbers representing different ticket categories:

- **Example**: `[30, 38, 15]`
  - 30 = Standard price
  - 38 = Full price
  - 15 = Reduced price (students, seniors, etc.)

You can use 2 or 3 prices depending on the event's ticket structure.

---

## Board Members

Board member information is stored as JSON in `src/content/boardMembers/board-members.json`.

### File Location
`src/content/boardMembers/board-members.json`

### Board Member Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Number | Yes | Unique identifier (sequential: 0, 1, 2, ...) |
| `name` | String | Yes | Full name |
| `role` | String | Yes | Position/role (can use `\n` for line breaks) |
| `portrait` | Image Path | Yes | Path to portrait image (e.g., `./Portrait-Name.png`) |

### Example Board Member Entry

```json
{
  "id": 0,
  "name": "Katharina Stampfli",
  "role": "Präsidentin, Public Relations",
  "portrait": "./Katharina-Stampfli.png"
}
```

### Example with Role Line Break

```json
{
  "id": 1,
  "name": "Anna-Lisa Kirchhofer",
  "role": "Vizepräsidentin\nRessort Klassik",
  "portrait": "./Anna-Lisa-Kirchhofer.png"
}
```

### How to Add a Board Member

1. Open `src/content/boardMembers/board-members.json`
2. Add a new object to the array with the next sequential ID:
   ```json
   {
     "id": 9,
     "name": "New Member Name",
     "role": "Position/Role",
     "portrait": "./New-Member-Name.png"
   }
   ```
3. Make sure to add a comma after the previous entry if needed
4. Upload the portrait image to `src/content/boardMembers/` with the same filename as referenced

### How to Edit a Board Member

1. Open `src/content/boardMembers/board-members.json`
2. Update the relevant fields (name, role, or portrait path)
3. Save the file

### How to Remove a Board Member

1. Open `src/content/boardMembers/board-members.json`
2. Delete the entire object entry
3. Ensure valid JSON formatting (proper commas between remaining entries)
4. Save the file

### Portrait Images

- **Location**: `src/content/boardMembers/`
- **Format**: PNG recommended (e.g., `Katharina-Stampfli.png`)
- **Naming**: Use the member's name in the filename for clarity
- **Size**: Recommended minimum 400x400px for good quality

---

## Testing Your Changes

After editing content, you can preview changes locally:

```bash
pnpm dev
```

Then visit `http://localhost:4321` in your browser.

### Build for Production

```bash
pnpm build
```

This creates the production-ready site in the `dist/` folder.

---

## Tips & Best Practices

1. **Filenames**: Use descriptive, lowercase names with hyphens (not spaces or underscores)
2. **Dates**: Always use the ISO 8601 format for event dates
3. **Images**: Use `.webp` format for events for better performance
4. **Descriptions**: Keep event descriptions clear and informative; markdown formatting helps readability
5. **JSON Format**: Be careful with JSON syntax—missing commas or brackets will cause errors
6. **Copyright**: Always attribute photography with the `copyright` field
7. **Prices**: Keep price structure consistent across events for clarity

---

## Troubleshooting

### Event not appearing on the website
- Check that the event date is in the future (past events appear on the "Past Events" page)
- Verify the date format is correct: `YYYY-MM-DDTHH:mm:ss`
- Ensure the markdown file is in the correct year directory

### Image not showing
- Check the image path is relative and starts with `./images/`
- Verify the image file exists in `src/content/events/[YEAR]/images/`
- Check the filename spelling matches exactly

### JSON error for board members
- Ensure all strings are in double quotes
- Check for missing commas between array entries
- Validate using a JSON linter if unsure

---

For additional help with the website architecture, see `CLAUDE.md`.
