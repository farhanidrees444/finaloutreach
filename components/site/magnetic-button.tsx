"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  href: string
  children: React.ReactNode
  variant?: "primary" | "ink" | "ghost"
  size?: "md" | "lg"
  className?: string
}

/**
 * Magnetic CTA — gently tracks the cursor when nearby.
 * Falls back to a normal button when reduced motion is preferred.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    x.set(dx * 0.18)
    y.set(dy * 0.28)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const sizes = {
    md: "h-12 px-6 text-[15px]",
    lg: "h-[56px] px-7 text-[15.5px]",
  }
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-emerald-dark cta-pulse shine-overlay",
    ink: "bg-ink text-background hover:bg-ink/90 shine-overlay",
    ghost:
      "bg-transparent text-ink border border-ink-08 hover:border-ink-40 hover:bg-cream",
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 will-change-transform",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </motion.a>
  )
}

// Convenience wrapper that mimics the Link API for consistency.
export function MagneticLink(props: Props) {
  const _Link = Link
  void _Link
  return <MagneticButton {...props} />
}
