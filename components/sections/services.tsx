import { Camera, Check, Film, Megaphone, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
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
              <Reveal
                as="li"
                key={service.id}
                delay={index * 0.08}
                className="group flex flex-col bg-background p-8 transition-colors duration-500 hover:bg-card sm:p-10 lg:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
                  >
                    <Icon className="size-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-muted-foreground/60"
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3
                  id={headingId}
                  className="display mt-8 text-2xl text-balance sm:text-3xl"
                >
                  {service.title}
                </h3>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.description}
                </p>

                <ul
                  aria-labelledby={headingId}
                  className="mt-8 flex flex-col gap-3 border-t border-border pt-7"
                >
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
