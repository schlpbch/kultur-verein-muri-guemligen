export type BoardMember = {
  name: string
  role: string
  imageUrl: string
}

export type EventData = {
  title: string
  subtitle: string
  date: Date
  location: string
  prices: {
    name: string
    price: number
  }
  eventfrogUrl?: string
  cover: string
  copyright: string
}
