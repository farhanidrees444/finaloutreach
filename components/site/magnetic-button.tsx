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
 *
 * `primary` = gradient bg + animated pulse glow (the billion-dollar look).
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
    lg: "h-[58px] px-8 text-[15.5px]",
  }
  const variants = {
    primary: cn(
      "text-white shine-overlay cta-pulse",
      // Gradient: violet → electric → cyan
      "bg-[linear-gradient(120deg,oklch(0.55_0.24_295),oklch(0.58_0.22_250)_50%,oklch(0.50_0.22_270))]",
      "hover:bg-[linear-gradient(120deg,oklch(0.50_0.24_295),oklch(0.52_0.22_250)_50%,oklch(0.46_0.22_270))]",
    ),
    ink: "bg-ink text-background hover:bg-ink/90 shine-overlay glow-multi",
    ghost:
      "bg-transparent text-ink border border-ink-08 hover:border-vibrant-purple/50 hover:bg-vibrant-purple/[0.04]",
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

export function MagneticLink(props: Props) {
  const _Link = Link
  void _Link
  return <MagneticButton {...props} />
}
