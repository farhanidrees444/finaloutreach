"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { ScarcityBadge } from "./scarcity-badge"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"

const headlineLines = [
  ["We", "book", "qualified", "sales"],
  ["meetings", "for", "B2B", "teams", "that"],
  ["__actually", "want", "to", "grow."],
]

// Word reveal — each word slides up behind a clip mask. The parent <span>
// uses overflow-hidden so the pre-animation position is invisible.
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
    <section className="noise-bg relative isolate overflow-hidden pb-16 pt-20 sm:pt-28 md:pb-20 md:pt-32">
      {/* Single restrained background — emerald + gold drift only */}
      <HeroBackground />

      {/* Subtle grid framing */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <ScarcityBadge />
        </motion.div>

        <h1 className="mt-7 max-w-[18ch] text-balance text-[44px] font-medium leading-[1.02] tracking-display text-ink sm:text-[64px] md:text-[80px] lg:text-[88px]">
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden pb-[0.04em]">
              <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] gap-y-1">
                {line.map((word) => {
                  const isItalic = word.startsWith("__")
                  const display = isItalic ? word.slice(2) : word
                  const i = wordIndex++
                  return (
                    <motion.span
                      key={`${lineIdx}-${i}`}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariants}
                      className={
                        isItalic
                          ? "inline-block font-serif-italic text-[1.08em] text-emerald-dark"
                          : "inline-block"
                      }
                    >
                      {display}
                    </motion.span>
                  )
                })}
              </span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-8 max-w-2xl text-pretty text-[17px] leading-[1.6] text-ink-60 sm:text-[19px]"
        >
          FinalOutreach is the cold outreach partner trusted by 200+ B2B
          companies to fill their pipelines with high-intent prospects —
          without burning sender reputation or wasting SDR time.
        </motion.p>

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
      </div>
    </section>
  )
}
