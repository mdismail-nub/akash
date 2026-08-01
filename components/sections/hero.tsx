'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HERO_MEDIA, SITE, STATS } from '@/lib/content'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ROTATION_MS = 5200

export function Hero() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDListElement>(null)

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % HERO_MEDIA.length),
      ROTATION_MS,
    )
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  // GSAP animations for stats counters
  useGSAP(() => {
    if (reduceMotion || !statsRef.current) return

    const statElements = statsRef.current.querySelectorAll('[data-stat-value]')
    statElements.forEach((el) => {
      const endValue = parseInt(el.getAttribute('data-stat-value') || '0')
      const startValue = 0

      gsap.from(el, {
        textContent: startValue,
        duration: 2.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        onUpdate: function () {
          if (el.textContent) {
            const current = Math.floor(parseFloat(el.textContent))
            if (endValue > 1000) {
              el.textContent = current + '+'
            } else if (endValue > 100) {
              el.textContent = current + '+'
            } else {
              el.textContent = current + '+'
            }
          }
        },
      })
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background"
    >
      {/* Premium background with parallax */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={HERO_MEDIA[index].src}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.8, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'linear' },
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

        {/* Luxury overlays with glass effect */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, rgba(212,175,55,0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-16 lg:px-16">
        <div className="max-w-4xl">
          {/* Premium eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-6 bg-gradient-gold" />
            <span className="text-xs font-medium tracking-widest text-foreground/70 uppercase">
              Premium Content Creator
            </span>
          </motion.div>

          {/* Main headline with split reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <h1 className="display text-balance text-[clamp(3.5rem,14vw,10rem)] leading-[1.1] text-foreground font-display">
              Creating Stories That Make Brands Unforgettable
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 font-sans"
          >
            Helping restaurants and brands create premium visual content that converts viewers into customers. 200+ collaborations across commercial, lifestyle, and editorial work.
          </motion.p>

          {/* Premium CTAs with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
            >
              Work With Me
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
            >
              View Portfolio
              <ArrowDownRight
                className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>

        {/* Bottom rail: floating stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-foreground/10 pt-8 sm:gap-8"
        >
          <dl ref={statsRef} className="flex flex-col gap-2">
            {STATS.slice(0, 3).map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="sr-only">{stat.label}</dt>
                <dd
                  className="text-2xl sm:text-3xl font-bold text-accent font-display"
                  data-stat-value={stat.value.replace(/\D/g, '')}
                >
                  {stat.value}
                </dd>
                <span className="text-xs sm:text-sm leading-tight text-foreground/60 mt-1 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </dl>

          {/* Rotation indicator */}
          <div
            className="col-span-3 flex items-center gap-3 justify-end sm:col-span-1"
            role="group"
            aria-label="Hero image carousel"
          >
            {HERO_MEDIA.map((media, mediaIndex) => (
              <button
                key={media.src}
                type="button"
                onClick={() => setIndex(mediaIndex)}
                aria-label={`Show image ${mediaIndex + 1}`}
                aria-current={mediaIndex === index}
                className="group py-1 focus-visible:outline-none transition-all"
              >
                <span
                  className={`block h-0.5 transition-all duration-500 ${
                    mediaIndex === index
                      ? 'w-8 bg-accent'
                      : 'w-3 bg-foreground/25 group-hover:bg-foreground/50'
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
