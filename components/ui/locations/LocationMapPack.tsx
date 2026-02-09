'use client';

import * as React from "react";

import { NzMap } from "./NzMap";

export type LocationPoint = {
  id: string;
  name: string;
  address: string;
  kind: "office" | "hub";
  city: "Auckland" | "Christchurch";
  phone?: string;
  email?: string;
};

type Pin = {
  id: string;
  kind: LocationPoint["kind"];
  city: LocationPoint["city"];
  x: number;
  y: number;
};

const MAP_VIEWBOX = {
  w: 701.42358,
  h: 988.42462,
} as const;

const CITY_REGION_ID: Record<LocationPoint["city"], string> = {
  Auckland: "NZ-AUK",
  Christchurch: "NZ-CAN",
} as const;

function spreadPosition(
  base: { x: number; y: number },
  loc: LocationPoint,
  indexWithinCity: number,
): { x: number; y: number } {
  const ring = Math.floor(indexWithinCity / 6);
  const step = indexWithinCity % 6;
  const angle = (Math.PI * 2 * step) / 6;

  const radius = loc.city === "Auckland" ? 14 : 12;
  const ringRadius = radius + ring * 9;

  // Bias office slightly “above” other points.
  const kindNudge = loc.kind === "office" ? { x: 4, y: -8 } : { x: 0, y: 0 };

  return {
    x: base.x + Math.cos(angle) * ringRadius + kindNudge.x,
    y: base.y + Math.sin(angle) * ringRadius + kindNudge.y,
  };
}

export function LocationMapPack({
  locations,
}: {
  locations: LocationPoint[];
  className?: string;
}) {
  const mapRef = React.useRef<SVGSVGElement | null>(null);
  const [anchors, setAnchors] = React.useState<
    Record<LocationPoint["city"], { x: number; y: number }> | null
  >(null);

  React.useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;

    let raf = 0;
    const compute = () => {
      if (!mapRef.current) return;
      const next: Record<LocationPoint["city"], { x: number; y: number }> = {
        Auckland: { x: 385, y: 190 },
        Christchurch: { x: 275, y: 610 },
      };

      (Object.keys(CITY_REGION_ID) as LocationPoint["city"][]).forEach((city) => {
        const id = CITY_REGION_ID[city];
        const el = mapRef.current?.querySelector<SVGGraphicsElement>(`#${id}`);
        if (!el) return;

        try {
          const bb = el.getBBox();
          // Slightly bias toward “major city” areas within the region.
          const bias = city === "Auckland" ? { x: 0.62, y: 0.42 } : { x: 0.64, y: 0.45 };
          next[city] = {
            x: bb.x + bb.width * bias.x,
            y: bb.y + bb.height * bias.y,
          };
        } catch {
          // getBBox can throw in some edge cases; keep fallbacks.
        }
      });

      setAnchors(next);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    schedule();
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const pins = React.useMemo<Pin[]>(() => {
    const indexByCity: Record<LocationPoint["city"], number> = {
      Auckland: 0,
      Christchurch: 0,
    };

    return locations.map((loc) => {
      const i = indexByCity[loc.city]++;
      const base = anchors?.[loc.city] ??
        (loc.city === "Auckland" ? { x: 385, y: 190 } : { x: 275, y: 610 });
      const { x, y } = spreadPosition(base, loc, i);
      return { id: loc.id, kind: loc.kind, city: loc.city, x, y };
    });
  }, [anchors, locations]);

  return (
    <div>
      <div className="relative w-full h-300">
        <NzMap
          ref={mapRef}
          className="absolute inset-0 h-full w-full scale-[1.60] -translate-x-[2%] -translate-y-[2%]"
          aria-hidden="true"
        />

        {/* Pin overlay (basic scaffold; no interactivity yet) */}
        <svg
          viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.60] -translate-x-[2%] -translate-y-[2%]"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="od-pinGlow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {pins.map((p) => {
            const baseFill =
              p.kind === "office" ? "var(--od-dark-blue)" : "var(--od-mid-blue)";

            return (
              <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                <circle r={11} fill="transparent" />
                <circle r={6} fill={baseFill} filter="url(#od-pinGlow)" />
                <circle r={2.3} fill="white" />
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/55" />
      </div>
    </div>
  );
}
