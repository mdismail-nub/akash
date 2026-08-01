'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { NAV_LINKS, SITE } from '@/lib/content'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  // Light text while floating over the dark hero, dark text once solid
  const onDark = !solid && !menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'glass shadow-luxury'
          : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-18 max-w-[1600px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-16"
      >
        {/* Premium Wordmark */}
        <a
          href="#top"
          className={cn(
            'font-display text-xl font-bold tracking-tight transition-all duration-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
            onDark ? 'text-foreground/80' : 'text-foreground',
          )}
        >
          {SITE.name}
          <span className="text-accent ml-1">Studio</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-12 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'group relative text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
                  onDark
                    ? 'text-foreground/70 hover:text-foreground'
                    : 'text-foreground/80 hover:text-foreground',
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-0.5 w-0 bg-gradient-gold transition-all duration-400 group-hover:w-full"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Premium CTA */}
          <a
            href="#contact"
            className={cn(
              'hidden items-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex',
              solid
                ? 'bg-accent text-accent-foreground hover:shadow-glow focus-visible:ring-offset-background'
                : 'border border-foreground/30 text-foreground/80 hover:border-accent hover:text-accent focus-visible:ring-offset-transparent',
            )}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none md:hidden',
              onDark ? 'text-foreground/80 hover:text-foreground' : 'text-foreground hover:bg-foreground/5',
            )}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
          >
            <div className="flex h-18 items-center justify-between px-5">
              <span className="font-display text-xl font-bold text-foreground">
                {SITE.name}
                <span className="text-accent ml-1">Studio</span>
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                autoFocus
                className="inline-flex size-10 items-center justify-center rounded-lg text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-5 pb-24">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-foreground/10"
                >
                  <a
                    href={link.href}
                    onClick={close}
                    className="font-display block py-5 text-3xl text-foreground focus-visible:text-accent focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  onClick={close}
                  className="flex items-center justify-center rounded-lg bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:shadow-glow"
                >
                  Let&apos;s Talk
                </a>
              </motion.li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
