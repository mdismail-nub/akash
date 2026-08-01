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
      className="border-b border-foreground/10 bg-background py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Services"
            title="Premium Creative"
            emphasis="Services"
          />
          <Reveal
            delay={0.12}
            className="flex items-end lg:col-span-6 lg:col-start-7"
          >
            <p className="max-w-md text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg">
              Specialized services designed for brands that demand premium quality. Each offering combines cinematography expertise with strategic brand thinking.
            </p>
          </Reveal>
        </div>

        {/* Premium Service cards */}
        <ul className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:gap-6">
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
      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ y: -6 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] backdrop-blur-sm transition-all duration-500 hover:shadow-luxury hover:border-accent/50"
      >
      {/* Premium card content */}
      <div className="relative flex flex-col gap-8 p-8 sm:p-10 lg:p-12">
        {/* Premium Icon */}
        <motion.div
          animate={{
            scale: isHovering ? 1.1 : 1,
            color: isHovering ? '#D4AF37' : 'rgb(250, 250, 250)',
          }}
          transition={{ duration: 0.3 }}
          className="flex size-14 items-center justify-center rounded-lg bg-accent/10 text-accent"
        >
          <Icon className="size-7" />
        </motion.div>

        {/* Title */}
        <div>
          <h3
            id={headingId}
            className="font-display text-2xl sm:text-3xl font-bold leading-tight text-balance text-foreground"
          >
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="max-w-sm text-sm leading-relaxed text-foreground/70 sm:text-base">
          {service.description}
        </p>

        {/* Premium accent line */}
        <motion.div
          className="h-0.5 bg-gradient-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovering ? 1 : 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ originX: 0 }}
        />

        {/* Premium Checklist */}
        <ul
          aria-labelledby={headingId}
          className="flex flex-col gap-3"
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
              className="flex items-start gap-3 text-sm text-foreground/70"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold flex-shrink-0"
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      </motion.div>
    </Reveal>
  )
}
