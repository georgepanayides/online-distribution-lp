"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export function Toast({
  label,
  subLabel,
  type = "info",
  position = "absolute",
  className,
}: {
  label: string;
  subLabel?: string;
  type?: "info" | "success" | "error";
  position?: "absolute" | "stack";
  className?: string;
}) {
  const tone =
    type === "success"
      ? {
          icon: CheckCircle2,
          iconFg: "text-green-700",
        }
      : type === "error"
        ? {
            icon: AlertCircle,
            iconFg: "text-rose-700",
          }
        : {
            icon: Info,
            iconFg: "text-od-bright-blue",
          };

  const Icon = tone.icon;
  const positioning =
    position === "absolute"
      ? "absolute top-6 left-1/2 -translate-x-1/2"
      : "relative";

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 34 }}
      role="status"
      aria-live="polite"
      className={`${positioning} bg-white/90 backdrop-blur-md border border-od-dark-blue/10 rounded-sm py-2 px-3 shadow-lg flex items-center gap-3 z-50 whitespace-nowrap ${className ?? ""}`}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} className={tone.iconFg} strokeWidth={2} />
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-bold text-od-dark-blue leading-none">{label}</span>
        {subLabel && (
          <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
            {subLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function StatusBadge({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/5 rounded-xs backdrop-blur-sm border border-slate-900/5"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-od-mid-blue animate-pulse" />
      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">
        {label}
      </span>
    </motion.div>
  );
}
