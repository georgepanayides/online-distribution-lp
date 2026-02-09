"use client";

import type React from "react";
import { cn } from "@/lib/utils";

export type CategoryNodeProps = {
  icon: React.ElementType;
  label: string;
  accent: string;
  active: boolean;
};

export function CategoryNode({ icon: Icon, label, accent, active }: CategoryNodeProps) {
  return (
    <div
      className={cn(
        "relative h-[75%] w-[75%] rounded-[3px] bg-white/90 flex flex-col items-center justify-center gap-2 select-none",
        "border border-[var(--od-dark-blue)]/10",
        active
          ? "shadow-[0_18px_55px_rgba(0,59,92,0.16)]"
          : "shadow-[0_14px_44px_rgba(15,23,42,0.10)]"
      )}
      aria-label={label}
      title={label}
    >
      <div
        className={cn(
          "h-12 w-12 rounded-[2px] border border-[var(--od-dark-blue)]/10 grid place-items-center",
          active ? "bg-[rgba(123,175,212,0.22)]" : "bg-[rgba(123,175,212,0.16)]"
        )}
      >
        <Icon className={cn("w-6 h-6", active ? "text-od-mid-blue" : "text-slate-600")} />
      </div>

      <div
        className="font-lato text-[10px] leading-tight text-center max-w-[88%] uppercase tracking-wider"
        style={{ color: active ? accent : "rgba(15,23,42,0.72)" }}
      >
        {label}
      </div>
    </div>
  );
}
