"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"

const TEAM = [
  {
    name: "Marcus Chen",
    role: "Founder & strategy",
    img: "/founder.jpg",
    years: 9,
    specialty: "ICP & offer architecture",
    linkedin: "#",
  },
  {
    name: "Sarah Patel",
    role: "Head of copy",
    img: "/team-1.jpg",
    years: 7,
    specialty: "Conversion copywriting",
    linkedin: "#",
  },
  {
    name: "James O'Brien",
    role: "Deliverability lead",
    img: "/team-2.jpg",
    years: 8,
    specialty: "Domain & sender health",
    linkedin: "#",
  },
  {
    name: "Elena Volkov",
    role: "Account director",
    img: "/team-3.jpg",
    years: 6,
    specialty: "Campaign strategy",
    linkedin: "#",
  },
  {
    name: "David Kim",
    role: "Senior SDR",
    img: "/team-4.jpg",
    years: 5,
    specialty: "Reply handling & qualification",
    linkedin: "#",
  },
] as const

export function FounderStory() {
  return (
    <section id="about" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionEyebrow number="06" label="About" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_460px] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <h2 className="text-balance text-[40px] font-medium leading-[1.05] tracking-display text-ink sm:text-[52px]">
              Built by operators who&apos;ve sent{" "}
              <span className="font-serif-italic text-[oklch(0.55_0.13_78)]">
                5M+
              </span>{" "}
              cold emails.
            </h2>

            <div className="mt-8 flex max-w-xl flex-col gap-5 text-[16px] leading-[1.7] text-ink-60">
              <p className="drop-cap text-ink-60">
                FinalOutreach started in a tiny Brooklyn office in 2021. We
                were running outbound for a Series-B SaaS, watching agency
                after agency take a retainer and deliver excuses. So we built
                what we wished existed — a partner that ships meetings, not
                slide decks.
              </p>
              <p>
                Five years later, we&apos;ve sent over 5M cold emails, booked
                12,400+ meetings, and generated $47M in client pipeline. We
                still keep the roster small. We still take the calls
                ourselves. We still measure success the only way that matters:
                meetings on calendars.
              </p>
            </div>

            <figure className="mt-10 max-w-xl border-l-2 border-ink/80 pl-6">
              <blockquote className="font-serif-italic text-[24px] leading-[1.3] text-ink sm:text-[28px]">
                &ldquo;We built FinalOutreach because we got tired of agencies
                that promise meetings and deliver excuses.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[13px] uppercase tracking-[0.14em] text-ink-40">
                Marcus Chen — Founder
              </figcaption>
            </figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream">
              <Image
                src="/founder.jpg"
                alt="Marcus Chen, founder of FinalOutreach"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                priority={false}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-ink-08 bg-background px-4 py-3 shadow-sm">
              <span className="grid size-8 place-items-center rounded-md bg-ink text-background">
                <span className="block size-1.5 rounded-[1.5px] bg-amber" />
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-ink">
                  Marcus Chen
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-40">
                  Founder
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team grid */}
        <div className="mt-20 border-t border-ink-08 pt-12">
          <div className="flex items-end justify-between">
            <h3 className="text-[14px] uppercase tracking-[0.18em] text-ink-40">
              The team
            </h3>
            <p className="hidden text-[12.5px] text-ink-40 sm:block">
              Hover to see specialty &amp; experience
            </p>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
            {TEAM.map((m, i) => (
              <motion.li
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-cream">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  {/* Reveal overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-3 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <p className="text-[11.5px] uppercase tracking-[0.16em] text-background/70">
                      Specialty
                    </p>
                    <p className="text-[12.5px] font-medium leading-tight text-background">
                      {m.specialty}
                    </p>
                  </div>
                  {/* LinkedIn */}
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="absolute right-2 top-2 grid size-8 translate-y-1 place-items-center rounded-full bg-background/90 text-ink opacity-0 backdrop-blur transition-all duration-300 hover:bg-background group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Linkedin className="size-3.5" />
                  </a>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <p className="text-[14px] font-medium text-ink">
                    {m.name}
                  </p>
                  <p className="font-mono text-[10.5px] text-ink-40">
                    {m.years}y
                  </p>
                </div>
                <p className="text-[12.5px] text-ink-60">{m.role}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
