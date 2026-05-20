export type Category = 'commerce' | 'transport' | 'people' | 'building'

export interface HotspotSource {
  book: string
  author: string
  volume: string
  quote: string
}

export interface Hotspot {
  id: number
  category: Category
  title: string
  subtitle: string
  position: { x: number; y: number }
  description: string
  source: HotspotSource
}

export interface CategoryMeta {
  label: string
  bg: string
  text: string
  ring: string
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  commerce: { label: '商业', bg: 'bg-cat-commerce', text: 'text-cat-commerce', ring: 'ring-cat-commerce' },
  transport: { label: '交通', bg: 'bg-cat-transport', text: 'text-cat-transport', ring: 'ring-cat-transport' },
  people: { label: '人物', bg: 'bg-cat-people', text: 'text-cat-people', ring: 'ring-cat-people' },
  building: { label: '建筑', bg: 'bg-cat-building', text: 'text-cat-building', ring: 'ring-cat-building' },
}

export const CATEGORIES: Category[] = ['commerce', 'transport', 'people', 'building']
