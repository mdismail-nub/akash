import type {
  NavLink,
  ProcessStep,
  Service,
  Stat,
  Testimonial,
  WorkItem,
} from '@/lib/types'

export const SITE = {
  name: 'Akash',
  role: 'Content Creator & Brand Promoter',
  tagline: 'Cinematography · Product Photography',
  url: 'https://akash-portfolio.vercel.app',
  description:
    'Akash is a content creator and brand promoter specialising in cinematography and product photography. 200+ brands and restaurants in two years.',
  email: 'ajakash594@gmail.com',
  location: 'Bengaluru, India — available worldwide',
  social: {
    instagram: 'https://www.instagram.com/kakashi_is_eating',
    tiktok: 'https://www.tiktok.com/@kakashi_is_eating',
    youtube: 'https://youtube.com/@kakashiiseating',
    facebook: 'https://www.facebook.com/share/1bK7JmEGew/',
    facebookProfile: 'https://www.facebook.com/share/1NhCP9LLVD/',
  },
} as const

export const NAV_LINKS: readonly NavLink[] = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

/** Hero background rotation — cross-fades between these frames */
export const HERO_MEDIA = [
  {
    src: '/hero-restaurant.png',
    alt: 'Warm, moody interior of an upscale restaurant lit by amber pendant lights',
  },
  {
    src: '/hero-chef.png',
    alt: "Close-up of a chef's hands plating a fine dining dish with tweezers as steam rises",
  },
  {
    src: '/hero-product.png',
    alt: 'Amber glass bottle on a travertine pedestal under dramatic hard side light',
  },
] as const

export const BRANDS = [
  'Saffron & Sage',
  'Nordwell',
  'Hearth House',
  'Lumen Studio',
  'The Copper Spoon',
  'Verano Coffee',
  'Atlas Provisions',
  'Marigold Kitchen',
  'Terra Roasters',
  'Bluefin Table',
] as const

export const STATS: readonly Stat[] = [
  { value: '200+', label: 'Brands & Restaurants' },
  { value: '2+', label: 'Years Creating' },
  { value: '500+', label: 'Deliverables Shipped' },
  { value: '50M+', label: 'Views Generated' },
]

export const SERVICES: readonly Service[] = [
  {
    id: 'brand-promotion',
    title: 'Brand Promotion Content',
    icon: 'megaphone',
    description:
      'End-to-end promotional content built to actually move product — concepted around your offer, not around a trend I saw last week.',
    includes: [
      'Creative concept & scripting',
      'Full-day shoot with lighting',
      'Platform-native edits',
      'Usage rights for paid ads',
    ],
  },
  {
    id: 'product-photography',
    title: 'Product Photography',
    icon: 'camera',
    description:
      'Clean, deliberate studio and lifestyle stills that make a product look worth every rupee of its price tag.',
    includes: [
      'Studio & lifestyle setups',
      'Retouching & colour grading',
      'E-commerce & marketplace crops',
      'Flat-lay and hero angles',
    ],
  },
  {
    id: 'restaurant-content',
    title: 'Restaurant & F&B Content',
    icon: 'utensils',
    description:
      'Food that reads as delicious on a 6-inch screen. Menu shoots, ambience films and the dish-hero reels that fill tables on a Tuesday.',
    includes: [
      'Full menu photography',
      'Ambience & interior films',
      'Chef and story features',
      'Delivery-app ready assets',
    ],
  },
  {
    id: 'cinematography',
    title: 'Cinematography & Reels',
    icon: 'film',
    description:
      'Short-form films with real craft behind them — motion, pacing, sound design and a grade that holds up next to a national campaign.',
    includes: [
      'Cinema camera & gimbal work',
      'Sound design & licensed music',
      'Vertical + horizontal masters',
      '48-hour rough cut turnaround',
    ],
  },
]

export const WORK: readonly WorkItem[] = [
  {
    id: 'copper-spoon-menu',
    title: 'The Hero Burger Film',
    client: 'The Copper Spoon',
    category: 'restaurants',
    kind: 'video',
    image: '/work-burger.png',
    alt: 'Gourmet smash burger with melting cheese on a dark ceramic plate, shot from a low hero angle',
    year: '2025',
    summary:
      'A six-second loop of cheese pulling apart, cut four ways for paid social. It became the highest-performing creative in their account and we reshot the whole menu two weeks later.',
    deliverables: ['1 hero film', '4 paid cutdowns', '12 menu stills'],
    span: 'tall',
  },
  {
    id: 'nordwell-skincare',
    title: 'Quiet Ritual',
    client: 'Nordwell',
    category: 'products',
    kind: 'photo',
    image: '/work-skincare.png',
    alt: 'Frosted glass skincare dropper bottle on ribbed cream plaster with a palm frond shadow',
    year: '2025',
    summary:
      'A launch campaign built entirely on shadow. One window, one frond, and a palette pulled straight from the packaging — no props competing with the bottle.',
    deliverables: ['18 stills', '3 motion loops', 'Full usage rights'],
    span: 'square',
  },
  {
    id: 'verano-morning',
    title: 'Opening Hours',
    client: 'Verano Coffee',
    category: 'reels',
    kind: 'video',
    image: '/work-cafe.png',
    alt: 'Barista pouring latte art into a ceramic cup on a wooden counter in warm morning light',
    year: '2024',
    summary:
      'Shot across three mornings to catch the exact ten minutes when light comes through the front window. The reel crossed 2.4M views and their weekend queue has not been the same since.',
    deliverables: ['1 flagship reel', '6 story cutdowns', 'Cover stills'],
    span: 'wide',
  },
  {
    id: 'atlas-sneaker',
    title: 'Suspended',
    client: 'Atlas Provisions',
    category: 'campaigns',
    kind: 'photo',
    image: '/work-sneaker.png',
    alt: 'Minimal white and tan leather sneaker suspended mid-air against a terracotta backdrop',
    year: '2025',
    summary:
      'A full brand campaign shot in a single day against one seamless terracotta wall. Hard light, honest shadows, zero retouched fantasy.',
    deliverables: ['24 campaign stills', 'OOH masters', 'Motion teaser'],
    span: 'square',
  },
  {
    id: 'bluefin-bar',
    title: 'After Eight',
    client: 'Bluefin Table',
    category: 'restaurants',
    kind: 'video',
    image: '/work-cocktail.png',
    alt: 'Craft cocktail in a cut-crystal glass on a dark bar top with warm amber backlighting',
    year: '2024',
    summary:
      'Their cocktail programme deserved better than a phone photo. We lit the bar like a film set and shot the entire list in one night.',
    deliverables: ['1 bar film', '9 drink stills', 'Menu artwork'],
    span: 'tall',
  },
  {
    id: 'hearth-house',
    title: 'Room for Everyone',
    client: 'Hearth House',
    category: 'restaurants',
    kind: 'photo',
    image: '/work-interior.png',
    alt: 'Warm minimal restaurant dining room with cream plaster walls, oak furniture and an arched window',
    year: '2025',
    summary:
      'Interiors that sell a reservation before anyone reads the menu. Shot at 4pm for the light, styled down to two objects per frame.',
    deliverables: ['16 interior stills', 'Walkthrough film', 'Listing assets'],
    span: 'wide',
  },
  {
    id: 'terra-roasters',
    title: 'Weight & Grain',
    client: 'Terra Roasters',
    category: 'products',
    kind: 'photo',
    image: '/work-coffee-bag.png',
    alt: 'Kraft paper coffee bag on a charcoal stone slab with scattered whole coffee beans',
    year: '2024',
    summary:
      'Packaging photography for a roaster who wanted their bag to feel heavy in your hand before you ever held it. One hard light, one stone slab.',
    deliverables: ['12 packaging stills', 'Amazon A+ set', 'Social crops'],
    span: 'square',
  },
  {
    id: 'marigold-pasta',
    title: 'Made This Morning',
    client: 'Marigold Kitchen',
    category: 'reels',
    kind: 'video',
    image: '/work-pasta.png',
    alt: 'Overhead shot of fresh handmade pasta twirled on a fork over a rustic ceramic bowl',
    year: '2025',
    summary:
      'A hands-and-flour series built for saves, not likes. Nine reels over three months, each one a single continuous take.',
    deliverables: ['9 reels', 'Recipe stills', 'Thumbnail set'],
    span: 'square',
  },
  {
    id: 'lumen-bts',
    title: 'On Set',
    client: 'Lumen Studio',
    category: 'campaigns',
    kind: 'photo',
    image: '/work-bts.png',
    alt: 'Behind the scenes of a food commercial shoot with a cinema camera on a slider and softbox lighting',
    year: '2025',
    summary:
      'Behind-the-scenes coverage of a commercial shoot, cut into a recruitment film that made a small studio look exactly as capable as it is.',
    deliverables: ['BTS film', '20 documentary stills', 'Team portraits'],
    span: 'wide',
  },
]

export const PROCESS: readonly ProcessStep[] = [
  {
    step: '01',
    title: 'Inquiry',
    description:
      'You tell me what you are selling and who needs to see it. A short call, a clear quote, no deck full of buzzwords.',
  },
  {
    step: '02',
    title: 'Concept',
    description:
      'I come back with a shot list, references and a shoot plan. You approve it before a single light stand leaves my studio.',
  },
  {
    step: '03',
    title: 'Shoot',
    description:
      'A calm, fast set. I bring the camera, lighting and styling eye — you bring the product and a place to plug in.',
  },
  {
    step: '04',
    title: 'Delivery',
    description:
      'Rough cut within 48 hours, final graded masters within a week, delivered in every crop and format you actually need.',
  },
]

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'copper-spoon',
    quote:
      'We had shot with three creators before Akash and none of it looked like our restaurant. He spent an hour just watching service before he picked up the camera. The burger film paid for the entire shoot in one weekend.',
    name: 'Ritika Menon',
    title: 'Founder',
    brand: 'The Copper Spoon',
  },
  {
    id: 'nordwell',
    quote:
      'Genuinely the easiest launch shoot we have run. Akash sent a shot list on day one, delivered ahead of schedule, and the stills still outperform everything else in our ad account nine months later.',
    name: 'Daniel Farrow',
    title: 'Brand Director',
    brand: 'Nordwell',
  },
  {
    id: 'verano',
    quote:
      'He shot three mornings in a row to get ten minutes of light. That is the whole thing, really. The reel did 2.4 million views and we hired him on retainer the same week.',
    name: 'Aisha Kapoor',
    title: 'Co-owner',
    brand: 'Verano Coffee',
  },
  {
    id: 'atlas',
    quote:
      'A full campaign in a single day, on budget, with no drama and no reshoots. Akash works like someone who has done this two hundred times, because he has.',
    name: 'Marcus Oyelaran',
    title: 'Head of Marketing',
    brand: 'Atlas Provisions',
  },
]

/** Latest reels — real social media links with platform info */
export const REELS = [
  { url: 'https://vt.tiktok.com/ZS4B9RLP7/', platform: 'tiktok' as const },
  { url: 'https://vt.tiktok.com/ZS4BHhrMy/', platform: 'tiktok' as const },
  { url: 'https://www.instagram.com/reel/DUkhc6uERYv/', platform: 'instagram' as const },
  { url: 'https://www.instagram.com/reel/DXo_rpekUIu/', platform: 'instagram' as const },
  { url: 'https://www.instagram.com/reel/DV8LhaHEdpe/', platform: 'instagram' as const },
  { url: 'https://youtube.com/shorts/Tv0uAnF1fSA', platform: 'youtube' as const },
] as const

// Featured projects now use the first 6 items from WORK array
export const FEATURED_PROJECTS = WORK.slice(0, 6) as const

export const PROJECT_TYPES = [
  'Brand Promotion Content',
  'Product Photography',
  'Restaurant & F&B Content',
  'Cinematography & Reels',
  'Something else',
] as const
