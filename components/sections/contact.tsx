'use client'

import { ArrowRight, Loader2, Mail, MapPin } from 'lucide-react'
import { useId, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { submitContact } from '@/app/actions/contact'
import { Reveal } from '@/components/shared/reveal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PROJECT_TYPES, SITE } from '@/lib/content'
import { contactSchema, type ContactFieldErrors } from '@/lib/validation'
import { cn } from '@/lib/utils'

const FIELD_CLASS =
  'h-12 w-full rounded-sm border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30'

export function Contact() {
  const formId = useId()
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const [projectType, setProjectType] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('projectType', projectType)

    // Client-side validation first — same schema the server enforces
    const parsed = contactSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      projectType: formData.get('projectType'),
      message: formData.get('message'),
    })

    if (!parsed.success) {
      const fieldErrors: ContactFieldErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ContactFieldErrors | undefined
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      toast.error('Please check the highlighted fields.')
      return
    }

    setErrors({})

    startTransition(async () => {
      // Construct mailto link with form data
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const company = formData.get('company') as string
      const projectType = formData.get('projectType') as string
      const message = formData.get('message') as string

      const subject = `New Enquiry from ${name} — ${company}`
      const body = `From: ${name} (${email})\nProject Type: ${projectType}\n\n${message}`
      const mailtoLink = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      // Also submit to backend for logging/archiving
      const result = await submitContact(formData)

      // Open email client regardless of backend result
      window.location.href = mailtoLink

      if (result.ok) {
        toast.success('Opening your email client...')
        form.reset()
        setProjectType('')
      } else {
        toast.error('Please complete the email and send it.')
      }
    })
  }

  const fieldError = (field: keyof ContactFieldErrors) => errors[field]

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-ink py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Pitch */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow flex items-center gap-3 text-ink-muted">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Book a Shoot
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="contact-heading"
                className="display mt-5 text-balance text-4xl text-ink-foreground sm:text-5xl lg:text-6xl"
              >
                Let&apos;s create something brands{' '}
                <em className="text-accent not-italic">remember.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
                Tell me what you&apos;re launching and roughly when. I reply to
                every enquiry within one business day with a clear scope and a
                flat quote.
              </p>
            </Reveal>

            {/* Direct contact */}
            <Reveal delay={0.2} className="mt-10">
              <ul className="flex flex-col gap-1 border-t border-ink-border pt-8">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="group flex items-center gap-4 py-3 text-ink-foreground transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                  >
                    <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm">{SITE.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-4 py-3 text-ink-muted">
                  <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm">{SITE.location}</span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal
            delay={0.16}
            className="lg:col-span-6 lg:col-start-7"
            y={32}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6 rounded-sm bg-background p-6 sm:p-8 lg:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${formId}-name`} className="text-sm">
                    Your name
                  </Label>
                  <Input
                    id={`${formId}-name`}
                    name="name"
                    autoComplete="name"
                    placeholder="Ritika Menon"
                    aria-invalid={Boolean(fieldError('name'))}
                    aria-describedby={
                      fieldError('name') ? `${formId}-name-error` : undefined
                    }
                    className={cn(
                      FIELD_CLASS,
                      fieldError('name') && 'border-destructive',
                    )}
                  />
                  {fieldError('name') ? (
                    <p
                      id={`${formId}-name-error`}
                      role="alert"
                      className="text-xs text-destructive"
                    >
                      {fieldError('name')}
                    </p>
                  ) : null}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${formId}-email`} className="text-sm">
                    Email
                  </Label>
                  <Input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@brand.com"
                    aria-invalid={Boolean(fieldError('email'))}
                    aria-describedby={
                      fieldError('email') ? `${formId}-email-error` : undefined
                    }
                    className={cn(
                      FIELD_CLASS,
                      fieldError('email') && 'border-destructive',
                    )}
                  />
                  {fieldError('email') ? (
                    <p
                      id={`${formId}-email-error`}
                      role="alert"
                      className="text-xs text-destructive"
                    >
                      {fieldError('email')}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Company */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${formId}-company`} className="text-sm">
                    Brand or company
                  </Label>
                  <Input
                    id={`${formId}-company`}
                    name="company"
                    autoComplete="organization"
                    placeholder="The Copper Spoon"
                    aria-invalid={Boolean(fieldError('company'))}
                    aria-describedby={
                      fieldError('company')
                        ? `${formId}-company-error`
                        : undefined
                    }
                    className={cn(
                      FIELD_CLASS,
                      fieldError('company') && 'border-destructive',
                    )}
                  />
                  {fieldError('company') ? (
                    <p
                      id={`${formId}-company-error`}
                      role="alert"
                      className="text-xs text-destructive"
                    >
                      {fieldError('company')}
                    </p>
                  ) : null}
                </div>

                {/* Project type */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${formId}-type`} className="text-sm">
                    Project type
                  </Label>
                  <Select
                    value={projectType}
                    onValueChange={(value) =>
                      setProjectType(typeof value === 'string' ? value : '')
                    }
                  >
                    <SelectTrigger
                      id={`${formId}-type`}
                      aria-invalid={Boolean(fieldError('projectType'))}
                      aria-describedby={
                        fieldError('projectType')
                          ? `${formId}-type-error`
                          : undefined
                      }
                      className={cn(
                        FIELD_CLASS,
                        'justify-between',
                        fieldError('projectType') && 'border-destructive',
                      )}
                    >
                      <span
                        className={cn(
                          'truncate text-left',
                          !projectType && 'text-muted-foreground/70',
                        )}
                      >
                        {projectType || 'Choose one'}
                      </span>
                    </SelectTrigger>
                    <SelectContent align="start">
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldError('projectType') ? (
                    <p
                      id={`${formId}-type-error`}
                      role="alert"
                      className="text-xs text-destructive"
                    >
                      {fieldError('projectType')}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <Label htmlFor={`${formId}-message`} className="text-sm">
                  Tell me about the project
                </Label>
                <Textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={5}
                  placeholder="We're relaunching our dinner menu in March and need a hero film plus stills for delivery apps..."
                  aria-invalid={Boolean(fieldError('message'))}
                  aria-describedby={
                    fieldError('message') ? `${formId}-message-error` : undefined
                  }
                  className={cn(
                    'w-full resize-y rounded-sm border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30',
                    fieldError('message') && 'border-destructive',
                  )}
                />
                {fieldError('message') ? (
                  <p
                    id={`${formId}-message-error`}
                    role="alert"
                    className="text-xs text-destructive"
                  >
                    {fieldError('message')}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-sm bg-accent px-7 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>
                    Send enquiry
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              <p className="text-xs leading-relaxed text-muted-foreground">
                No spam, no mailing list. Your details are only used to reply to
                this enquiry.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
