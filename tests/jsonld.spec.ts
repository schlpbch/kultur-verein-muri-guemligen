import { test, expect } from '@playwright/test'

test.describe('JSON-LD Structured Data', () => {
  test('should include Organization schema', async ({ page }) => {
    await page.goto('/')

    const jsonLdScripts = page.locator('script[type="application/ld+json"]')
    const count = await jsonLdScripts.count()
    expect(count).toBeGreaterThan(0)

    let foundOrganization = false
    for (let i = 0; i < count; i++) {
      const textContent = await jsonLdScripts.nth(i).textContent()
      if (textContent) {
        const json = JSON.parse(textContent)
        if (
          json['@type'] === 'PerformingArtsGroup' &&
          json.name === 'Kulturverein Muri-Gümligen'
        ) {
          foundOrganization = true

          // Verify basic fields
          expect(json.url).toBe('https://kulturverein-muri.ch')
          expect(json.address.addressLocality).toBe('Muri bei Bern')
        }
      }
    }
    expect(foundOrganization).toBeTruthy()
  })

  test('should include Event schemas for future events', async ({ page }) => {
    await page.goto('/')

    const jsonLdScripts = page.locator('script[type="application/ld+json"]')
    const count = await jsonLdScripts.count()

    // We expect events to be present, but strictly speaking there might be none in some states.
    // However, given the project has content, we can check for valid Event structure if any exist.
    // Or we expect at least one if we know there are future events.
    // Let's iterate and validate any found Events.

    let eventCount = 0
    for (let i = 0; i < count; i++) {
      const textContent = await jsonLdScripts.nth(i).textContent()
      if (textContent) {
        const json = JSON.parse(textContent)
        if (json['@type'] === 'Event') {
          eventCount++

          // Verify required Event fields for detailed rich results
          expect(json.name).toBeTruthy()
          expect(json.startDate).toBeTruthy()
          expect(json.location).toBeTruthy()
          expect(json.organizer).toBeTruthy()
          expect(json.organizer.name).toBe('Kulturverein Muri-Gümligen')
        }
      }
    }

    // Assuming the test environment has seed data (like the markdown files I saw earlier),
    // we should find events.
    expect(eventCount).toBeGreaterThan(0)
  })
})
