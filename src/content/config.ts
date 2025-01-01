import { defineCollection, z } from 'astro:content'

const events = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.date(),
      location: z.string(),
      prices: z.array(z.number()),
      copyright: z.string(),
    }),
})

export const collections = { events }
