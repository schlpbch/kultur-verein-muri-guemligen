import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { CollectionEntry } from 'astro:content'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function filterPastEvents(events: CollectionEntry<'events'>[]) {
  return events.filter((event) => {
    return new Date(event.data.date) < new Date()
  })
}

export async function filterFutureEvents(events: CollectionEntry<'events'>[]) {
  return events.filter((event) => {
    return new Date(event.data.date) >= new Date()
  })
}

export async function sortEventsByDate(events: CollectionEntry<'events'>[]) {
  return events.sort((a, b) => {
    return new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
  })
}

export async function invertSortEventsByDate(
  events: CollectionEntry<'events'>[],
) {
  return events.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}
