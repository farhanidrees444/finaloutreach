import { cn } from "@/lib/utils"

export function ScarcityBadge({
  children = "Now booking — limited spots this quarter",
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-ink-08 bg-background/70 px-3.5 py-1.5 text-[13px] font-medium text-ink-60 backdrop-blur",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pulse-dot size-1.5 rounded-full bg-[oklch(0.65_0.18_145)]"
      />
      <span className="tracking-tight">{children}</span>
    </div>
  )
}
