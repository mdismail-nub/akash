'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger offset in seconds */
  delay?: number
  className?: string
  /** Vertical travel distance in px */
  y?: number
  as?: 'div' | 'li' | 'span'
}

/**
 * Scroll-triggered fade + upward reveal.
 * Animates once on entry and respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
