'use server'

import type { Reel, ReelWithMetadata } from '@/lib/types'

interface TikTokOEmbed {
  thumbnail_url: string
  title?: string
}

interface YouTubeOEmbed {
  thumbnail_url: string
  title?: string
}

/**
 * Fetch TikTok reel thumbnail via oEmbed API
 * TikTok oEmbed docs: https://www.tiktok.com/oembed
 */
async function fetchTikTokThumbnail(url: string): Promise<string | null> {
  try {
    const oembedUrl = new URL('https://www.tiktok.com/oembed')
    oembedUrl.searchParams.set('url', url)
    
    const res = await fetch(oembedUrl.toString(), {
      next: { revalidate: 60 * 60 * 24 }, // 24h cache
    })
    
    if (!res.ok) return null
    const data = (await res.json()) as TikTokOEmbed
    return data.thumbnail_url || null
  } catch (error) {
    console.error('[v0] Failed to fetch TikTok thumbnail:', error)
    return null
  }
}

/**
 * Fetch YouTube Short thumbnail via oEmbed API
 * YouTube oEmbed docs: https://www.youtube.com/oembed
 */
async function fetchYouTubeThumbnail(url: string): Promise<string | null> {
  try {
    const oembedUrl = new URL('https://www.youtube.com/oembed')
    oembedUrl.searchParams.set('url', url)
    oembedUrl.searchParams.set('format', 'json')
    
    const res = await fetch(oembedUrl.toString(), {
      next: { revalidate: 60 * 60 * 24 }, // 24h cache
    })
    
    if (!res.ok) return null
    const data = (await res.json()) as YouTubeOEmbed
    return data.thumbnail_url || null
  } catch (error) {
    console.error('[v0] Failed to fetch YouTube thumbnail:', error)
    return null
  }
}

/**
 * Get placeholder thumbnail for Instagram reels
 * Instagram oEmbed requires auth token we don't have
 * TODO: When available, replace these with real Instagram reel screenshots
 */
function getInstagramPlaceholder(): string {
  // Return a data URI of a simple Instagram-themed placeholder
  // This is a light gray card that will be styled with Instagram branding
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 600"%3E%3Crect fill="%23f5f5f5" width="340" height="600"/%3E%3C/svg%3E'
}

/**
 * Enrich reels with metadata from oEmbed APIs
 */
export async function enrichReelsWithMetadata(
  reels: readonly Reel[]
): Promise<ReelWithMetadata[]> {
  return Promise.all(
    reels.map(async (reel) => {
      let thumbnail: string

      if (reel.platform === 'tiktok') {
        thumbnail = (await fetchTikTokThumbnail(reel.url)) || ''
      } else if (reel.platform === 'youtube') {
        thumbnail = (await fetchYouTubeThumbnail(reel.url)) || ''
      } else {
        // Instagram — use placeholder
        // TODO: Replace with real thumbnail when Instagram screenshots are available
        thumbnail = getInstagramPlaceholder()
      }

      return {
        ...reel,
        thumbnail,
      }
    })
  )
}
