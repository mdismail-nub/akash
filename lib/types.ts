export type WorkCategory = 'restaurants' | 'products' | 'campaigns' | 'reels'

export type MediaKind = 'photo' | 'video'

export interface WorkItem {
  /** Stable slug, also used as the lightbox key */
  readonly id: string
  readonly title: string
  readonly client: string
  readonly category: WorkCategory
  readonly kind: MediaKind
  /** Poster / still frame. For `kind: 'video'` this is the poster frame. */
  readonly image: string
  /** Descriptive alt text for the shot */
  readonly alt: string
  /** Optional MP4 source — drop real footage in and the lightbox plays it */
  readonly video?: string
  readonly year: string
  readonly summary: string
  readonly deliverables: readonly string[]
  /** Controls editorial grid emphasis */
  readonly span: 'tall' | 'wide' | 'square'
}

export interface Service {
  readonly id: string
  readonly title: string
  readonly icon: 'megaphone' | 'camera' | 'utensils' | 'film'
  readonly description: string
  readonly includes: readonly string[]
}

export interface Testimonial {
  readonly id: string
  readonly quote: string
  readonly name: string
  readonly title: string
  readonly brand: string
}

export interface Stat {
  readonly value: string
  readonly label: string
}

export interface ProcessStep {
  readonly step: string
  readonly title: string
  readonly description: string
}

export interface NavLink {
  readonly href: string
  readonly label: string
}

export interface Reel {
  readonly url: string
  readonly platform: 'tiktok' | 'instagram' | 'youtube'
  readonly thumbnail?: string
  readonly title?: string
}

export interface ReelWithMetadata extends Reel {
  readonly thumbnail: string
}

export const WORK_FILTERS = [
  { value: 'all', label: 'All Work' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'products', label: 'Products' },
  { value: 'campaigns', label: 'Brand Campaigns' },
  { value: 'reels', label: 'Reels' },
] as const

export type WorkFilter = (typeof WORK_FILTERS)[number]['value']
