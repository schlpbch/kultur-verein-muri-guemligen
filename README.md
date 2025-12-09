# Kulturverein Muri-Gümligen Website

Offizielle Website des Kulturvereins Muri-Gümligen. Diese Website präsentiert das kulturelle Programm, vergangene Veranstaltungen und Informationen über den Verein.

## Technologie-Stack

Dieses Projekt wurde mit modernen Web-Technologien entwickelt, um Performance und Benutzerfreundlichkeit zu gewährleisten:

- **[Astro](https://astro.build)**: Static Site Generator für höchste Performance.
- **[Tailwind CSS](https://tailwindcss.com)**: Utility-first CSS Framework für das Styling.
- **TypeScript**: Für typsicheren Code.

## Funktionen

- **Veranstaltungskalender**: Übersicht über kommende und vergangene Events.
- **Content Management**: Einfaches Verwalten von Events und Vorstandsmitgliedern über Collections (`src/content`).
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
│   ├── events/        # Markdown/MDX Dateien für Events
│   └── boardMembers/  # JSON Dateien für Vorstandsmitglieder
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

Erstelle eine neue `.md` Datei in `src/content/events/`.

Format:

```markdown
---
title: 'Konzert Name'
date: 2024-05-20
time: '20:00'
location: 'Thoracker, Muri'
description: 'Kurze Beschreibung für die Vorschau.'
image: './images/event-bild.jpg'
---

Hier folgt der detaillierte Text zur Veranstaltung...
```

## Lizenz

Dieses Projekt ist unter der MIT Lizenz veröffentlicht.
