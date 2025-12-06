import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config

export default defineConfig({
  site: process.env.CI
    ? 'https://kulturverein-muri.ch/'
    : 'http://localhost:4321',
  redirects: {
    '/mitgliedschaft': '/contact',
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
