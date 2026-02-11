'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type ScalingPeakCapacityCardProps = {
  fromValue?: number;
  toValue?: number;
  label?: string;
  threshold?: number;
};

export function ScalingPeakCapacityCard({
  fromValue = 50,
  toValue = 5000,
  label = 'Elastic demand & capacity response',
  threshold = 68,
}: ScalingPeakCapacityCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 20 data points to suggest volatile demand (spikes + dips).
  // Values are 0-100 (percent of chart height).
  const data: number[] = [
    18, 34, 52, 27, 76,
    90, 41, 24, 63, 79,
    46, 22, 95, 71, 38,
    66, 86, 30, 57, 44,
  ];

  const clampedThreshold = Math.max(0, Math.min(100, threshold));
  const thresholdTop = `${100 - clampedThreshold}%`;

  const toOrders = (pct: number) => {
    const clamped = Math.max(0, Math.min(100, pct));
    const min = Math.min(fromValue, toValue);
    const max = Math.max(fromValue, toValue);
    return Math.round(min + (max - min) * (clamped / 100));
  };

  const active =
    activeIndex === null
      ? null
      : (() => {
          const pct = data[activeIndex] ?? 0;
          const above = pct > clampedThreshold;
          const delta = Math.round(pct - clampedThreshold);
          return {
            index: activeIndex,
            pct,
            above,
            delta,
            orders: toOrders(pct),
          };
        })();

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label={`${label}. 20 data points showing demand volatility and a threshold line; capacity scales from ${fromValue} to ${toValue}.`}
    >
      <div className="flex items-end justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 font-lato">
          {label}
        </p>
        <p className="text-[11px] font-mono text-gray-400">
          threshold: {clampedThreshold}%
        </p>
      </div>

      <div className="mt-4 relative h-56 md:h-64">
        {/* Threshold line */}
        <div
          className="absolute left-0 right-0 h-0 border-t border-dashed border-[color:var(--od-dark-blue)]/25"
          style={{ top: thresholdTop }}
          aria-hidden="true"
        />

        {/* Baseline */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-[var(--od-dark-blue)]/10" aria-hidden="true" />

        {/* Bars */}
        <div className="absolute inset-0 flex items-end gap-1.5">
          {data.map((value, i) => {
            const clampedValue = Math.max(0, Math.min(100, value));
            const isAbove = clampedValue > clampedThreshold;
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                className="relative flex-1 h-full flex items-end outline-none"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                tabIndex={0}
                aria-label={`Data point ${i + 1}. Estimated demand ${toOrders(clampedValue)} orders/day (${Math.round(clampedValue)}%). ${isAbove ? 'Above threshold.' : 'Below threshold.'}`}
              >
                {/* Hover guide */}
                {isActive ? (
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[var(--od-dark-blue)]/10" aria-hidden="true" />
                ) : null}

                <motion.div
                  className="relative w-full"
                  initial={{ height: '0%' }}
                  whileInView={{ height: `${clampedValue}%` }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 26,
                    delay: i * 0.02,
                  }}
                  viewport={{ once: true, amount: 0.6 }}
                >
                  <div
                    className={
                      "h-full w-full rounded-none transition-colors duration-150 " +
                      (isActive
                        ? 'bg-[var(--od-mid-blue)]/70'
                        : isAbove
                          ? 'bg-[var(--od-dark-blue)]/70'
                          : 'bg-[var(--od-mid-blue)]/45')
                    }
                  />

                  {/* Active marker */}
                  {isActive ? (
                    <div
                      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--od-bright-blue)]/60"
                      aria-hidden="true"
                    />
                  ) : null}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {active ? (
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-xs font-lato text-gray-600">
            <span className="font-bold text-[color:var(--od-dark-blue)]">Point {active.index + 1}:</span>{" "}
            {active.orders.toLocaleString()} orders/day ({Math.round(active.pct)}%).{" "}
            {active.above
              ? `Above threshold by ${Math.max(1, active.delta)}%.`
              : `Headroom: ${Math.max(1, -active.delta)}%.`}
          </p>
          <p className="text-[11px] font-mono text-gray-400 whitespace-nowrap">
            {active.above ? 'auto-scale engaged' : 'stable capacity'}
          </p>
        </div>
      ) : (
        <p className="mt-3 text-xs text-gray-500 font-lato">
          Hover a bar to see estimated demand and headroom.
        </p>
      )}
    </div>
  );
}
