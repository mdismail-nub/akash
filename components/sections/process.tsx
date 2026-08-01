import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { PROCESS } from '@/lib/content'

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-b border-border bg-background py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Process"
          title="How a project"
          emphasis="actually runs."
          description="No mystery, no endless revision loops. Four steps from your first message to final delivery."
          className="max-w-2xl"
        />

        {/* Timeline */}
        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((item, index) => (
            <Reveal
              as="li"
              key={item.step}
              delay={index * 0.1}
              className="group relative flex flex-col bg-background p-8 sm:p-10"
            >
              {/* Progress rule */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-accent/0 transition-colors duration-500 group-hover:bg-accent"
              />

              <span className="display text-5xl text-accent/25 transition-colors duration-500 group-hover:text-accent sm:text-6xl">
                {item.step}
              </span>

              <h3 className="display mt-8 text-2xl">{item.title}</h3>

              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
