import React from "react";

function Dot({ className }: { className: string }) {
  return (
    <div className={"absolute " + className} aria-hidden="true">
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full border border-od-mid-blue/15 bg-od-mid-blue/5 animate-ping" />
        <span className="h-1.5 w-1.5 rounded-full bg-od-bright-blue/50 animate-pulse" />
      </span>
    </div>
  );
}

/**
 * 6-dot overlay for a 2x1 bento: 4 corners + 2 divider T-junctions.
 * - Mobile (stacked): divider is horizontal -> dots at left-mid + right-mid.
 * - Desktop (lg+): divider is vertical -> dots at top-mid + bottom-mid.
 */
export function BentoIntersectionDots({ className = "" }: { className?: string }) {
  return (
    <div
      className={"pointer-events-none absolute inset-0 z-20 " + className}
      aria-hidden="true"
    >
      {/* 4 corners */}
      <Dot className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <Dot className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
      <Dot className="left-0 bottom-0 -translate-x-1/2 translate-y-1/2" />
      <Dot className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

      {/* Divider T-joins */}
      <Dot className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden" />
      <Dot className="right-0 top-1/2 translate-x-1/2 -translate-y-1/2 lg:hidden" />

      <Dot className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
      <Dot className="left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 hidden lg:block" />
    </div>
  );
}
