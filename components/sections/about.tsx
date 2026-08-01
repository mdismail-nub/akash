'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/shared/reveal'
import { SITE } from '@/lib/content'

const SPECIALTIES = [
  { label: 'Cinematography', desc: 'Cinematic storytelling' },
  { label: 'Product Photography', desc: 'Premium product shoots' },
  { label: 'Brand Promotion', desc: 'Strategic campaigns' },
  { label: 'Commercial Content', desc: 'High-impact reels' },
  { label: 'Food & Beverage', desc: 'Restaurant marketing' },
  { label: 'Colour Grading', desc: 'Professional post' },
] as const

const TIMELINE = [
  { year: '2024', event: 'Reached 200+ Brand Collaborations' },
  { year: '2024', event: 'Expanded to National Campaigns' },
  { year: '2023', event: 'Partnered with Premium Restaurants' },
  { year: '2023', event: 'Started Professional Content Creation' },
] as const

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-foreground/10 bg-background py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-16">
        {/* Premium header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gradient-gold" />
          <span className="text-sm font-medium tracking-widest text-foreground/70 uppercase">
            About the Creator
          </span>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Large Editorial Portrait */}
          <Reveal className="lg:col-span-5" y={32}>
            <figure className="relative">
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-muted shadow-luxury">
                <Image
                  src="/portrait-akash.png"
                  alt="Akash holding a cinema camera in a warm studio lit by soft window light"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <figcaption className="mt-6 flex flex-col gap-2 text-sm text-foreground/70">
                <span className="font-medium">{SITE.location}</span>
                <span className="text-xs uppercase tracking-wider text-accent">Established 2023</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Editorial Content */}
          <div className="flex flex-col justify-start gap-10 lg:col-span-7">
            {/* Premium Headline */}
            <Reveal delay={0.08}>
              <h2
                id="about-heading"
                className="font-display text-balance text-5xl sm:text-6xl lg:text-6xl leading-tight text-foreground"
              >
                Premium Commercial Content<br />
                <span className="text-accent">That Converts</span>
              </h2>
            </Reveal>

            {/* Editorial Text */}
            <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
              <Reveal delay={0.14}>
                <p className="text-pretty">
                  For over 2 years, I&apos;ve been the creative partner 200+ brands trust with their most important visual storytelling. From intimate restaurant launches to national campaigns, my work sits at the intersection of cinematic quality and commercial strategy.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-pretty">
                  Every frame is intentional. Whether lighting a dish, framing a space, or cutting a 15-second reel that stops thumbs mid-scroll—the goal is always the same: make your brand unforgettable and make viewers want to take action.
                </p>
              </Reveal>
            </div>

            {/* Premium Specialties Grid */}
            <Reveal delay={0.26} className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {SPECIALTIES.map((specialty, idx) => (
                  <motion.div
                    key={specialty.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.32 + idx * 0.05, duration: 0.6 }}
                    className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-4 backdrop-blur-sm"
                  >
                    <p className="font-semibold text-foreground text-sm">{specialty.label}</p>
                    <p className="text-xs text-foreground/60 mt-1">{specialty.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Timeline */}
            <Reveal delay={0.4} className="pt-8">
              <div className="space-y-4">
                <p className="text-xs font-medium uppercase tracking-widest text-foreground/60">Journey</p>
                <div className="space-y-3">
                  {TIMELINE.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45 + idx * 0.06, duration: 0.6 }}
                      className="flex items-start gap-4 pb-3 border-b border-foreground/5 last:border-0"
                    >
                      <span className="font-display text-sm font-bold text-accent min-w-fit">{item.year}</span>
                      <span className="text-sm text-foreground/75 pt-1">{item.event}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.52} className="pt-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-accent/50 text-accent font-semibold transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
              >
                Start Your Project
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
