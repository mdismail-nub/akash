'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { SectionHeading } from '@/components/shared/section-heading'
import { Skeleton } from '@/components/ui/skeleton'
import { WORK } from '@/lib/content'
import { WORK_FILTERS, type WorkFilter, type WorkItem } from '@/lib/types'
import { cn } from '@/lib/utils'

// Code-split: the lightbox only ships once a visitor opens a project
const WorkLightbox = dynamic(
  () => import('@/components/sections/work-lightbox').then((m) => m.WorkLightbox),
  { ssr: false },
)

const ASPECT: Record<WorkItem['span'], string> = {
  tall: 'aspect-3/4',
  square: 'aspect-square',
  wide: 'aspect-4/3',
}

export function Work() {
  const [filter, setFilter] = useState<WorkFilter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})

  const visible = useMemo(
    () => (filter === 'all' ? WORK : WORK.filter((w) => w.category === filter)),
    [filter],
  )

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-foreground/10 bg-background py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-16">
        <SectionHeading
          eyebrow="Premium Portfolio"
          title="Cinematic work that"
          emphasis="converts viewers to customers."
          description="Curated selection of restaurant films, product campaigns, and commercial content. Explore projects that drove real results."
          className="max-w-2xl"
        />

        {/* Premium Filter pills */}
        <div
          role="tablist"
          aria-label="Filter work by category"
          className="mt-12 flex flex-wrap gap-3 sm:mt-14"
        >
          {WORK_FILTERS.map((option) => {
            const active = filter === option.value
            return (
              <motion.button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(option.value)
                  setOpenIndex(null)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
                  active
                    ? 'bg-accent text-accent-foreground shadow-glow'
                    : 'border border-foreground/20 text-foreground/70 hover:border-accent hover:text-accent',
                )}
              >
                {option.label}
              </motion.button>
            )
          })}
        </div>

        {/* Editorial masonry grid */}
        <div
          role="tabpanel"
          aria-label={`${filter === 'all' ? 'All' : filter} work`}
          className="mt-8 gap-4 sm:columns-2 lg:columns-3 lg:gap-5 [&>*]:mb-4 lg:[&>*]:mb-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => {
              const isLoaded = loaded[item.id] ?? false

              return (
                <motion.article
                  key={item.id}
                  layout="position"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.05, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="break-inside-avoid"
                >
                  <motion.button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    aria-label={`View project: ${item.title} for ${item.client}`}
                    whileHover={{ y: -4 }}
                    className="group relative block w-full overflow-hidden rounded-xl bg-muted text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none shadow-luxury transition-all duration-300"
                  >
                    <div className={cn('relative w-full', ASPECT[item.span])}>
                      {!isLoaded ? (
                        <Skeleton className="absolute inset-0 rounded-none" />
                      ) : null}

                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        onLoad={() =>
                          setLoaded((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className={cn(
                          'object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]',
                          isLoaded ? 'opacity-100' : 'opacity-0',
                        )}
                      />

                      {/* Premium hover overlay */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />

                      {/* Video affordance */}
                      {item.kind === 'video' ? (
                        <motion.span
                          aria-hidden="true"
                          whileHover={{ scale: 1.1 }}
                          className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full glass text-foreground transition-colors duration-500 group-hover:bg-accent group-hover:text-accent-foreground"
                        >
                          <Play className="size-4 fill-current" />
                        </motion.span>
                      ) : null}

                      {/* Premium Caption */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <p className="text-xs uppercase tracking-widest text-accent font-medium">{item.client}</p>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                            {item.title}
                          </h3>
                          <motion.div whileHover={{ x: 2, y: -2 }}>
                            <ArrowUpRight
                              className="size-5 shrink-0 text-foreground"
                              aria-hidden="true"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.button>

                  {/* Always-visible label for mobile / no-hover devices */}
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <p className="text-sm text-foreground">{item.title}</p>
                    <p className="shrink-0 text-xs text-muted-foreground">
                      {item.client}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <WorkLightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
