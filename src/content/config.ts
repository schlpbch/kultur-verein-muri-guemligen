import { defineCollection, z } from 'astro:content'
import { file } from 'astro/loaders'

const events = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.date(),
      location: z.string(),
      prices: z.array(z.number()),
      cover: image().optional(),
      copyright: z.string(),
      eventfrogUrl: z.string().optional(),
    }),
})

const boardMembers = defineCollection({
  loader: file('src/content/boardMembers/board-members.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      portrait: image(),
    }),
})

export const collections = { events, boardMembers }
