import React from "react";

function Dot({ className }: { className: string }) {
  return (
    <div className={"absolute " + className} aria-hidden="true">
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full border border-od-mid-blue/15 bg-od-mid-blue/5 animate-ping" />
        <span className="h-1.5 w-1.5 rounded-full bg-od-bright-blue/50 animate-pulse" />
      </span>
    </div>
  );
}

export function CornerPulseDots({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={"pointer-events-none absolute inset-0 z-20 " + className} aria-hidden="true">
      <Dot className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <Dot className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
      <Dot className="left-0 bottom-0 -translate-x-1/2 translate-y-1/2" />
      <Dot className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
    </div>
  );
}