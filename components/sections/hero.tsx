'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { HERO_MEDIA, SITE, STATS } from '@/lib/content'

const ROTATION_MS = 5200

export function Hero() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % HERO_MEDIA.length),
      ROTATION_MS,
    )
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Cross-fading background rotation */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={HERO_MEDIA[index].src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.6, ease: 'easeInOut' },
              scale: { duration: 7, ease: 'linear' },
            }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_MEDIA[index].src}
              alt={HERO_MEDIA[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Legibility scrims — keeps WCAG AA contrast over any frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/70"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-14 lg:px-12">
        <div className="max-w-5xl">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full bg-accent-light px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wider text-foreground/80 uppercase">
              Available for new shoots
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow flex items-center gap-3 text-ink-muted mt-6"
          >
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {SITE.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-6 text-balance text-[clamp(3.25rem,13vw,11rem)] text-ink-foreground"
          >
            Akash
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-foreground/80 sm:text-lg"
          >
            Content creator and brand promoter. I make the films and photographs
            that convince people to walk in, click buy, and come back.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-7 py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-ink-foreground hover:text-ink focus-visible:ring-2 focus-visible:ring-ink-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              Work With Me
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-ink-foreground/30 px-7 py-4 text-sm font-medium text-ink-foreground transition-colors hover:border-ink-foreground hover:bg-ink-foreground/10 focus-visible:ring-2 focus-visible:ring-ink-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              View Work
              <ArrowDownRight
                className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>

        {/* Bottom rail: credibility + frame indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-14 flex flex-col gap-6 border-t border-ink-border pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <dl className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
            {STATS.slice(0, 3).map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="display text-2xl text-ink-foreground sm:text-3xl">
                  {stat.value}
                </dd>
                <span className="max-w-24 text-xs leading-tight text-ink-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </dl>

          {/* Rotation indicator */}
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Hero image selection"
          >
            {HERO_MEDIA.map((media, mediaIndex) => (
              <button
                key={media.src}
                type="button"
                onClick={() => setIndex(mediaIndex)}
                aria-label={`Show hero image ${mediaIndex + 1}`}
                aria-current={mediaIndex === index}
                className="group py-2 focus-visible:outline-none"
              >
                <span
                  className={`block h-0.5 transition-all duration-500 group-focus-visible:bg-accent ${
                    mediaIndex === index
                      ? 'w-10 bg-accent'
                      : 'w-5 bg-ink-foreground/30 group-hover:bg-ink-foreground/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
