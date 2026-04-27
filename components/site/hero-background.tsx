"use client"

import { useEffect, useState } from "react"

/**
 * Premium animated mesh background for the Hero — Stripe/Linear tier.
 * Multi-color radial gradients drifting + scaling. Disabled on mobile to
 * save battery and on prefers-reduced-motion. Mobile gets a static accent.
 */
export function HeroBackground() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobileMq = window.matchMedia("(max-width: 767px)")

    const update = () => {
      setEnabled(!motionMq.matches && !mobileMq.matches)
    }
    update()

    motionMq.addEventListener("change", update)
    mobileMq.addEventListener("change", update)
    return () => {
      motionMq.removeEventListener("change", update)
      mobileMq.removeEventListener("change", update)
    }
  }, [])

  return (
    <>
      {/* Animated mesh — desktop, motion-friendly */}
      {enabled && <div aria-hidden="true" className="hero-mesh" />}

      {/* Static fallback — mobile / reduced-motion. Subtle, doesn't compete. */}
      {!enabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 25% 25%, oklch(0.55 0.24 295 / 0.18), transparent 60%), radial-gradient(ellipse 70% 50% at 75% 30%, oklch(0.58 0.22 250 / 0.15), transparent 60%), radial-gradient(ellipse 60% 60% at 60% 80%, oklch(0.74 0.16 200 / 0.12), transparent 60%)",
          }}
        />
      )}

      {/* Subtle conic shimmer accent — visible on both */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, oklch(0.55 0.24 295), oklch(0.58 0.22 250), oklch(0.74 0.16 200), oklch(0.68 0.20 35), oklch(0.55 0.24 295))",
        }}
      />
    </>
  )
}
