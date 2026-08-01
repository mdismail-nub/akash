import Image from 'next/image'
import { Reveal } from '@/components/shared/reveal'
import { SITE } from '@/lib/content'

const SPECIALTIES = [
  'Cinematography',
  'Product Photography',
  'Brand Promotion',
  'Food & Beverage',
  'Short-form Reels',
  'Colour Grading',
] as const

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-border bg-background py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <Reveal className="lg:col-span-5" y={32}>
            <figure className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-muted">
                <Image
                  src="/portrait-akash.png"
                  alt="Akash holding a cinema camera in a warm studio lit by soft window light"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>{SITE.location}</span>
                <span className="eyebrow text-accent">Est. 2023</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Bio */}
          <div className="flex flex-col justify-center lg:col-span-7 lg:pl-8">
            <Reveal>
              <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                About
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="about-heading"
                className="display mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl"
              >
                I shoot the thing people{' '}
                <em className="text-accent not-italic">remember.</em>
              </h2>
            </Reveal>

            <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <Reveal delay={0.14}>
                <p className="text-pretty">
                  I&apos;m Akash. For the last two years I&apos;ve been the person
                  brands and restaurants call when their product deserves better
                  than a phone photo. That&apos;s taken me through 200+ kitchens,
                  studios, bars and warehouses — and taught me that good content
                  is far less about gear than it is about paying attention.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-pretty">
                  My work sits between cinematography and product photography. I
                  light a plate of food the way you&apos;d light a face, and I cut
                  a fifteen-second reel with the same care I&apos;d give a
                  thirty-second spot. Every frame has a job: make someone stop
                  scrolling, then make them want it.
                </p>
              </Reveal>

              <Reveal delay={0.26}>
                <p className="text-pretty">
                  I keep sets small, calm and fast. You&apos;ll get a shot list
                  before we start, a rough cut within 48 hours, and files in every
                  format you actually need — not a folder of raw exports and a
                  shrug.
                </p>
              </Reveal>
            </div>

            {/* Specialties */}
            <Reveal delay={0.32} className="mt-10">
              <ul className="flex flex-wrap gap-2" aria-label="Specialties">
                {SPECIALTIES.map((specialty) => (
                  <li
                    key={specialty}
                    className="rounded-sm border border-border bg-card px-3.5 py-2 text-xs text-muted-foreground"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Signature */}
            <Reveal delay={0.38} className="mt-10">
              <p className="display text-3xl text-foreground">Akash</p>
              <p className="mt-1 text-xs text-muted-foreground">{SITE.role}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
