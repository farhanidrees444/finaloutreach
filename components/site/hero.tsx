"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import { ScarcityBadge } from "./scarcity-badge"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"

const headlineLines = [
  ["We", "book", "qualified", "sales"],
  ["meetings", "for", "B2B", "teams", "that"],
  ["__actually", "want", "to", "grow."],
]

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: 0.18 + i * 0.07,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function Hero() {
  let wordIndex = 0
  return (
    <section className="noise-bg relative isolate overflow-hidden pb-20 pt-20 sm:pt-28 md:pb-24 md:pt-32">
      {/* Premium animated mesh background — Stripe/Linear tier */}
      <HeroBackground />

      {/* Subtle grid framing */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Eyebrow with scarcity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <ScarcityBadge />
        </motion.div>

        {/* Headline — fixed: explicit space-separated words for SSR */}
        <h1 className="mt-7 max-w-[18ch] text-balance text-[44px] font-medium leading-[1.02] tracking-display text-ink sm:text-[64px] md:text-[80px] lg:text-[88px]">
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden pb-[0.04em]">
              <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] gap-y-1">
                {line.map((word, wordIdxInLine) => {
                  const isItalic = word.startsWith("__")
                  const display = isItalic ? word.slice(2) : word
                  const i = wordIndex++
                  return (
                    <span key={`${lineIdx}-${i}`} className="inline-block">
                      <motion.span
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={wordVariants}
                        className={
                          isItalic
                            ? "inline-block font-serif-italic text-[1.08em] gradient-text-animated"
                            : "inline-block"
                        }
                      >
                        {display}
                      </motion.span>
                      {/* Real space char as fallback for SSR/no-JS */}
                      {wordIdxInLine < line.length - 1 && " "}
                    </span>
                  )
                })}
              </span>
            </span>
          ))}
        </h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-8 max-w-2xl text-pretty text-[17px] leading-[1.6] text-ink-60 sm:text-[19px]"
        >
          FinalOutreach is the cold outreach partner trusted by{" "}
          <span className="font-medium text-ink">200+ B2B companies</span>{" "}
          to fill their pipelines with high-intent prospects — without burning
          sender reputation or wasting SDR time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton href="/contact" size="lg" variant="primary">
            Book a strategy call
          </MagneticButton>
          <a
            href="#case-studies"
            className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium text-ink"
          >
            <span className="link-underline">See case studies</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Trust strip — 3 quick metrics with icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <TrustStat
            icon={<TrendingUp className="size-4" strokeWidth={2} />}
            value="$47M+"
            label="pipeline generated"
            tint="purple"
          />
          <TrustStat
            icon={<Users className="size-4" strokeWidth={2} />}
            value="12,400+"
            label="meetings booked"
            tint="electric"
          />
          <TrustStat
            icon={<Zap className="size-4" strokeWidth={2} />}
            value="3.2x"
            label="avg ROI in 90 days"
            tint="cyan"
          />
        </motion.div>
      </div>

      {/* Floating decorative blob accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.55 0.24 295 / 0.4), transparent 70%)",
        }}
      />
    </section>
  )
}

function TrustStat({
  icon,
  value,
  label,
  tint,
}: {
  icon: React.ReactNode
  value: string
  label: string
  tint: "purple" | "electric" | "cyan"
}) {
  const tints = {
    purple: "text-vibrant-purple",
    electric: "text-electric-blue",
    cyan: "text-bright-cyan",
  }
  return (
    <div className="glass-card flex items-center gap-3 rounded-2xl px-5 py-4 transition-all hover:border-vibrant-purple/30">
      <div
        className={`grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-vibrant-purple/10 to-electric-blue/10 ${tints[tint]}`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[18px] font-semibold tabular tracking-tight text-ink">
          {value}
        </span>
        <span className="text-[12px] uppercase tracking-[0.08em] text-ink-60">
          {label}
        </span>
      </div>
    </div>
  )
}
