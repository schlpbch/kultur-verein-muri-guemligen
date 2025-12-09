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

import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../consts'

export async function GET(context: APIContext) {
  const events = await getCollection('events')
  const futureEvents = await filterFutureEvents(events)
  const sortedEvents = await sortEventsByDate(futureEvents)

  return rss({
    title: `${SITE_TITLE} - Veranstaltungen`,
    description: SITE_DESCRIPTION,
    site: context.site ?? SITE_URL,
    items: sortedEvents.map((event) => ({
      title: event.data.title,
      description: event.data.subtitle,
      pubDate: event.data.date,
      link: `${SITE_URL}/#${encodeURIComponent(event.data.title)}`,
      enclosure: event.data.cover
        ? {
            url: `${SITE_URL}${event.data.cover.src}`,
            type: getImageMimeType(event.data.cover.src),
            length: 0,
          }
        : undefined,
    })),
  })
}
