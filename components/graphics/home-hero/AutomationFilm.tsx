"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FilmStage } from "./FilmStage";
import { IngestScene } from "./scenes/IngestScene";
import { ProcessingScene } from "./scenes/ProcessingScene";
import { WaveScene } from "./scenes/WaveScene";
import { DispatchScene } from "./scenes/DispatchScene";
import { Toast, StatusBadge } from "./ui/FilmAssets";

/**
 * 6 Steps mapped to Scenes + Internal Phases
 * 1. Ingest (Scene 1)
 * 2. Sync (Scene 2 - List)
 * 3. Wave (Scene 3)
 * 4. Scan (Scene 4 - Scan)
 * 5. Dispatch (Scene 4 - Timeline)
 * 6. Done (Scene 4 - Timeline)
 */

type FilmStep = 1 | 2 | 3 | 4 | 5 | 6;

function parseForcedStep(raw?: string | null): FilmStep | null {
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  if (n === 1 || n === 2 || n === 3 || n === 4 || n === 5 || n === 6) return n;
  return null;
}

export function AutomationFilm({
  forceStep,
}: {
  /**
   * Dev helper: set to 1..6 to lock the film to a step.
   * You can also set NEXT_PUBLIC_AUTOMATION_FILM_STEP=1..6.
   */
  forceStep?: FilmStep;
}) {
  const [stepState, setStepState] = useState<FilmStep>(1);

  const forcedFromEnv = parseForcedStep(process.env.NEXT_PUBLIC_AUTOMATION_FILM_STEP);
  const forcedStep = forceStep ?? forcedFromEnv;
  const step = forcedStep ?? stepState;

  useEffect(() => {
    if (forcedStep) return;

    // A deterministic state machine timeline
    const timeline = async () => {
      let cancelled = false;

      // Loop forever
      while (!cancelled) {
        setStepState(1); // Ingest
        await wait(5000);
        if (cancelled) break;
        
        setStepState(2); // Sync List
        await wait(5000);
        if (cancelled) break;
        
        setStepState(3); // Logic Wave
        await wait(5000);
        if (cancelled) break;
        
        setStepState(4); // Scan Box
        await wait(5000);
        if (cancelled) break;
        
        setStepState(5); // Timeline
        await wait(5000);
        if (cancelled) break;

        setStepState(6); // Done (pause before restart)
        await wait(2000);
      }

      return () => {
        cancelled = true;
      };
    };

    const maybeCleanup = timeline();
    return () => {
      void Promise.resolve(maybeCleanup).then((cleanup) => cleanup?.());
    };
  }, [forcedStep]);

  return (
    <FilmStage>
      {/* Toast Layer */}
      <AnimatePresence>
        {step === 1 && <StepOneToastStack key="toast-stack-1" />}
        {step === 3 && <Toast key="toast-3" label="Pick Wave Generated" subLabel="Manual Efficiency Check Passed" />}
        {step === 4 && <Toast key="toast-4" label="Scan Verified" subLabel="SKU Match • 100% Accuracy" type="success" />}
        {step === 6 && <Toast key="toast-6" label="Delivery Confirmed" subLabel="09:41 AM • Signed by recipient" type="success" />}
      </AnimatePresence>

      {/* Hero Content Layer */}
      <AnimatePresence mode="wait">
        {step === 1 && <IngestScene key="scene-1" />}
        {step === 2 && <ProcessingScene key="scene-2" />}
        {step === 3 && <WaveScene key="scene-3" />}

        {(step === 4 || step === 5 || step === 6) && (
          <DispatchScene key="scene-4" phase={step === 4 ? "scan" : "timeline"} />
        )}
      </AnimatePresence>

      {/* Status Rail (Bottom) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
         <AnimatePresence mode="wait">
            {step === 1 && <StatusBadge key="s1" label="Ingest" />}
            {step === 2 && <StatusBadge key="s2" label="Data Sync" />}
          {step === 3 && <StatusBadge key="s3" label="Task Planning" />}
          {step === 4 && <StatusBadge key="s4" label="Verification" />}
          {step > 4 && <StatusBadge key="s5" label="Transit" />}
         </AnimatePresence>
      </div>
    </FilmStage>
  );
}

function StepOneToastStack() {
  const [items, setItems] = useState<
    Array<{ id: string; label: string; subLabel?: string }>
  >([]);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    // iOS-style: new notification arrives on top and pushes the stack down.
    // We prepend items over time.
    const sequence = [
      { id: "order-1", label: "New Order Received", subLabel: "Order #10492 • 2 items" },
      { id: "order-2", label: "New Order Received", subLabel: "Order #10493 • Express" },
      { id: "order-3", label: "New Order Received", subLabel: "Order #10494 • 1 item" },
    ];

    sequence.forEach((toast, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setItems((prev) => [toast, ...prev].slice(0, 3));
        }, 80 + index * 300),
      );
    });

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-[280px] sm:w-[320px] max-w-[calc(100vw-2rem)] h-[92px]">
        <AnimatePresence initial={false}>
          {items.map((t, index) => (
            <motion.div
              key={t.id}
              className="absolute left-0 right-0 top-0"
              initial={{ opacity: 0, y: -10, scale: 0.99 }}
              animate={{
                opacity: 1 - index * 0.12,
                y: index * 10,
                scale: 1 - index * 0.02,
              }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 520, damping: 36 }}
              style={{ zIndex: 10 - index }}
            >
              <Toast label={t.label} subLabel={t.subLabel} position="stack" className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
