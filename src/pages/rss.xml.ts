import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { filterFutureEvents, sortEventsByDate } from '@lib/utils'

function getImageMimeType(src: string): string {
  const ext = src.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'webp':
      return 'image/webp'
    case 'png':
      return 'image/png'
    case 'gif':
      return 'image/gif'
    case 'svg':
      return 'image/svg+xml'
    default:
      return 'image/jpeg'
  }
}

export async function GET(context: APIContext) {
  const events = await getCollection('events')
  const futureEvents = await filterFutureEvents(events)
  const sortedEvents = await sortEventsByDate(futureEvents)

  const siteUrl = 'https://kulturverein-muri.ch'

  return rss({
    title: 'Kulturverein Muri Gümligen - Veranstaltungen',
    description: 'Kommende Veranstaltungen des Kulturvereins Muri Gümligen',
    site: context.site ?? siteUrl,
    items: sortedEvents.map((event) => ({
      title: event.data.title,
      description: event.data.subtitle,
      pubDate: event.data.date,
      link: `${siteUrl}/#${encodeURIComponent(event.data.title)}`,
      enclosure: event.data.cover
        ? {
            url: `${siteUrl}${event.data.cover.src}`,
            type: getImageMimeType(event.data.cover.src),
            length: 0,
          }
        : undefined,
    })),
  })
}
