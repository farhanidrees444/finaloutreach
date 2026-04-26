"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

type Slot = { day: string; date: string; times: string[] }

const TIMES_BY_INDEX: string[][] = [
  ["10:00", "13:30", "15:00"],
  ["09:00", "11:30", "16:00"],
  ["10:30", "14:00"],
]

function nextWeekdays(count: number, fromDate: Date = new Date()): Slot[] {
  const slots: Slot[] = []
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  const cursor = new Date(fromDate)
  cursor.setDate(cursor.getDate() + 1) // start tomorrow
  while (slots.length < count) {
    const dow = cursor.getDay()
    if (dow !== 0 && dow !== 6) {
      slots.push({
        day: dayLabels[dow],
        date: `${monthLabels[cursor.getMonth()]} ${String(cursor.getDate()).padStart(2, "0")}`,
        times: TIMES_BY_INDEX[slots.length] ?? ["10:00", "14:00"],
      })
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return slots
}

export function FinalCta() {
  // Render placeholder labels server-side, then swap to live dates client-side.
  // This avoids hydration mismatches from `new Date()` inside render.
  const [slots, setSlots] = useState<Slot[]>([
    { day: "—", date: "—", times: TIMES_BY_INDEX[0] },
    { day: "—", date: "—", times: TIMES_BY_INDEX[1] },
    { day: "—", date: "—", times: TIMES_BY_INDEX[2] },
  ])
  useEffect(() => {
    setSlots(nextWeekdays(3))
  }, [])

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-ink text-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(232,181,71,0.25), transparent 40%)",
        }}
      />
      <div className="noise-bg mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-white/60">
              <span className="size-1.5 rounded-full bg-[oklch(0.7_0.18_145)] pulse-dot" />
              Limited slots this quarter
            </span>
            <h2 className="mt-7 max-w-[16ch] text-balance text-[44px] font-medium leading-[1.02] tracking-display text-background sm:text-[64px] md:text-[80px]">
              Your next 50 meetings are{" "}
              <span className="font-serif-italic text-amber">
                one call
              </span>{" "}
              away.
            </h2>
            <p className="mt-7 max-w-xl text-[16.5px] leading-[1.65] text-white/65 sm:text-[18px]">
              30-minute call. We'll tell you exactly what's possible for your
              business — even if you don't hire us.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-background px-7 text-[15.5px] font-medium text-ink transition-all hover:bg-background/90 active:scale-[0.98]"
              >
                Book your strategy call
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="text-[13px] text-white/50">
                No sales pitch. No pressure. Just clarity.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-white/60">
                <Calendar className="size-4" strokeWidth={1.7} />
                Available this week
              </div>
              <span className="text-[12px] text-white/40">PST</span>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {slots.map((s, idx) => (
                <div key={`${s.date}-${idx}`} className="flex flex-col gap-2.5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[15px] font-medium text-background">
                      {s.day}
                    </span>
                    <span className="text-[12.5px] text-white/45">
                      {s.date}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.times.map((t) => (
                      <Link
                        key={t}
                        href="/contact"
                        className="h-9 inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3.5 text-[13px] font-medium tabular text-background transition-colors hover:border-white/40 hover:bg-white/[0.08]"
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 text-[12.5px] text-white/50">
              30 min · Google Meet · Confirmation email instantly
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
