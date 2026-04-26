"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

const STATS = [
  { value: "$47M+", label: "Pipeline generated for clients" },
  { value: "12,400+", label: "Qualified meetings booked" },
  { value: "200+", label: "B2B companies served" },
  { value: "3.2x", label: "Average ROI within 90 days" },
]

function StatItem({
  value,
  label,
  index,
  inView,
}: {
  value: string
  label: string
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative flex min-w-0 flex-col gap-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-white to-cream/30 p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/15 lg:border-t-0 lg:p-0 lg:border-l lg:pl-8 lg:border-primary/10"
    >
      {/* Animated background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-emerald-dark/0 to-emerald-light/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />
      
      <span className="block break-words text-[44px] font-semibold leading-[0.95] tracking-display text-ink [font-variant-numeric:tabular-nums] sm:text-[56px] md:text-[68px] lg:text-[72px] xl:text-[84px] group-hover:text-primary transition-colors duration-300">
        {value}
      </span>
      <span className="max-w-[28ch] text-[14px] leading-relaxed text-ink-60 group-hover:text-ink transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  )
}

export function ResultsBar() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-cream/40">
      {/* Animated background elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob-drift-a absolute -right-40 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-light/8 to-emerald-light/0 blur-3xl" />
        <div className="blob-drift-b absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-primary/6 to-primary/0 blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="mb-14 flex flex-col gap-3 md:mb-20">
          <span className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
            By the numbers
          </span>
          <h2 className="max-w-2xl text-balance text-[32px] font-medium leading-[1.05] tracking-display text-ink sm:text-[44px]">
            Real results from real campaigns.{" "}
            <span className="font-serif-italic gradient-text-animated">
              No vanity metrics.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-12 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 to-emerald-dark/5 px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-ink-60 backdrop-blur-sm"
        >
          <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
          <span>Verified across active client engagements, Jan 2021 – present</span>
        </motion.div>
      </div>
    </section>
  )
}
