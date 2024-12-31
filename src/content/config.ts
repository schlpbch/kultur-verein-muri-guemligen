import { defineCollection, z } from 'astro:content'

const events = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      date: z.date(),
    }),
})

export const collections = { events }
