"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { getAbbr } from "../utils/getAbbr";
import { getIntegrationIconPath } from "../utils/getIntegrationIconPath";
import Image from "next/image";

export type IntegrationSquareProps = {
  name: string;
  accent: string;
  active: boolean;
};

export function IntegrationSquare({ name, accent, active }: IntegrationSquareProps) {
  const abbr = getAbbr(name);
  const iconPath = getIntegrationIconPath(name);
  const tooltipId = useId();

  return (
    <div
      className={cn(
        "group relative h-[90%] w-[90%] bg-white/80 grid place-items-center select-none border border-[var(--od-dark-blue)]/10",
        active
          ? "shadow-[0_10px_34px_rgba(0,59,92,0.12)]"
          : "shadow-[0_8px_26px_rgba(15,23,42,0.08)]"
      )}
      aria-label={name}
      aria-describedby={tooltipId}
      tabIndex={0}
    >
      {/* Tooltip */}
      <div
        id={tooltipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-[110%]",
          "rounded-md bg-white/95 px-2.5 py-1",
          "border border-[var(--od-dark-blue)]/12 shadow-[0_10px_30px_rgba(0,59,92,0.10)]",
          "text-[11px] font-lato text-[var(--od-dark-blue)] tracking-wide",
          "max-w-[180px] overflow-hidden",
          "opacity-0 scale-[0.98] transition duration-150",
          "group-hover:opacity-100 group-hover:scale-100",
          "group-focus-visible:opacity-100 group-focus-visible:scale-100"
        )}
      >
        <span className="block max-w-[180px] truncate">{name}</span>
      </div>

      <div className="grid place-items-center">
        {iconPath ? (
          <Image
            src={iconPath}
            alt={name}
            className="h-7 w-7 object-contain"
            width={220}
            height={220}
            loading="lazy"
          />
        ) : (
          <span className="font-sans text-[13px] font-semibold text-[var(--od-dark-blue)]">
            {abbr}
          </span>
        )}
      </div>
    </div>
  );
}
