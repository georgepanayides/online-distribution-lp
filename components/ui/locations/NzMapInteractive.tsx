"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FloatingPortal,
  offset,
  flip,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  autoUpdate,
} from "@floating-ui/react";

import { cn } from "@/lib/utils";
import { NzMap, type NzMapLocation } from "@/components/ui/locations/NzMap";

type NzMapInteractiveProps = {
  locations: NzMapLocation[];
  className?: string;
  mapClassName?: string;
  defaultSelectedId?: string;
};

export function NzMapInteractive({
  locations,
  className,
  mapClassName,
  defaultSelectedId,
}: NzMapInteractiveProps) {
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  const [selectedId, setSelectedId] = React.useState<string | null>(defaultSelectedId ?? null);
  const [referenceEl, setReferenceEl] = React.useState<Element | null>(null);
  const [floatingEl, setFloatingEl] = React.useState<HTMLElement | null>(null);

  const selected = React.useMemo(
    () => locations.find((l) => l.id === selectedId) ?? null,
    [locations, selectedId],
  );

  const open = Boolean(selectedId);

  const { x, y, strategy, context, placement } = useFloating({
    open,
    onOpenChange: (nextOpen) => {
      if (!nextOpen) setSelectedId(null);
    },
    placement: "top",
    strategy: "fixed",
    middleware: [
      offset(14),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: referenceEl,
      floating: floatingEl,
    },
  });

  const dismiss = useDismiss(context, {
    referencePress: false,
    outsidePressEvent: "click",
  });
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  React.useEffect(() => {
    if (!selectedId) {
      setReferenceEl(null);
      return;
    }

    const svg = svgRef.current;
    if (!svg) return;

    const marker = svg.querySelector<SVGGElement>(`[data-pin-id=\"${CSS.escape(selectedId)}\"]`);
    if (!marker) return;

    const anchor = marker.querySelector<Element>("[data-pin-anchor='true']");
    setReferenceEl(anchor ?? marker);
  }, [selectedId]);

  return (
    <div className={cn("relative", className)}>
      <NzMap
        ref={svgRef}
        locations={locations}
        onPinClick={(pin, event) => {
          const anchor = event.currentTarget.querySelector<Element>("[data-pin-anchor='true']");
          setReferenceEl(anchor ?? event.currentTarget);
          setSelectedId(pin.id);
        }}
        className={cn("h-full w-full", mapClassName)}
        aria-label="New Zealand map with locations"
      />

      <AnimatePresence>
        {selected ? (
          <FloatingPortal>
            <motion.div
              key={selected.id}
              ref={setFloatingEl}
              className="z-[30]"
              style={{
                position: strategy,
                left: x ?? 0,
                top: y ?? 0,
              }}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 520, damping: 40 }}
              {...getFloatingProps({
                onPointerDown: (e) => e.stopPropagation(),
              })}
            >
              <div className="relative w-[260px] rounded-2xl border border-black/10 bg-white/85 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.18)] overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-od-gradient" />

                {/* caret */}
                <div
                  className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border border-black/10 bg-white/85"
                  style={{
                    top: placement.startsWith("bottom") ? -6 : "auto",
                    bottom: placement.startsWith("top") ? -6 : "auto",
                  }}
                />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-sans font-semibold text-[color:var(--od-dark-blue)] leading-tight truncate">
                        {selected.name}
                      </p>
                      <p className="mt-1 font-lato text-sm text-gray-600 leading-snug">
                        {selected.address}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label="Close location details"
                      className="shrink-0 cursor-pointer rounded-md px-2 py-1 text-xs font-sans font-semibold text-[color:var(--od-dark-blue)]/70 hover:text-[color:var(--od-dark-blue)] hover:bg-black/5"
                      onClick={() => setSelectedId(null)}
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md border border-black/10 bg-white/70 px-2 py-1 text-[11px] font-sans font-semibold tracking-wide text-[color:var(--od-dark-blue)]/80">
                      {selected.city}
                    </span>
                    <span className="inline-flex items-center rounded-md border border-black/10 bg-white/70 px-2 py-1 text-[11px] font-sans font-semibold tracking-wide text-[color:var(--od-dark-blue)]/80">
                      {selected.kind === "office" ? "Office" : "Hub"}
                    </span>
                  </div>

                  {(selected.phone || selected.email) && (
                    <div className="mt-3 space-y-1">
                      {selected.phone ? (
                        <p className="font-lato text-sm text-gray-700">
                          <span className="font-sans font-semibold text-[color:var(--od-dark-blue)]/80">T:</span>{" "}
                          {selected.phone}
                        </p>
                      ) : null}
                      {selected.email ? (
                        <p className="font-lato text-sm text-gray-700 break-all">
                          <span className="font-sans font-semibold text-[color:var(--od-dark-blue)]/80">E:</span>{" "}
                          {selected.email}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>

              {/* Keep a tiny placement hint for motion direction if you ever want it */}
              <span className="sr-only">{placement}</span>
            </motion.div>
          </FloatingPortal>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
