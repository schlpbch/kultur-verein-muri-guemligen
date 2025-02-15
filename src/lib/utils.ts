import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function filterPastEvents(events) {
  return events.filter((event) => {
    return new Date(event.data.date) < new Date()
  })
}

export async function filterFutureEvents(events) {
  return events.filter((event) => {
    return new Date(event.data.date) >= new Date()
  })
}

export async function sortEventsByDate(events) {
  return events.sort((a, b) => {
    return new Date(a.data.date) - new Date(b.data.date)
  })
}
