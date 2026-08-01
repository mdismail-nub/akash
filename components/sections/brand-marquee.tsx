import { BRANDS } from '@/lib/content'
import { Reveal } from '@/components/shared/reveal'

/**
 * Infinite auto-scrolling wordmark wall. The list is duplicated so the
 * -50% translate loops seamlessly. Pauses on hover/focus.
 */
export function BrandMarquee() {
  return (
    <section
      aria-label="Brands and restaurants I have worked with"
      className="border-b border-border bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="text-center text-sm text-muted-foreground sm:text-base">
            <span className="display text-2xl text-foreground sm:text-3xl">
              200+ brands &amp; restaurants
            </span>
            <span className="mx-2 text-accent" aria-hidden="true">
              /
            </span>
            two years of showing up with a camera
          </p>
        </Reveal>
      </div>

      {/* Marquee track */}
      <div
        className="group relative mt-12 flex overflow-hidden"
        style={
          {
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          } as React.CSSProperties
        }
      >
        <div
          className="animate-marquee flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]"
          style={{ '--marquee-duration': '48s' } as React.CSSProperties}
        >
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              aria-hidden={index >= BRANDS.length}
              className="flex shrink-0 items-center whitespace-nowrap px-8 text-lg tracking-tight text-muted-foreground/60 transition-colors duration-300 hover:text-accent sm:px-12 sm:text-xl"
            >
              {brand}
              <span
                aria-hidden="true"
                className="ml-8 size-1 rounded-full bg-border sm:ml-12"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
