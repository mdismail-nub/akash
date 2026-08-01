'use client'

import { Camera, Film, Megaphone, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { SERVICES } from '@/lib/content'
import type { Service } from '@/lib/types'

const ICONS: Record<Service['icon'], LucideIcon> = {
  megaphone: Megaphone,
  camera: Camera,
  utensils: Utensils,
  film: Film,
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-border bg-secondary py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Services"
            title="What I can"
            emphasis="make for you."
          />
          <Reveal
            delay={0.12}
            className="flex items-end lg:col-span-6 lg:col-start-7"
          >
            <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Four ways to work together. Most projects blend two or three —
              tell me what you&apos;re launching and I&apos;ll tell you what it
              actually needs.
            </p>
          </Reveal>
        </div>

        {/* Service cards */}
        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:mt-20 sm:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon]
            const headingId = `service-${service.id}`

            return (
              <ServiceCard
                key={service.id}
                service={service}
                Icon={Icon}
                index={index}
                headingId={headingId}
              />
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function ViewfinderCorners({
  isHovering,
}: {
  isHovering: boolean
}) {
  const cornerSize = 16
  const expandedSize = 24
  
  return (
    <>
      {/* Top-left corner */}
      <motion.svg
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 20 20"
        className="absolute -left-0.5 -top-0.5 overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M 2 2 L 2 10 M 2 2 L 10 2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeWidth: 1.5 }}
          animate={{
            strokeWidth: isHovering ? 2 : 1.5,
          }}
          transition={{ duration: 0.3 }}
          className="text-foreground transition-colors duration-300 group-hover:text-accent"
        />
      </motion.svg>

      {/* Top-right corner */}
      <motion.svg
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 20 20"
        className="absolute -right-0.5 -top-0.5 overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M 18 2 L 18 10 M 18 2 L 10 2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeWidth: 1.5 }}
          animate={{
            strokeWidth: isHovering ? 2 : 1.5,
          }}
          transition={{ duration: 0.3 }}
          className="text-foreground transition-colors duration-300 group-hover:text-accent"
        />
      </motion.svg>

      {/* Bottom-left corner */}
      <motion.svg
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 20 20"
        className="absolute -bottom-0.5 -left-0.5 overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M 2 18 L 2 10 M 2 18 L 10 18"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeWidth: 1.5 }}
          animate={{
            strokeWidth: isHovering ? 2 : 1.5,
          }}
          transition={{ duration: 0.3 }}
          className="text-foreground transition-colors duration-300 group-hover:text-accent"
        />
      </motion.svg>

      {/* Bottom-right corner */}
      <motion.svg
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 20 20"
        className="absolute -bottom-0.5 -right-0.5 overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M 18 18 L 18 10 M 18 18 L 10 18"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeWidth: 1.5 }}
          animate={{
            strokeWidth: isHovering ? 2 : 1.5,
          }}
          transition={{ duration: 0.3 }}
          className="text-foreground transition-colors duration-300 group-hover:text-accent"
        />
      </motion.svg>
    </>
  )
}

function ServiceCard({
  service,
  Icon,
  index,
  headingId,
}: {
  service: Service
  Icon: LucideIcon
  index: number
  headingId: string
}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Reveal
      as="li"
      delay={index * 0.08}
    >
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative flex flex-col overflow-hidden bg-background transition-all duration-500 hover:shadow-lg hover:-translate-y-1 sm:p-0"
      >
      {/* Ghost numeral background */}
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-12 select-none font-serif text-9xl font-light text-foreground/5 pointer-events-none"
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Viewfinder corner brackets */}
      <ViewfinderCorners isHovering={isHovering} />

      {/* Card content */}
      <div className="relative flex flex-col gap-6 p-8 sm:p-10 lg:p-12">
        {/* Icon in viewfinder frame */}
        <motion.div
          animate={{
            scale: isHovering ? 1.08 : 1,
            opacity: isHovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="flex size-12 items-center justify-center text-foreground"
        >
          <Icon className="size-6" />
        </motion.div>

        {/* Title */}
        <div>
          <h3
            id={headingId}
            className="font-serif text-3xl font-light leading-tight text-balance sm:text-4xl"
          >
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.description}
        </p>

        {/* Thin accent divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-accent to-accent/0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovering ? 1 : 0.4 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ originX: 0 }}
        />

        {/* Checklist with staggered items */}
        <ul
          aria-labelledby={headingId}
          className="flex flex-col gap-2.5"
        >
          {service.includes.map((item, itemIndex) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                delay: itemIndex * 0.05 + 0.2,
                duration: 0.4,
              }}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent flex-shrink-0"
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      </div>
    </Reveal>
  )
}
