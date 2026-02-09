
import { cn } from "@/lib/utils"

export function SectionKicker({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center border border-[var(--od-dark-blue)]/10 bg-transparent px-3 py-1.5",
        className
      )}
    >
      <span className="text-[11px] font-bold uppercase tracking-widest text-od-mid-blue">
        {label}
      </span>
    </div>
  )
}
