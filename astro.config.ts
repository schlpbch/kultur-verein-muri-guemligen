import { defineConfig } from 'astro/config'

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
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
