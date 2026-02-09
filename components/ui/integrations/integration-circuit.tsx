"use client";

import React, {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CATEGORY_CONFIG } from "./config";
import { CoreNode } from "./nodes/core-node";
import { CategoryNode } from "./nodes/category-node";
import { IntegrationSquare } from "./nodes/integration-square";

export interface IntegrationCircuitProps {
  data: Record<string, string[]>;
}

export function IntegrationCircuit({ data }: IntegrationCircuitProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeIntegrationKey, setActiveIntegrationKey] =
    useState<string | null>(null);
  const [activeIntegrationSolidPath, setActiveIntegrationSolidPath] =
    useState<string | null>(null);

  const rawPulseId = useId();
  const pulseIdSafe = useMemo(
    () => `od-pulse-${rawPulseId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawPulseId]
  );

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const integrationRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [connectorLines, setConnectorLines] = useState<
    Array<{ key: string; x1: number; y1: number; x2: number; y2: number }>
  >([]);
  const [categoryBusPaths, setCategoryBusPaths] = useState<
    Array<{ key: string; categoryKey: string; d: string }>
  >([]);
  const [integrationDropPaths, setIntegrationDropPaths] = useState<
    Array<{ key: string; categoryKey: string; d: string }>
  >([]);

  const topPadRows = 1;
  const bottomPadRows = 1;
  const cellPadding = 0; // 0-cell spacing between placed nodes

  const tracks = useMemo(() => {
    return Object.entries(data)
      .map(([key, items]) => {
        const cfg = CATEGORY_CONFIG[key];
        if (!cfg) return null;
        return { key, ...cfg, items };
      })
      .filter(Boolean) as Array<
      {
        key: string;
        items: string[];
      } & (typeof CATEGORY_CONFIG)[string]
    >;
  }, [data]);

  // --- Horizontal layout (matches reference) ---
  // Core hub on the left, categories as a vertical column, integrations as rows to the right.
  const coreSpan = 3; // 3x3 hub
  const categorySpan = 2; // 2x2 category blocks
  const bandRows = 2; // matches categorySpan height
  const bandGapRows = 0; // 0 rows between categories

  // Shift the entire diagram right by 1 cell.
  const coreColStart = 2;
  // Add a cell gap between the core node and the category column.
  const coreGapCols = 1;
  const categoryColStart = coreColStart + coreSpan + coreGapCols;

  const categoryGapCols = 1;
  const integrationColStart = categoryColStart + categorySpan + categoryGapCols;

  const totalCols = 18;
  const integrationCols = Math.max(1, totalCols - integrationColStart + 1);
  const cellsPerBandRow = integrationCols;

  const bandStackRows =
    tracks.length * bandRows + Math.max(0, (tracks.length - 1) * bandGapRows);
  const totalRows = topPadRows + bandStackRows + bottomPadRows;

  // Vertically center the core relative to the category stack.
  const coreRowStart =
    topPadRows + Math.max(0, Math.floor((bandStackRows - coreSpan) / 2)) + 1;

  const measureConnectors = useCallback(() => {
    const canvasEl = canvasRef.current;
    const coreEl = coreRef.current;
    if (!canvasEl || !coreEl) return;

    const canvasRect = canvasEl.getBoundingClientRect();
    const coreRect = coreEl.getBoundingClientRect();

    const cellH = canvasRect.height / totalRows;

    const coreX = coreRect.right - canvasRect.left;
    const coreY = coreRect.top - canvasRect.top + coreRect.height / 2;

    const nextLines: Array<{
      key: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];

    for (const track of tracks) {
      const catEl = categoryRefs.current[track.key];
      if (!catEl) continue;

      const catRect = catEl.getBoundingClientRect();
      const catX = catRect.left - canvasRect.left + catRect.width / 2;
      const catY = catRect.top - canvasRect.top + catRect.height / 2;

      nextLines.push({
        key: track.key,
        // Flow direction: category -> core
        x1: catX,
        y1: catY,
        x2: coreX,
        y2: coreY,
      });
    }

    const nextSize = { width: canvasRect.width, height: canvasRect.height };
    setCanvasSize((prev) =>
      prev.width !== nextSize.width || prev.height !== nextSize.height ? nextSize : prev
    );
    setConnectorLines(nextLines);

    // Integration -> Category routing
    // To keep dashed lines readable (avoid many overlapping horizontals), we draw:
    // - 1 horizontal "bus" per integration row
    // - a vertical drop from each integration into its row bus (half-cell)
    // - 1 shared vertical trunk from the lowest bus into the category center
    const nextBusPaths: Array<{ key: string; categoryKey: string; d: string }> = [];
    const nextDropPaths: Array<{ key: string; categoryKey: string; d: string }> = [];

    let nextActiveSolidPath: string | null = null;

    for (const track of tracks) {
      const catEl = categoryRefs.current[track.key];
      if (!catEl) continue;
      const catRect = catEl.getBoundingClientRect();

      // Connect into the center of the 2x2 category block (line goes behind it).
      const catX = catRect.left - canvasRect.left + catRect.width / 2;
      const catY = catRect.top - canvasRect.top + catRect.height / 2;

      // Only the integrations we actually render (same slice logic as render).
      const maxItems = cellsPerBandRow * bandRows;
      const bandItems = track.items.slice(0, maxItems);

      const points: Array<{ key: string; row: number; x0: number; y0: number }> = [];
      const rowStats = new Map<number, { maxX: number; maxY: number }>();

      for (let i = 0; i < bandItems.length; i++) {
        const name = bandItems[i];
        const key = `${track.key}:${name}:${i}`;
        const el = integrationRefs.current[key];
        if (!el) continue;

        const row = Math.floor(i / cellsPerBandRow);

        const r = el.getBoundingClientRect();
        const x0 = r.left - canvasRect.left + r.width / 2;
        const y0 = r.bottom - canvasRect.top; // bottom-center of integration tile

        points.push({ key, row, x0, y0 });

        const prev = rowStats.get(row);
        if (!prev) {
          rowStats.set(row, { maxX: x0, maxY: y0 });
        } else {
          rowStats.set(row, {
            maxX: Math.max(prev.maxX, x0),
            maxY: Math.max(prev.maxY, y0),
          });
        }
      }

      if (points.length === 0 || rowStats.size === 0) {
        continue;
      }

      const rows = Array.from(rowStats.keys()).sort((a, b) => a - b);
      const rowBusY = new Map<number, number>();
      for (const row of rows) {
        const stats = rowStats.get(row);
        if (!stats) continue;
        // Bus sits half a cell below this row's integration tiles.
        const busY = stats.maxY + cellH * 0.5;
        rowBusY.set(row, busY);

        nextBusPaths.push({
          key: `bus:${track.key}:r${row}`,
          categoryKey: track.key,
          // Flow direction: integrations -> category (right-to-left)
          d: `M ${stats.maxX} ${busY} L ${catX} ${busY}`,
        });
      }

      // Shared trunk into the category center.
      const lowestRow = rows[rows.length - 1];
      const lowestBusY = rowBusY.get(lowestRow);
      if (lowestBusY !== undefined) {
        let trunkD = "";
        for (const row of rows) {
          if (row === lowestRow) continue;
          const y = rowBusY.get(row);
          if (y === undefined) continue;
          trunkD += `M ${catX} ${y} L ${catX} ${lowestBusY} `;
        }
        trunkD += `M ${catX} ${lowestBusY} L ${catX} ${catY}`;
        nextBusPaths.push({
          key: `trunk:${track.key}`,
          categoryKey: track.key,
          d: trunkD,
        });
      }

      // Vertical drops from each integration into its row bus.
      for (const p of points) {
        const busY = rowBusY.get(p.row);
        if (busY === undefined) continue;

        nextDropPaths.push({
          key: `drop:${p.key}`,
          categoryKey: track.key,
          d: `M ${p.x0} ${p.y0} L ${p.x0} ${busY}`,
        });

        if (activeIntegrationKey && p.key === activeIntegrationKey) {
          // Solid highlight route for hovered integration.
          // Keep geometry consistent with the dashed routing (bus row -> shared trunk -> category center).
          const trunkY = lowestBusY ?? catY;
          nextActiveSolidPath = `M ${p.x0} ${p.y0} L ${p.x0} ${busY} L ${catX} ${busY} L ${catX} ${trunkY} L ${catX} ${catY}`;
        }
      }
    }
    setCategoryBusPaths(nextBusPaths);
    setIntegrationDropPaths(nextDropPaths);
    setActiveIntegrationSolidPath(nextActiveSolidPath);
  }, [activeIntegrationKey, bandRows, cellsPerBandRow, totalRows, tracks]);

  useLayoutEffect(() => {
    let rafId = 0;
    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureConnectors);
    };

    schedule();

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ro = new ResizeObserver(schedule);
    ro.observe(canvasEl);

    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [measureConnectors]);

  const cellSize = "clamp(60px, 5.4vw, 64px)";
  const vars = {
    "--cell": cellSize,
  } as React.CSSProperties;

  const gridStyle = {
    ...vars,
    gridTemplateColumns: `repeat(${totalCols}, var(--cell))`,
    gridTemplateRows: `repeat(${totalRows}, var(--cell))`,
  } as React.CSSProperties;

  const activeCategoryLine = useMemo(() => {
    if (!activeCategory) return null;
    return connectorLines.find((x) => x.key === activeCategory) ?? null;
  }, [activeCategory, connectorLines]);

  const activePulsePathD = useMemo(() => {
    if (!activeCategoryLine) return null;

    // If hovering an integration: pulse flows integration -> category -> core.
    if (activeIntegrationSolidPath) {
      return `${activeIntegrationSolidPath} L ${activeCategoryLine.x2} ${activeCategoryLine.y2}`;
    }

    // If hovering a category: pulse flows category -> core.
    return `M ${activeCategoryLine.x1} ${activeCategoryLine.y1} L ${activeCategoryLine.x2} ${activeCategoryLine.y2}`;
  }, [activeCategoryLine, activeIntegrationSolidPath]);

  return (
    <div className="w-full relative overflow-hidden" style={vars}>
      <div className="relative z-10 w-full">
        <div className="overflow-x-auto flex justify-center md:justify-center">
          <div className="inline-block px-4 py-8">
            <div className="relative" ref={canvasRef}>
              {/* Base cells */}
              <div className="grid" style={gridStyle}>
                {Array.from({ length: totalCols * totalRows }).map((_, idx) => (
                  <div key={idx} className="bg-white/70" />
                ))}
              </div>

              {/* Grid lines (single-stroke; avoids double borders) */}
              <div
                className="absolute inset-0 pointer-events-none z-[1] border border-gray-200"
                style={{
                  // Internal gridlines only (no top/left edge), plus a single outer outline.
                  backgroundImage: `repeating-linear-gradient(to right, transparent 0, transparent calc(var(--cell) - 1px), rgba(0,59,92,0.10) calc(var(--cell) - 1px), rgba(0,59,92,0.10) var(--cell)), repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--cell) - 1px), rgba(0,59,92,0.10) calc(var(--cell) - 1px), rgba(0,59,92,0.10) var(--cell))`,                }}
              />

              {/* Connector lines */}
              <svg
                className="absolute inset-0 z-[5] pointer-events-none"
                width={canvasSize.width}
                height={canvasSize.height}
                viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
                preserveAspectRatio="none"
              >
                {categoryBusPaths.map((p) => (
                  <path
                    key={p.key}
                    d={p.d}
                    fill="none"
                    className="od-dash-flow"
                    stroke="#003B5C"
                    strokeOpacity={0.25}
                    strokeWidth={1.5}
                    strokeDasharray="6 8"
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {integrationDropPaths.map((p) => (
                  <path
                    key={p.key}
                    d={p.d}
                    fill="none"
                    className="od-dash-flow"
                    stroke="#003B5C"
                    strokeOpacity={0.25}
                    strokeWidth={1.5}
                    strokeDasharray="6 8"
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {connectorLines.map((l) => (
                  <line
                    key={l.key}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    className="od-dash-flow"
                    stroke="#003B5C"
                    strokeOpacity={activeCategory && l.key === activeCategory ? 0 : 0.35}
                    strokeWidth={1.5}
                    strokeDasharray="6 8"
                    strokeDashoffset={0}
                    strokeLinecap="round"
                  />
                ))}

                {/* Solid hover highlight (covers dashed completely) */}
                {activeIntegrationSolidPath ? (
                  <>
                    <path
                      d={activeIntegrationSolidPath}
                      fill="none"
                      stroke="white"
                      strokeOpacity={1}
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={activeIntegrationSolidPath}
                      fill="none"
                      stroke="var(--od-mid-blue)"
                      strokeOpacity={1}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ) : null}

                {activeCategoryLine ? (
                  <>
                    <line
                      x1={activeCategoryLine.x1}
                      y1={activeCategoryLine.y1}
                      x2={activeCategoryLine.x2}
                      y2={activeCategoryLine.y2}
                      stroke="white"
                      strokeOpacity={1}
                      strokeWidth={5}
                      strokeLinecap="round"
                    />
                    <line
                      x1={activeCategoryLine.x1}
                      y1={activeCategoryLine.y1}
                      x2={activeCategoryLine.x2}
                      y2={activeCategoryLine.y2}
                      stroke="var(--od-mid-blue)"
                      strokeOpacity={1}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    />
                  </>
                ) : null}

                {/* Pulse signal flowing along the active route */}
                {activePulsePathD ? (
                  <>
                    <defs>
                      <path id={`${pulseIdSafe}-path`} d={activePulsePathD} />
                      <mask id={`${pulseIdSafe}-mask`} maskUnits="userSpaceOnUse">
                        <rect
                          x={0}
                          y={0}
                          width={canvasSize.width}
                          height={canvasSize.height}
                          fill="black"
                        />
                        <path
                          d={activePulsePathD}
                          fill="none"
                          stroke="white"
                          strokeWidth={3.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <filter
                        id={`${pulseIdSafe}-glow`}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="48" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="1.4 0 0 0 0  0 1.4 0 0 0  0 0 1.4 0 0  0 0 0 1.6 0"
                          result="brightBlur"
                        />
                        <feMerge>
                          <feMergeNode in="brightBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <g
                      className="od-pulse"
                      mask={`url(#${pulseIdSafe}-mask)`}
                    >
                      {/* Outer halo (bright + blurred) */}
                      <ellipse
                        rx={22}
                        ry={7.5}
                        fill="var(--od-bright-blue)"
                        filter={`url(#${pulseIdSafe}-glow)`}
                        opacity={0}
                      >
                        <animate
                          attributeName="opacity"
                          dur="2.0s"
                          repeatCount="indefinite"
                          values="0;0.85;0.85;0"
                          keyTimes="0;0.07;0.92;1"
                        />
                        <animate
                          attributeName="rx"
                          dur="2.0s"
                          repeatCount="indefinite"
                          values="16;32;28;16"
                          keyTimes="0;0.07;0.92;1"
                        />
                        <animate
                          attributeName="ry"
                          dur="2.0s"
                          repeatCount="indefinite"
                          values="5.5;10;9;5.5"
                          keyTimes="0;0.07;0.92;1"
                        />
                        <animateMotion
                          dur="2.0s"
                          repeatCount="indefinite"
                          rotate="auto"
                        >
                          <mpath href={`#${pulseIdSafe}-path`} />
                        </animateMotion>
                      </ellipse>

                      {/* White-hot core (extra contrast) */}
                      <ellipse rx={12} ry={3.5} fill="var(--od-bright-blue)" opacity={0}>
                        <animate
                          attributeName="opacity"
                          dur="2.0s"
                          repeatCount="indefinite"
                          values="0;0.65;0.65;0"
                          keyTimes="0;0.07;0.92;1"
                        />
                        <animate
                          attributeName="rx"
                          dur="2.0s"
                          repeatCount="indefinite"
                          values="9;18;16;9"
                          keyTimes="0;0.07;0.92;1"
                        />
                        <animate
                          attributeName="ry"
                          dur="2.0s"
                          repeatCount="indefinite"
                          values="2.6;4.2;3.8;2.6"
                          keyTimes="0;0.07;0.92;1"
                        />
                        <animateMotion
                          dur="2.0s"
                          repeatCount="indefinite"
                          rotate="auto"
                        >
                          <mpath href={`#${pulseIdSafe}-path`} />
                        </animateMotion>
                      </ellipse>
                    </g>
                  </>
                ) : null}

                {/* Connection node at the core anchor */}
                {connectorLines.length > 0 ? (
                  <>
                    <circle
                      cx={connectorLines[0].x2}
                      cy={connectorLines[0].y2}
                      r={7}
                      fill="white"
                      fillOpacity={0.95}
                    />
                    <circle
                      cx={connectorLines[0].x2}
                      cy={connectorLines[0].y2}
                      r={7}
                      fill="none"
                      stroke="#003B5C"
                      strokeOpacity={0.45}
                      strokeWidth={1.5}
                    />
                  </>
                ) : null}
              </svg>

              <style jsx>{`
                @keyframes od-dash-flow {
                  to {
                    stroke-dashoffset: -28;
                  }
                }

                .od-dash-flow {
                  animation: od-dash-flow 1.6s linear infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                  .od-dash-flow {
                    animation: none;
                  }

                  .od-pulse {
                    display: none;
                  }
                }
              `}</style>

              {/* Overlay content snapped to cells */}
              <div className="absolute inset-0 grid z-10" style={gridStyle}>
                {/* Core hub (3x3) */}
                <div
                  ref={coreRef}
                  style={{
                    gridColumn: `${coreColStart} / span ${coreSpan}`,
                    gridRow: `${coreRowStart} / span ${coreSpan}`,
                    padding: cellPadding,
                  }}
                >
                  <div className="h-full w-full grid place-items-center">
                    <CoreNode />
                  </div>
                </div>

                {/* Categories + Integration rows */}
                {tracks.map((track, bandIndex) => {
                  const rowStart =
                    topPadRows + bandIndex * (bandRows + bandGapRows) + 1;

                  const maxItems = cellsPerBandRow * bandRows;
                  const bandItems = track.items.slice(0, maxItems);

                  return (
                    <React.Fragment key={track.key}>
                      {/* Category block (2x2) */}
                      <div
                        ref={(el) => {
                          categoryRefs.current[track.key] = el;
                        }}
                        style={{
                          gridColumn: `${categoryColStart} / span ${categorySpan}`,
                          gridRow: `${rowStart} / span ${bandRows}`,
                          padding: cellPadding,
                        }}
                        onMouseEnter={() => setActiveCategory(track.key)}
                        onMouseLeave={() => {
                          setActiveCategory(null);
                          setActiveIntegrationKey(null);
                        }}
                      >
                        <div className="h-full w-full grid place-items-center">
                          <CategoryNode
                            icon={track.icon}
                            label={track.label}
                            accent={track.color}
                            active={activeCategory === track.key}
                          />
                        </div>
                      </div>

                      {/* Integrations (wrap across 1–2 rows) */}
                      {bandItems.map((name, i) => {
                        const localRow = Math.floor(i / cellsPerBandRow);
                        const localCol = i % cellsPerBandRow;
                        const integrationKey = `${track.key}:${name}:${i}`;

                        return (
                          <div
                            key={integrationKey}
                            ref={(el) => {
                              integrationRefs.current[integrationKey] = el;
                            }}
                            className="h-full w-full grid place-items-center"
                            style={{
                              gridColumn: `${integrationColStart + localCol} / span 1`,
                              gridRow: `${rowStart + localRow} / span 1`,
                              padding: cellPadding,
                            }}
                            onMouseEnter={() => {
                              setActiveCategory(track.key);
                              setActiveIntegrationKey(integrationKey);
                            }}
                            onMouseLeave={() => {
                              setActiveCategory(null);
                              setActiveIntegrationKey(null);
                            }}
                          >
                            <IntegrationSquare
                              name={name}
                              accent={track.color}
                              active={activeCategory === track.key}
                            />
                          </div>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
