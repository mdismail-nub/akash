'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { WorkItem } from '@/lib/types'

interface WorkLightboxProps {
  items: readonly WorkItem[]
  /** Index within `items`, or null when closed */
  index: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

export function WorkLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: WorkLightboxProps) {
  const open = index !== null
  const item = open ? items[index] : undefined
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const goNext = useCallback(() => {
    if (index === null || items.length === 0) return
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  const goPrev = useCallback(() => {
    if (index === null || items.length === 0) return
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  // Reset the video poster state whenever the active item changes
  useEffect(() => {
    setPlaying(false)
  }, [index])

  // Keyboard controls, scroll lock, and focus management
  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [open, onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — ${item.client}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-60 flex flex-col bg-ink/97 backdrop-blur-sm"
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink-border px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="eyebrow text-accent">{item.client}</p>
              <p className="truncate text-sm text-ink-foreground/70">
                {index + 1} / {items.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className="inline-flex size-11 items-center justify-center rounded-sm border border-ink-border text-ink-foreground transition-colors hover:bg-ink-foreground/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className="inline-flex size-11 items-center justify-center rounded-sm border border-ink-border text-ink-foreground transition-colors hover:bg-ink-foreground/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project view"
                className="inline-flex size-11 items-center justify-center rounded-sm bg-ink-foreground text-ink transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row">
            {/* Media — swipeable */}
            <motion.div
              key={item.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) goNext()
                else if (info.offset.x > 80) goPrev()
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[45svh] flex-1 cursor-grab items-center justify-center bg-ink p-4 active:cursor-grabbing sm:p-8 lg:min-h-0"
            >
              <div className="relative h-full max-h-[75svh] w-full">
                {item.kind === 'video' && item.video && playing ? (
                  <video
                    src={item.video}
                    poster={item.image}
                    controls
                    autoPlay
                    playsInline
                    className="size-full rounded-sm object-contain"
                  />
                ) : (
                  <>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 65vw, 100vw"
                      className="rounded-sm object-contain"
                      draggable={false}
                    />
                    {item.kind === 'video' ? (
                      <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play ${item.title}`}
                        className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
                      >
                        <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform duration-300 hover:scale-110 sm:size-20">
                          <Play className="size-6 fill-current sm:size-7" aria-hidden="true" />
                        </span>
                      </button>
                    ) : null}
                  </>
                )}
              </div>
            </motion.div>

            {/* Case study detail */}
            <aside className="shrink-0 border-t border-ink-border bg-ink px-5 py-8 sm:px-8 lg:w-96 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
              <p className="eyebrow text-ink-muted">
                {item.year} · {item.kind === 'video' ? 'Film' : 'Photography'}
              </p>

              <h3 className="display mt-4 text-3xl text-ink-foreground sm:text-4xl">
                {item.title}
              </h3>

              <p className="mt-5 text-pretty text-sm leading-relaxed text-ink-muted">
                {item.summary}
              </p>

              <div className="mt-8 border-t border-ink-border pt-6">
                <p className="eyebrow text-ink-muted">Delivered</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {item.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-baseline gap-3 text-sm text-ink-foreground/85"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 translate-y-1.5 rounded-full bg-accent"
                      />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-ink-foreground hover:text-ink focus-visible:ring-2 focus-visible:ring-ink-foreground focus-visible:outline-none"
              >
                Start a project like this
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </aside>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
