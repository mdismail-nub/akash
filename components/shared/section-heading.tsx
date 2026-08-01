import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared/reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  /** Optional italic serif emphasis appended to the title */
  emphasis?: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'default' | 'ink'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  description,
  align = 'left',
  tone = 'default',
  className,
}: SectionHeadingProps) {
  const isInk = tone === 'ink'

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            'text-xs uppercase tracking-widest font-medium flex items-center gap-3',
            isInk ? 'text-foreground/70' : 'text-foreground/70',
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-6 shrink-0 bg-gradient-gold"
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={cn(
            'font-display font-bold text-balance text-5xl sm:text-6xl lg:text-7xl leading-tight',
            isInk ? 'text-foreground' : 'text-foreground',
          )}
        >
          {title}
          {emphasis ? (
            <>
              <br />
              <span className="text-accent">{emphasis}</span>
            </>
          ) : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'max-w-xl text-pretty text-base leading-relaxed sm:text-lg',
              align === 'center' && 'mx-auto',
              isInk ? 'text-foreground/75' : 'text-foreground/75',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
