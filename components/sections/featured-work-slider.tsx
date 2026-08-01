'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export type FeaturedProject = {
  id: string
  brand: string
  category: string
  description: string
  image: string
}

const QUEUE_SIZE = 4

export default function FeaturedWorkSlider({
  projects,
}: {
  projects: readonly FeaturedProject[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!projects.length) return null

  const goNext = () => setActiveIndex((i) => (i + 1) % projects.length)
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length)

  // Build the ordered queue starting from the active slide
  const ordered = Array.from({ length: projects.length }, (_, offset) => {
    const index = (activeIndex + offset) % projects.length
    return { project: projects[index], offset }
  })

  const active = ordered[0].project

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured brand work"
      className="relative w-full overflow-hidden rounded-[var(--radius)] bg-foreground"
      style={{ aspectRatio: '16 / 9' }}
    >
      {/* Active slide background with fade transition */}
      <div
        key={`bg-${active.id}`}
        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
      >
        <Image
          src={active.image}
          alt={`${active.brand} — ${active.category}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Slide copy with fade transition */}
      <div className="absolute left-6 top-1/2 z-10 w-[min(90%,26rem)] -translate-y-1/2 text-background sm:left-10 md:left-16">
        <div
          key={`copy-${active.id}`}
          className="transition-all duration-500 ease-in-out"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {active.category}
          </span>
          <h3 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {active.brand}
          </h3>
          <p className="mt-4 max-w-sm text-sm text-background/80 sm:text-base">
            {active.description}
          </p>
        </div>
      </div>

      {/* Receding thumbnail queue — hidden on small screens */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
        {ordered.slice(1, QUEUE_SIZE + 1).map(({ project, offset }, i) => (
          <button
            key={project.id}
            type="button"
            aria-label={`Show ${project.brand}`}
            onClick={() =>
              setActiveIndex((activeIndex + offset) % projects.length)
            }
            className="pointer-events-auto absolute top-1/2 overflow-hidden rounded-lg shadow-xl ring-1 ring-background/10 transition-all duration-500 ease-in-out"
            style={{
              height: i === QUEUE_SIZE - 1 ? '160px' : '160px',
              width: i === QUEUE_SIZE - 1 ? '128px' : '128px',
              left: `${i * 22}%`,
              transform: `translateY(-50%) scale(${1 - i * 0.04})`,
              opacity: i === QUEUE_SIZE - 1 ? 0.5 : 1,
            }}
          >
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover"
              sizes="200px"
            />
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-background/30 bg-background/10 text-background backdrop-blur transition hover:scale-110 hover:bg-background/20 active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-background/30 bg-background/10 text-background backdrop-blur transition hover:scale-110 hover:bg-background/20 active:scale-95"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
