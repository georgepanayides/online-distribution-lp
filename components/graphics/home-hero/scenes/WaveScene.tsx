"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type WaveStage = "loading" | "done" | "grid";

function WaveGridGlyph() {
  // 4 columns × 4-5 rows; each row defines where it starts and how many cells.
  // Tiles stay fixed; we animate a single queue row that cycles.
  type Tone = "muted" | "active" | "accent";
  type Row = { startCol: 0 | 1 | 2 | 3; count: 1 | 2 | 3 | 4; tones?: Tone[] };
  const rows = useMemo<Row[]>(
    () => [
      { startCol: 1, count: 3, tones: ["accent", "active"] },
      { startCol: 0, count: 2, tones: ["active", "muted"] },
      { startCol: 0, count: 3, tones: ["accent"] },
      { startCol: 1, count: 3 },
      { startCol: 0, count: 3 },
    ],
    [],
  );

  const tileClassByTone: Record<Tone, string> = {
    muted: "border-slate-200/80 bg-white/55",
    active: "border-od-dark-blue/30 bg-od-light-blue/10",
    accent: "border-od-bright-blue/35 bg-od-bright-blue/10",
  };

  const tileBaseClass =
    "absolute overflow-hidden rounded-none border backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.75),_0_10px_18px_rgba(15,23,42,0.10)]";

  const cellW = 26;
  const cellH = 34;
  const gap = 10;
  const pitchX = cellW + gap;
  const pitchY = cellH + gap;
  const cols = 4;
  const gridW = cellW * cols + gap * (cols - 1);
  const gridH = cellH * rows.length + gap * Math.max(0, rows.length - 1);

  const tiles = useMemo(() => {
    const out: Array<{ id: string; rowIndex: number; col: number; tone: Tone; index: number }> = [];
    let index = 0;
    rows.forEach((row, rowIndex) => {
      for (let i = 0; i < row.count; i += 1) {
        const col = row.startCol + i;
        const tone: Tone = row.tones?.[i] ?? (i === 0 ? "active" : "muted");
        out.push({ id: `r${rowIndex}-c${col}`, rowIndex, col, tone, index });
        index += 1;
      }
    });
    return out;
  }, [rows]);

  // Queue animation: all rows cycle, but we trigger them sequentially
  // in this order: row 1, row 5, row 3, row 2, row 4.
  type QueueItem = { id: string; tone: Tone };

  const slotColsByRow = useMemo(() => {
    return rows.map((row) => Array.from({ length: row.count }, (_, i) => row.startCol + i));
  }, [rows]);

  const tonesByRow = useMemo(() => {
    return rows.map((row) =>
      Array.from({ length: row.count }, (_, i) => row.tones?.[i] ?? (i === 0 ? "active" : "muted")),
    );
  }, [rows]);

  const rowOrder = useMemo(() => {
    // Convert the requested 1-based order to 0-based indices.
    const desired = [0, 4, 2, 1, 3];
    return desired.filter((idx) => idx >= 0 && idx < rows.length);
  }, [rows.length]);

  const nextId = useRef(0);
  const toneSeqByRow = useRef<number[]>([]);
  const stepRef = useRef(0);
  const timers = useRef<number[]>([]);

  const [queueByRow, setQueueByRow] = useState<Record<number, QueueItem[]>>(() => {
    const init: Record<number, QueueItem[]> = {};
    tonesByRow.forEach((tones, rowIndex) => {
      init[rowIndex] = tones.map((tone, idx) => ({ id: `q-r${rowIndex}-init-${idx}`, tone }));
    });
    return init;
  });

  useEffect(() => {
    toneSeqByRow.current = Array.from({ length: rows.length }, () => 0);
    stepRef.current = 0;

    timers.current.forEach((t) => {
      window.clearTimeout(t);
      window.clearInterval(t);
    });
    timers.current = [];

    if (rows.length === 0 || rowOrder.length === 0) return;

    const startDelayMs = 850;
    const beatMs = 1850;

    const start = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        const orderedRowIndex = rowOrder[stepRef.current % rowOrder.length]!;
        stepRef.current += 1;

        setQueueByRow((prev) => {
          const current = prev[orderedRowIndex] ?? [];
          if (current.length <= 1) return prev;

          const [, ...rest] = current;
          const rowTones = tonesByRow[orderedRowIndex] ?? [];
          const toneSeq = toneSeqByRow.current[orderedRowIndex] ?? 0;
          const nextTone =
            rowTones[toneSeq % Math.max(rowTones.length, 1)] ?? "muted";

          toneSeqByRow.current[orderedRowIndex] = toneSeq + 1;

          const id = `q-r${orderedRowIndex}-${nextId.current++}`;
          const next = [...rest, { id, tone: nextTone }];

          return { ...prev, [orderedRowIndex]: next };
        });
      }, beatMs);

      timers.current.push(interval);
    }, startDelayMs);

    timers.current.push(start);

    return () => {
      timers.current.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
      timers.current = [];
    };
  }, [rowOrder, rows.length, tonesByRow]);

  return (
    <div className="relative" style={{ width: gridW, height: gridH }}>
      {/* Fixed tiles */}
      {tiles.map((t) => {
        // Animated queue tiles are rendered separately below.
        const slotCols = slotColsByRow[t.rowIndex] ?? [];
        if (slotCols.includes(t.col)) return null;

        const x = t.col * pitchX;
        const y = t.rowIndex * pitchY;
        const delay = 0.06 + t.index * 0.02;

        return (
          <motion.div
            key={t.id}
            className={`${tileBaseClass} ${tileClassByTone[t.tone]}`}
            style={{ width: cellW, height: cellH, top: 0, left: 0, x, y }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: "spring", stiffness: 520, damping: 40 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/65 via-white/20 to-transparent" />
          </motion.div>
        );
      })}

      {/* Queues: animate actual row cells for every row */}
      {rows.map((_, rowIndex) => {
        const queue = queueByRow[rowIndex] ?? [];
        const slotCols = slotColsByRow[rowIndex] ?? [];

        return (
          <AnimatePresence key={`q-row-${rowIndex}`} initial={false}>
            {queue.map((item, idx) => {
              const slotCol = slotCols[idx] ?? 0;
              const x = slotCol * pitchX;
              const y = rowIndex * pitchY;

              return (
                <motion.div
                  key={item.id}
                  className={`${tileBaseClass} ${tileClassByTone[item.tone]}`}
                  style={{ width: cellW, height: cellH, top: 0, left: 0 }}
                  initial={{ opacity: 0, scale: 0.94, x, y }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0.98, x: x - pitchX, y }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                    mass: 1.25,
                  }}
                  aria-hidden
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/65 via-white/20 to-transparent" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export function WaveScene() {
  const [stage, setStage] = useState<WaveStage>("loading");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    // Spinner → Check
    timers.current.push(
      window.setTimeout(() => setStage("done"), 1150),
    );

    // Hold, then collapse into the queued grid glyph.
    timers.current.push(
      window.setTimeout(() => setStage("grid"), 1150 + 850),
    );

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <LayoutGroup>
        <AnimatePresence mode="wait" initial={false}>
          {stage !== "grid" ? (
            <motion.div
              key="wave-card"
              layoutId="wave-surface"
              className="relative w-[340px] h-[240px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -10 }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
            >
              {/* Simulated Warehouse Grid Background */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-2 opacity-30">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="bg-slate-200 rounded-sm" />
                ))}
              </div>

              {/* Tablet / Clipboard Overlay */}
              <motion.div
                className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-xl border border-od-dark-blue/20 shadow-2xl p-6 flex flex-col items-center justify-center text-center space-y-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-od-light-blue/20 flex items-center justify-center mb-2">
                  <AnimatePresence mode="wait" initial={false}>
                    {stage === "loading" ? (
                      <motion.div
                        key="spinner"
                        className="flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 520, damping: 32 }}
                        aria-label="Creating wave"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                        >
                          <Loader2 size={28} className="text-od-dark-blue" />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="check"
                        className="flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 600, damping: 26 }}
                        aria-label="Wave created"
                      >
                        <Check size={30} className="text-green-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-od-dark-blue">
                    Wave #442 Created
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Auto-assigned to Zone B
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="wave-grid"
              layoutId="wave-surface"
              className="relative w-[340px] h-[240px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              aria-label="Wave queued"
            >
              {/* Match the confirmation card surface */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-xl border border-od-dark-blue/20 shadow-2xl" />
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-2 opacity-25 p-6">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="bg-slate-200 rounded-sm" />
                ))}
              </div>
              <div className="relative z-10 flex h-full w-full items-center justify-center p-6">
              <WaveGridGlyph />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
