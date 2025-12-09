# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for Kulturverein Muri-Gümligen (Cultural Association Muri-Gümligen), built with Astro and Tailwind CSS v4. The site manages and displays cultural events (concerts, theater, etc.) for the local community in Muri bei Bern, Switzerland.

## Development Commands

### Essential Commands

- `pnpm dev` - Start development server (runs on http://localhost:4321)
- `pnpm build` - Build for production (outputs to `dist/`)
- `pnpm preview` - Preview production build locally
- `pnpm format` - Format code with Prettier (uses cache)

### Testing

- `pnpm test` - Run Playwright end-to-end tests (configured in playwright.config.ts)
- `pnpm test:ui` - Run Playwright tests in UI mode (useful for debugging)
- Playwright is configured to test on Desktop Chrome, Desktop Firefox, and Mobile Chrome (Pixel 5)
- Tests automatically start dev server before running
- Test suites include:
  - `tests/e2e.spec.ts` - End-to-end tests for all pages and user flows
  - `tests/jsonld.spec.ts` - Schema.org JSON-LD structured data validation
  - `tests/rss.spec.ts` - RSS feed validation

## Architecture

### Site Constants

Global site configuration is centralized in `src/consts.ts`:

- `SITE_TITLE` - Site name
- `SITE_DESCRIPTION` - Meta description
- `SITE_AUTHOR` - Author name and email
- `SITE_URL` - Production site URL

These constants are used across the site for SEO, RSS feeds, and metadata.

### Content Management

Events are managed through Astro's content collections system:

- Event data is stored in `src/content/events/*.md` as markdown files with frontmatter
- Event images are co-located with markdown files in the same directory
- Schema defined in `src/content/config.ts` with fields: title, subtitle, date, location, prices (array of numbers), cover (image), copyright, reservationURL (optional)
- Board members data is stored as JSON in `src/content/boardMembers/board-members.json` with a JSON loader
- RSS feed is generated for events using @astrojs/rss

### Event Display Logic

- Events are filtered and sorted using utility functions in `src/lib/utils.ts`
- `filterFutureEvents()` - Shows events with date >= today
- `filterPastEvents()` - Shows events with date < today
- `sortEventsByDate()` - Sorts events chronologically (ascending)
- `invertSortEventsByDate()` - Sorts events in reverse chronological order (descending)
- Event cards are rendered using the `EventCard.astro` component

### Styling and Design

The project follows the KuVe (Kulturverein) brand guidelines documented in `StyleGuide.md`:

- Primary colors: Yellow (#feca33), Light Yellow (#fff4dd), Text Yellow (#fbba00), Red (#e43312)
- Typography: Helvetica Neue for print, Inter for web
- Uses Tailwind CSS v4 (via Vite plugin) for styling
- Custom fonts loaded via `src/styles/fonts.css`

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

- `@assets/*` → `src/assets/*`
- `@components/*` → `src/components/*`
- `@content/*` → `src/content/*`
- `@layouts/*` → `src/layouts/*`
- `@lib/*` → `src/lib/*`
- `@pages/*` → `src/pages/*`
- `@styles/*` → `src/styles/*`

### UI Components

- All components are built as native Astro components (`.astro` files)
- Main UI components are in `src/components/`:
  - `Badge.astro`, `Button.astro` - Interactive elements
  - `card/*.astro` - Card components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  - `HeroSection.astro` - Homepage hero with title, subtitle, CTA button, and image
  - `EventCard.astro` - Event display card
  - `ThemeToggle.astro` - Dark/light mode toggle
  - `Header.astro`, `Footer.astro` - Layout components
  - `SchemaJSONLD.astro` - Structured data for SEO
- The `cn()` utility in `src/lib/utils.ts` is used for conditional class merging

### Deployment

- Deployed to Netlify (config in `netlify.toml`)
- Build command: `pnpm build`
- Publish directory: `dist`
- Site URL: https://kulturverein-muri.ch/ (production)

### Configuration

- `astro.config.ts` - Main Astro config with sitemap integration
- Redirect configured: `/mitgliedschaft` → `/contact`
- Site URL changes based on environment (CI vs local)
- Tailwind CSS v4 is integrated via Vite plugin (`@tailwindcss/vite`), not as an Astro integration
- `src/consts.ts` - Centralized site constants for title, description, author, and URL

### Code Formatting

Prettier is configured with:

- Single quotes
- No semicolons
- 2-space indentation
- Plugins for Astro and Tailwind CSS class sorting
- Uses caching for faster runs

### Key Features

- **Dark/Light Mode**: Theme toggle with persistence across view transitions
- **SEO Optimization**: Schema.org JSON-LD structured data for events and organization
- **RSS Feed**: Auto-generated feed for events at `/rss.xml`
- **Responsive Design**: Mobile-first design with optimized layouts for all screen sizes
- **Image Optimization**: Optimized images using Astro's built-in `Image` component with Sharp
- **View Transitions**: Smooth page transitions using Astro's View Transitions API
- **Accessibility**: WCAG-compliant color contrast and semantic HTML

## Key Pages

- `src/pages/index.astro` - Homepage with hero section, program section, and sponsors
- `src/pages/about.astro` - About the association with board members
- `src/pages/contact.astro` - Contact form and newsletter subscription
- `src/pages/past-events.astro` - Archive of past events
- `src/pages/privacy-policy.astro` - Privacy policy
- `src/pages/imprint.astro` - Legal imprint
- `src/pages/404.astro` - Custom 404 error page
- `src/pages/rss.xml.ts` - RSS feed for events

## Package Manager

This project uses pnpm (v10.24.0). Always use `pnpm` commands, not npm or yarn.
