import { Reveal } from '@/components/shared/reveal'
import { STATS } from '@/lib/content'

export function Stats() {
  return (
    <section
      aria-label="Key numbers"
      className="border-b border-border bg-secondary py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className="flex flex-col gap-2 border-l border-border pl-5 sm:pl-6"
            >
              <dt className="order-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {stat.label}
              </dt>
              <dd className="display order-1 text-5xl text-foreground sm:text-6xl lg:text-7xl">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
