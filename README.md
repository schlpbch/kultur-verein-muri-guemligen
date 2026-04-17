# Kulturverein Muri-Gümligen Website

Offizielle Website des Kulturvereins Muri-Gümligen. Diese Website präsentiert das kulturelle Programm, vergangene Veranstaltungen und Informationen über den Verein.

## Technologie-Stack

Dieses Projekt wurde mit modernen Web-Technologien entwickelt, um Performance und Benutzerfreundlichkeit zu gewährleisten:

- **[Astro](https://astro.build)**: Static Site Generator für höchste Performance.
- **[Tailwind CSS](https://tailwindcss.com)**: Utility-first CSS Framework für das Styling.
- **TypeScript**: Für typsicheren Code.

## Funktionen

- **Veranstaltungskalender**: Übersicht über kommende und vergangene Events.
- **Content Management**: Einfaches Verwalten von Events (nach Jahr organisiert in `src/content/events/YYYY/`) und Vorstandsmitgliedern über Collections (`src/content`).
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile.
- **SEO & Performance**: Schnelle Ladezeiten und optimierte Metadaten.
- **RSS Feed**: Automatisch generierter Feed für Veranstaltungen.
- **Barrierefreiheit & UX**: Dark Mode Unterstützung, ARIA Labels und tastaturbedienbare Navigation.
- **Structured Data**: JSON-LD Integration für bessere Suchmaschinenoptimierung (Events, Organization).
- **Netlify Forms**: Integriertes Kontaktformular für Netlify Hosting.

## Projektstruktur

```
src/
├── components/   # Wiederverwendbare UI-Komponenten
├── content/      # Inhalte (Events, Vorstandsmitglieder)
│   ├── events/        # Events organisiert nach Jahr (2026/, 2025/, etc.)
│   │   ├── 2026/      # Markdown-Dateien und Bilder für 2026
│   │   │   ├── images/ # Event-Bilder
│   │   │   └── *.md    # Event-Markdown-Dateien
│   │   └── ...
│   └── boardMembers/  # JSON Datei für Vorstandsmitglieder
├── layouts/      # Seiten-Layouts
├── pages/        # Routen der Anwendung (Home, Über uns, Kontakt, etc.)
└── styles/       # Globale Styles
tests/            # E2E Tests mit Playwright
```

## Testing

Das Projekt verwendet [Playwright](https://playwright.dev/) für End-to-End Testing.

### Tests ausführen

```bash
# Alle Tests ausführen
npx playwright test

# Tests mit UI ausführen (für Debugging)
npx playwright test --ui

# Einzelne Test-Datei ausführen
npx playwright test tests/theme-toggle.spec.ts
```

Die Tests decken folgende Bereiche ab:

- **E2E Navigation**: Funktionstests für Mobile Menü und Seitennavigation.
- **Theme Toggle**: Sicherstellung, dass der Dark/Light Mode funktioniert und beim Seitenwechsel erhalten bleibt.
- **RSS Feed**: Validierung des RSS Feeds (Struktur, valide XML, zukünftige Events).
- **JSON-LD**: Überprüfung der strukturierten Daten für SEO.

## Lokale Entwicklung

Voraussetzungen: Node.js und npm/pnpm.

1. **Repository klonen**

   ```bash
   git clone https://github.com/schlpbch/kultur-verein-muri-guemligen.git
   cd kultur-verein-muri-guemligen
   ```

2. **Abhängigkeiten installieren**

   ```bash
   npm install
   # oder
   pnpm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```
   Die Seite ist dann unter `http://localhost:4321` erreichbar.

## Build & Deployment

Um die statische Seite für die Produktion zu bauen:

```bash
npm run build
```

Die generierten Dateien befinden sich im `dist/` Ordner und können auf jedem statischen Webhoster (Netlify, Vercel, GitHub Pages, Hostpoint) deployed werden.

## Inhalte verwalten

### Neue Veranstaltung hinzufügen

Erstelle eine neue `.md` Datei in `src/content/events/YYYY/` (wobei YYYY das Jahr ist, z.B. `src/content/events/2026/`).

Format:

```markdown
---
title: 'Konzert Name'
subtitle: 'Optional: Untertitel'
date: 2026-05-20
location: 'Thoracker, Muri'
prices: [30, 38, 15]
cover: './images/event-bild.webp'
copyright: 'Fotograf/Quelle'
reservationURL: 'https://example.com/tickets' (optional)
---

Hier folgt der detaillierte Text zur Veranstaltung...
```

Bilder werden im Unterordner `src/content/events/YYYY/images/` gespeichert.

## Lizenz

Dieses Projekt ist unter der MIT Lizenz veröffentlicht.
