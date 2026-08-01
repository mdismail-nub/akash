'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { InstagramIcon, TiktokIcon, YoutubeIcon } from '@/components/shared/brand-icons'
import { Reveal } from '@/components/shared/reveal'
import { REELS, SITE } from '@/lib/content'
import { enrichReelsWithMetadata } from '@/lib/reel-utils'
import type { ReelWithMetadata } from '@/lib/types'

export function Reels() {
  const [reelsData, setReelsData] = useState<ReelWithMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    enrichReelsWithMetadata(REELS)
      .then(setReelsData)
      .catch((error) => {
        console.error('[v0] Failed to load reels:', error)
        // Fallback to original reels without thumbnails
        setReelsData(
          REELS.map((r) => ({
            ...r,
            thumbnail: '',
          }))
        )
      })
      .finally(() => setIsLoading(false))
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'tiktok':
        return <TiktokIcon className="size-4" />
      case 'youtube':
        return <YoutubeIcon className="size-4" />
      case 'instagram':
        return <InstagramIcon className="size-4" />
      default:
        return null
    }
  }

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'tiktok':
        return 'TikTok'
      case 'youtube':
        return 'YouTube'
      case 'instagram':
        return 'Instagram'
      default:
        return 'Watch'
    }
  }

  return (
    <section
      id="reels"
      aria-labelledby="reels-heading"
      className="border-b border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Latest Reels
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="reels-heading"
                className="heading mt-5 text-balance text-4xl sm:text-5xl"
              >
                Fresh from the{' '}
                <em className="text-accent not-italic">feed.</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-sm border border-accent/40 bg-accent/5 px-5 py-3 text-sm text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <InstagramIcon className="size-4" />
              Follow on Instagram
            </a>
          </Reveal>
        </div>

        {/* Reels strip — horizontal scroll on mobile, grid on desktop */}
        <ul className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:mt-14 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {isLoading
            ? // Skeleton loaders while fetching
              REELS.map((_, index) => (
                <li
                  key={`skeleton-${index}`}
                  className="w-40 shrink-0 snap-start sm:w-48 lg:w-auto"
                >
                  <div className="aspect-9/16 rounded-sm bg-muted animate-pulse" />
                </li>
              ))
            : // Loaded reels
              reelsData.map((reel, index) => (
                <Reveal
                  as="li"
                  key={reel.url}
                  delay={index * 0.06}
                  className="w-40 shrink-0 snap-start sm:w-48 lg:w-auto"
                >
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-9/16 overflow-hidden rounded-sm bg-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
                    title={`Watch on ${getPlatformLabel(reel.platform)}`}
                  >
                    {reel.thumbnail && (
                      <Image
                        src={reel.thumbnail}
                        alt={`${getPlatformLabel(reel.platform)} reel thumbnail`}
                        fill
                        sizes="(min-width: 1024px) 16vw, 45vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    )}

                    {/* Instagram placeholder styling */}
                    {reel.platform === 'instagram' && !reel.thumbnail && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 opacity-40" />
                    )}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                    />

                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Play className="size-4 fill-current" />
                      </span>
                    </span>

                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-medium text-ink-foreground">
                      {getPlatformIcon(reel.platform)}
                      {getPlatformLabel(reel.platform)}
                      <span className="sr-only">
                        Open {getPlatformLabel(reel.platform)} reel
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
        </ul>
      </div>
    </section>
  )
}
