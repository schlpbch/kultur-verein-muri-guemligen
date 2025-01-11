import { defineCollection, z } from 'astro:content'

const events = defineCollection({
  type: 'content',
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

export const collections = { events }
