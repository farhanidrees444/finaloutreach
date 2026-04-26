import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionEyebrowProps = {
  number?: string
  label?: string
  className?: string
  children?: ReactNode
}

export function SectionEyebrow({ number, label, className, children }: SectionEyebrowProps) {
  const text = children ?? label
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40",
        className,
      )}
    >
      {number && <span className="font-mono">{number}</span>}
      {number && <span className="h-px w-8 bg-ink-08" />}
      <span>{text}</span>
    </div>
  )
}
