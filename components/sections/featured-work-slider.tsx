'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useReducedMotion } from 'motion/react'
import type { WorkItem } from '@/lib/types'

const QUEUE_SIZE = 4

export default function FeaturedWorkSlider({
  projects,
}: {
  projects: readonly WorkItem[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const prefersReducedMotion = useReducedMotion()

  if (!projects.length) return null

  const goNext = () => {
    setDirection(1)
    setActiveIndex((i) => (i + 1) % projects.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'ArrowRight') goNext()
  }

  // Build the ordered queue starting from the active slide
  const ordered = Array.from({ length: projects.length }, (_, offset) => {
    const index = (activeIndex + offset) % projects.length
    return { project: projects[index], offset }
  })

  const active = ordered[0].project
  const categoryLabel =
    active.category.charAt(0).toUpperCase() +
    active.category
      .slice(1)
      .replace(/([A-Z])/g, ' $1')
      .trim()

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured brand work"
      className="relative w-full overflow-hidden rounded-sm bg-background"
      style={{ aspectRatio: '16 / 9' }}
      onKeyDown={handleKeyDown}
      role="region"
    >
      {/* Background image with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${active.id}`}
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, scale: 1.02 }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, scale: 0.98 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={active.image}
            alt={active.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide copy with blur reveal transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`copy-${active.id}`}
          initial={
            prefersReducedMotion
              ? { opacity: 1, filter: 'blur(0px)' }
              : { opacity: 0, filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={
            prefersReducedMotion
              ? { opacity: 1, filter: 'blur(0px)' }
              : { opacity: 0, filter: 'blur(8px)' }
          }
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.5,
            ease: 'easeInOut',
          }}
          className="absolute left-6 top-1/2 z-10 w-[min(90%,28rem)] -translate-y-1/2 text-ink-foreground sm:left-10 md:left-16"
        >
          <span className="eyebrow text-accent">{categoryLabel}</span>
          <h2 className="display mt-2 text-4xl leading-tight sm:text-5xl md:text-6xl">
            {active.client}
          </h2>
          <p className="mt-4 max-w-sm text-sm text-ink-foreground/90 sm:text-base leading-relaxed">
            {active.title}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Receding thumbnail queue — hidden on mobile */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:flex md:items-center">
        <AnimatePresence mode="sync">
          {ordered.slice(1, QUEUE_SIZE + 1).map(({ project }, i) => (
            <motion.button
              key={project.id}
              type="button"
              aria-label={`Show ${project.client} — ${project.title}`}
              onClick={() => {
                setDirection(direction)
                setActiveIndex((activeIndex + i + 1) % projects.length)
              }}
              initial={false}
              animate={{
                x: `${i * 22}%`,
                scale: 1 - i * 0.04,
                opacity: i === QUEUE_SIZE - 1 ? 0.5 : 0.8,
                zIndex: QUEUE_SIZE - i,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-auto absolute top-1/2 -translate-y-1/2 overflow-hidden rounded-sm shadow-lg ring-1 ring-ink-border transition-colors hover:ring-ink-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              style={{
                height: '160px',
                width: '128px',
              }}
            >
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        <motion.button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-foreground/20 bg-ink/20 text-ink-foreground backdrop-blur transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </motion.button>
        <motion.button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-foreground/20 bg-ink/20 text-ink-foreground backdrop-blur transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <span className="text-xs font-medium text-ink-foreground/60">
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(projects.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
