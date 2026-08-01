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
            'eyebrow flex items-center gap-3',
            isInk ? 'text-ink-muted' : 'text-muted-foreground',
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-8 shrink-0 bg-accent"
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={cn(
            'heading text-balance text-4xl sm:text-5xl lg:text-6xl',
            isInk ? 'text-ink-foreground' : 'text-foreground',
          )}
        >
          {title}
          {emphasis ? (
            <>
              {' '}
              <em className="text-accent not-italic">{emphasis}</em>
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
              isInk ? 'text-ink-muted' : 'text-muted-foreground',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
