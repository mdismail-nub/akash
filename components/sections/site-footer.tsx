import Link from 'next/link'
import {
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  FacebookIcon,
} from '@/components/shared/brand-icons'
import { NAV_LINKS, SITE } from '@/lib/content'

const SOCIALS = [
  { href: SITE.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: SITE.social.tiktok, label: 'TikTok', Icon: TiktokIcon },
  { href: SITE.social.youtube, label: 'YouTube', Icon: YoutubeIcon },
  { href: SITE.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: SITE.social.facebookProfile, label: 'Facebook (Profile)', Icon: FacebookIcon, title: 'Profile' },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link
              href="#top"
              className="font-serif text-2xl tracking-tight text-foreground"
            >
              {SITE.name}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {SITE.role} — {SITE.tagline}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.location}</p>
          </div>

          <div className="flex flex-col gap-12 sm:flex-row sm:gap-20">
            <nav aria-label="Footer navigation">
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Navigate
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Get in touch
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {SITE.email}
                  </a>
                </li>
              </ul>
              <ul className="mt-6 flex items-center gap-2">
                {SOCIALS.map(({ href, label, Icon, title }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={title ? `${label} — ${title}` : label}
                      title={title}
                      className="flex size-10 items-center justify-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for brands that care how they look.
          </p>
        </div>
      </div>
    </footer>
  )
}
