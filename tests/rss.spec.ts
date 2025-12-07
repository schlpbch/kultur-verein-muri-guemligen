import { test, expect } from '@playwright/test'

test.describe('RSS Feed', () => {
  test('should return valid RSS XML', async ({ request }) => {
    const response = await request.get('/rss.xml')

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/xml')

    const body = await response.text()

    // Validate RSS structure
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(body).toContain('<rss version="2.0">')
    expect(body).toContain('<channel>')
    expect(body).toContain(
      '<title>Kulturverein Muri Gümligen - Veranstaltungen</title>',
    )
    expect(body).toContain('</channel>')
    expect(body).toContain('</rss>')
  })

  test('should contain required channel elements', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const body = await response.text()

    // Required RSS channel elements
    expect(body).toContain('<title>')
    expect(body).toContain('<description>')
    expect(body).toContain('<link>')
  })

  test('should contain event items with required fields', async ({
    request,
  }) => {
    const response = await request.get('/rss.xml')
    const body = await response.text()

    // Check that items exist
    expect(body).toContain('<item>')

    // Each item should have required fields
    expect(body).toMatch(
      /<item>[\s\S]*?<title>[\s\S]*?<\/title>[\s\S]*?<\/item>/,
    )
    expect(body).toMatch(/<item>[\s\S]*?<link>[\s\S]*?<\/link>[\s\S]*?<\/item>/)
    expect(body).toMatch(
      /<item>[\s\S]*?<description>[\s\S]*?<\/description>[\s\S]*?<\/item>/,
    )
    expect(body).toMatch(
      /<item>[\s\S]*?<pubDate>[\s\S]*?<\/pubDate>[\s\S]*?<\/item>/,
    )
  })

  test('should have absolute URLs for event links', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const body = await response.text()

    // Links should be absolute URLs to kulturverein-muri.ch
    expect(body).toMatch(
      /<link>https:\/\/kulturverein-muri\.ch\/#[\s\S]*?<\/link>/,
    )
  })

  test('should include image enclosures', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const body = await response.text()

    // Check for enclosure elements with image URLs
    expect(body).toContain('<enclosure')
    // In dev mode, URLs use @fs paths; in production, they use /_astro paths
    expect(body).toMatch(/url="https:\/\/kulturverein-muri\.ch\//)
    expect(body).toMatch(/type="image\/(jpeg|webp|png)"/)
  })

  test('should only contain future events', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const body = await response.text()

    // Extract all pubDate values
    const pubDateMatches = body.matchAll(/<pubDate>(.*?)<\/pubDate>/g)
    const today = new Date()

    for (const match of pubDateMatches) {
      const eventDate = new Date(match[1])
      expect(eventDate.getTime()).toBeGreaterThanOrEqual(
        today.setHours(0, 0, 0, 0),
      )
    }
  })

  test('should have RSS auto-discovery link in homepage', async ({
    request,
  }) => {
    const response = await request.get('/')
    const body = await response.text()

    // Check for RSS auto-discovery link in HTML
    expect(body).toContain('type="application/rss+xml"')
    expect(body).toContain('href="/rss.xml"')
  })

  test('should have RSS link in footer', async ({ request }) => {
    const response = await request.get('/')
    const body = await response.text()

    // Check for RSS link in footer
    expect(body).toContain('href="/rss.xml"')
    expect(body).toContain('RSS Feed')
  })
})
