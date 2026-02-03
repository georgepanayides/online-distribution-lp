"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RevealPanel } from "@/components/ui/animations/RevealPanel";

type Props = {
  responseSlaLabel: string;
  responseSlaDetail: string;
  interventionSlaLabel: string;
  interventionSlaDetail: string;
};

type StageKey = "alert" | "ack" | "intervene" | "resolved";

const STAGES: Array<{ key: StageKey; label: string; helper: string }> = [
  {
    key: "alert",
    label: "Signal Detected",
    helper: "Carrier scan missing / cut-off risk",
  },
  {
    key: "ack",
    label: "Acknowledged",
    helper: "Owner assigned + next-step plan",
  },
  {
    key: "intervene",
    label: "Intervention",
    helper: "Order held, re-picked, or rebooked",
  },
  {
    key: "resolved",
    label: "Resolved",
    helper: "Customer protected. Audit trail saved.",
  },
];

export function ResponsivenessSLA({
  responseSlaLabel,
  responseSlaDetail,
  interventionSlaLabel,
  interventionSlaDetail,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.35, once: true });

  const [stageIndex, setStageIndex] = useState(0);
  const startedRef = useRef(false);

  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!inView || startedRef.current) return;

    startedRef.current = true;

    const schedule = [0, 800, 1650, 2550];
    schedule.forEach((ms, idx) => {
      const id = window.setTimeout(() => setStageIndex(idx), ms);
      timers.current.push(id);
    });

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [inView]);

  const incident = useMemo(
    () => ({
      id: "OD-2714",
      channel: "OMS → WMS",
      risk: "Carrier cut-off at 16:00",
      order: "#184392",
      sku: "3 items",
      eta: "Ship today",
    }),
    []
  );

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* SLA Cards */}
      <RevealPanel className="lg:col-span-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SlaCard
            eyebrow="SLA"
            title={responseSlaLabel}
            metric="Same-day"
            detail={responseSlaDetail}
            tone="premium"
          />
          <SlaCard
            eyebrow="Intervention"
            title={interventionSlaLabel}
            metric="2 hours"
            detail={interventionSlaDetail}
            tone="standard"
          />
        </div>
      </RevealPanel>

      {/* Process / Incident View */}
      <RevealPanel delay={0.08} className="lg:col-span-5">
        <div className="relative border border-od-dark-blue/10 bg-white overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-od-dark-blue/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Live Intervention
                </p>
                <p className="mt-2 font-sans text-lg font-semibold text-od-dark-blue">
                  Incident {incident.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-od-dark-blue/70 border border-od-dark-blue/15 px-2 py-1 bg-[#F8FAFC]">
                  {incident.channel}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white px-2 py-1 bg-od-gradient">
                  SLA ACTIVE
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border border-slate-200 bg-white/70 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Order
                </p>
                <p className="mt-1 font-sans font-semibold text-slate-800">
                  {incident.order}
                </p>
                <p className="mt-1 text-xs text-slate-500 font-lato">{incident.sku}</p>
              </div>
              <div className="border border-slate-200 bg-white/70 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Risk
                </p>
                <p className="mt-1 font-sans font-semibold text-slate-800">
                  Cut-off
                </p>
                <p className="mt-1 text-xs text-slate-500 font-lato">{incident.risk}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              {STAGES.map((s, idx) => (
                <Node
                  key={s.key}
                  label={s.label}
                  helper={s.helper}
                  active={idx <= stageIndex}
                  current={idx === stageIndex}
                  isLast={idx === STAGES.length - 1}
                />
              ))}
            </div>

            <div className="mt-6">
              <ProgressBar percent={(stageIndex / (STAGES.length - 1)) * 100} />

              <div className="mt-5 border border-slate-200 bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Current State
                </p>
                <p className="mt-2 font-sans font-semibold text-od-dark-blue">
                  {STAGES[stageIndex]?.label}
                </p>
                <p className="mt-1 text-sm text-slate-600 font-lato leading-relaxed">
                  {STAGES[stageIndex]?.helper}
                </p>
              </div>
            </div>
          </div>

          {/* Subtle slash */}
          <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-od-mid-blue/10 blur-3xl" />
        </div>
      </RevealPanel>
    </div>
  );
}

function SlaCard({
  eyebrow,
  title,
  metric,
  detail,
  tone,
}: {
  eyebrow: string;
  title: string;
  metric: string;
  detail: string;
  tone: "premium" | "standard";
}) {
  const isPremium = tone === "premium";

  return (
    <div
      className={
        "relative border overflow-hidden " +
        (isPremium
          ? "border-od-dark-blue/15 bg-white"
          : "border-od-dark-blue/10 bg-white")
      }
    >
      {isPremium ? (
        <div className="absolute inset-x-0 top-0 h-1 bg-od-gradient" />
      ) : (
        <div className="absolute inset-x-0 top-0 h-1 bg-od-mid-blue/20" />
      )}

      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {eyebrow}
        </p>

        <p className="mt-3 font-sans text-xl font-semibold text-od-dark-blue leading-snug">
          {title}
        </p>

        <div className="mt-4 flex items-end gap-2">
          <div className="font-sans text-4xl font-bold tracking-tight text-od-dark-blue">
            {metric}
          </div>
          <div className="pb-1 text-xs font-bold uppercase tracking-widest text-od-mid-blue">
            guaranteed
          </div>
        </div>

        <p className="mt-4 font-lato text-sm text-slate-600 leading-relaxed">
          {detail}
        </p>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Escalation
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-od-dark-blue/70 border border-od-dark-blue/15 px-2 py-1 bg-[#F8FAFC]">
              Named Owner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({
  label,
  helper,
  active,
  current,
  isLast,
}: {
  label: string;
  helper: string;
  active: boolean;
  current: boolean;
  isLast: boolean;
}) {
  return (
    <div className="relative flex-1 min-w-0">
      <div className="flex items-center">
        <div
          className={
            "relative z-10 w-8 h-8 flex items-center justify-center border " +
            (active
              ? "border-od-mid-blue/40 bg-white"
              : "border-slate-200 bg-white")
          }
          aria-label={label}
        >
          <motion.div
            className={
              "w-2.5 h-2.5 rounded-full " +
              (active ? "bg-od-mid-blue" : "bg-slate-300")
            }
            animate={
              current
                ? { scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }
                : { scale: 1, opacity: 1 }
            }
            transition={
              current
                ? { duration: 0.9, ease: "easeOut" }
                : { duration: 0.2 }
            }
          />

          {current ? (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 1, 0], scale: [0.9, 1.45, 1.45] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 border border-od-mid-blue/25" />
            </motion.div>
          ) : null}
        </div>

        {!isLast ? (
          <div className="h-px flex-1 bg-slate-200" />
        ) : null}
      </div>

      <div className="mt-3 pr-3">
        <p
          className={
            "text-[11px] font-bold uppercase tracking-widest truncate " +
            (active ? "text-od-dark-blue" : "text-slate-400")
          }
          title={label}
        >
          {label}
        </p>
        <p
          className={
            "mt-1 text-xs font-lato truncate " +
            (active ? "text-slate-600" : "text-slate-400")
          }
          title={helper}
        >
          {helper}
        </p>
      </div>
    </div>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="h-2 w-full bg-slate-200 overflow-hidden">
      <motion.div
        className="h-full bg-od-gradient"
        initial={{ width: "0%" }}
        animate={{ width: `${clamped}%` }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
      />
    </div>
  );
}
