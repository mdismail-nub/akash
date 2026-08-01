'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import { SectionHeading } from '@/components/shared/section-heading'
import { TESTIMONIALS } from '@/lib/content'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir)
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  const next = useCallback(() => go(index + 1, 1), [go, index])
  const prev = useCallback(() => go(index - 1, -1), [go, index])

  const active = TESTIMONIALS[index]

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-b border-ink-border bg-ink py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say"
          emphasis="afterwards."
          tone="ink"
          className="max-w-2xl"
        />

        <div
          className="mt-14 sm:mt-20"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              next()
            } else if (event.key === 'ArrowLeft') {
              event.preventDefault()
              prev()
            }
          }}
          tabIndex={0}
        >
          <div className="relative min-h-[22rem] sm:min-h-[20rem] lg:min-h-[18rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={active.id}
                initial={{ opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -48 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) next()
                  else if (info.offset.x > 70) prev()
                }}
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${TESTIMONIALS.length}`}
                className="cursor-grab active:cursor-grabbing"
              >
                <p className="display max-w-4xl text-balance text-2xl leading-[1.25] text-ink-foreground sm:text-3xl lg:text-4xl">
                  <span aria-hidden="true" className="text-accent">
                    “
                  </span>
                  {active.quote}
                  <span aria-hidden="true" className="text-accent">
                    ”
                  </span>
                </p>

                <footer className="mt-10 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 shrink-0 bg-accent"
                  />
                  <cite className="not-italic">
                    <span className="block text-sm text-ink-foreground">
                      {active.name}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {active.title}, {active.brand}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between gap-6 border-t border-ink-border pt-6">
            <div className="flex items-center gap-2" aria-hidden="true">
              {TESTIMONIALS.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(dotIndex, dotIndex > index ? 1 : -1)}
                  className={`h-0.5 transition-all duration-500 ${
                    dotIndex === index
                      ? 'w-10 bg-accent'
                      : 'w-5 bg-ink-foreground/25 hover:bg-ink-foreground/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="inline-flex size-11 items-center justify-center rounded-sm border border-ink-border text-ink-foreground transition-colors hover:bg-ink-foreground hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="inline-flex size-11 items-center justify-center rounded-sm border border-ink-border text-ink-foreground transition-colors hover:bg-ink-foreground hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
