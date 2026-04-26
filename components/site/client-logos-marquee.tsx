"use client"

import { useEffect, useState } from "react"

interface ClientLogo {
  id: string
  name: string
  url: string
  type: string
  heightClass: string
  order?: number
}

export function ClientLogosMarquee() {
  const [logos, setLogos] = useState<ClientLogo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchLogos() {
      try {
        const res = await fetch("/api/logos/list")
        const data = await res.json()
        if (cancelled) return
        if (data.ok && Array.isArray(data.logos)) {
          setLogos(data.logos)
        } else {
          setError("No logos available")
        }
      } catch (err) {
        console.error("Failed to fetch logos:", err)
        if (!cancelled) setError("Failed to load logos")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetchLogos()
    return () => {
      cancelled = true
    }
  }, [])

  if (isLoading || error || logos.length === 0) {
    return null
  }

  // Duplicate the array so the -50% translate loop reads as a seamless scroll.
  const displayLogos = [...logos, ...logos]

  return (
    <section className="relative overflow-hidden border-y border-ink-08 bg-cream/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-[11px] uppercase tracking-[0.22em] text-ink-40">
          Trusted by teams at
        </p>

        <div className="marquee-track relative overflow-hidden mask-fade-x-80">
          <div className="marquee flex w-max items-center gap-12 sm:gap-16">
            {displayLogos.map((logo, idx) => (
              <div
                key={`${logo.id}-${idx}`}
                className="flex shrink-0 items-center"
                aria-hidden={idx >= logos.length ? "true" : undefined}
              >
                <img
                  src={logo.url}
                  alt={idx >= logos.length ? "" : logo.name}
                  title={logo.name}
                  className={`${logo.heightClass} w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
