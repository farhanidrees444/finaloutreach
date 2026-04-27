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

/**
 * Fallback set — typeset wordmarks rendered as inline SVG so the section
 * NEVER goes blank, even with no env vars / no Vercel Blob configured.
 * Replace via /admin/logos once env vars are set up.
 */
const FALLBACK_BRANDS = [
  "Helio AI",
  "Verge Studio",
  "Northwind",
  "Ledger Systems",
  "Veridian Health",
  "Atlas Partners",
  "Forge Industrial",
  "Hearth CRE",
  "Apex Cyber",
  "BrightPath",
] as const

export function ClientLogosMarquee() {
  const [apiLogos, setApiLogos] = useState<ClientLogo[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchLogos() {
      try {
        const res = await fetch("/api/logos/list")
        const data = await res.json()
        if (cancelled) return
        if (data.ok && Array.isArray(data.logos) && data.logos.length > 0) {
          setApiLogos(data.logos)
        }
      } catch {
        // silently fall back to wordmarks
      }
    }
    fetchLogos()
    return () => {
      cancelled = true
    }
  }, [])

  // If API returns logos, use those; otherwise use the wordmark fallback
  const useApi = apiLogos && apiLogos.length > 0
  const items = useApi
    ? [...apiLogos!, ...apiLogos!]
    : [...FALLBACK_BRANDS, ...FALLBACK_BRANDS]

  return (
    <section className="relative overflow-hidden border-y border-ink-08 py-14 sm:py-16">
      {/* Soft tinted background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 mesh-violet opacity-60"
      />

      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-[11.5px] uppercase tracking-[0.22em] text-ink-60">
          <span className="gradient-text font-semibold">Trusted by</span>{" "}
          <span className="text-ink-40">teams at</span>
        </p>

        <div className="marquee-track relative overflow-hidden mask-fade-x-80">
          <div className="marquee flex w-max items-center gap-10 sm:gap-14">
            {items.map((item, idx) =>
              useApi ? (
                <ApiLogo
                  key={`${(item as ClientLogo).id}-${idx}`}
                  logo={item as ClientLogo}
                  ariaHide={idx >= apiLogos!.length}
                />
              ) : (
                <Wordmark
                  key={`${item as string}-${idx}`}
                  name={item as string}
                  ariaHide={idx >= FALLBACK_BRANDS.length}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Wordmark({ name, ariaHide }: { name: string; ariaHide: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHide ? "true" : undefined}
    >
      <span
        className="select-none text-[18px] font-semibold tracking-tight text-ink-60 opacity-70 transition-all duration-300 hover:opacity-100 hover:text-ink sm:text-[20px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {name}
      </span>
    </div>
  )
}

function ApiLogo({
  logo,
  ariaHide,
}: {
  logo: ClientLogo
  ariaHide: boolean
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHide ? "true" : undefined}
    >
      <img
        src={logo.url}
        alt={ariaHide ? "" : logo.name}
        title={logo.name}
        className={`${logo.heightClass} w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0`}
      />
    </div>
  )
}
