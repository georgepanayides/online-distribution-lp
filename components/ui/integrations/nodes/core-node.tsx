"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function CoreNode() {
  return (
    <div
      className="relative grid place-items-center select-none"
      style={{ width: "calc(var(--cell) * 3)", height: "calc(var(--cell) * 3)" }}
    >
      <div
        className={cn(
          "h-[95%] w-[95%] rounded-sm bg-white",
          "border border-[var(--od-dark-blue)]/10",
          "shadow-[0_18px_55px_rgba(15,23,42,0.14)]"
        )}
        aria-label="Online Distribution core"
      >
        <div className="relative h-full w-full grid place-items-center">
          <div className="relative w-[42%] aspect-square">
            <Image
              src="/icons/Blue Cube - Colour.svg"
              alt="Core cube"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
