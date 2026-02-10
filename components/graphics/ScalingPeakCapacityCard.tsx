'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight } from 'lucide-react';

import { AnimatedCounter } from '@/components/ui/animated-counter';

type ScalingPeakCapacityCardProps = {
  fromValue?: number;
  toValue?: number;
  label?: string;
};

export function ScalingPeakCapacityCard({
  fromValue = 50,
  toValue = 5000,
  label = 'Daily Volume Capacity',
}: ScalingPeakCapacityCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 border border-[var(--od-dark-blue)]/10 shadow-[0_18px_55px_rgba(0,59,92,0.10)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[var(--od-light-blue)]/25" />
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-[var(--od-dark-blue)]" aria-hidden="true">
        <TrendingUp size={180} strokeWidth={1} />
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{label}</p>

        <div className="flex items-end gap-3 mb-8">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-300 line-through decoration-2 decoration-[var(--od-mid-blue)]/50">
              {fromValue}
            </span>
          </div>

          <div className="mb-2 text-[var(--od-mid-blue)]" aria-hidden="true">
            <ChevronRight className="w-6 h-6" />
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-6xl md:text-7xl font-sans font-bold text-[var(--od-dark-blue)]">
              <AnimatedCounter value={toValue} duration={4} />
            </span>
            <span className="text-lg font-bold text-[var(--od-mid-blue)]">+</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>Startup</span>
            <span>Scaleup</span>
            <span>Market Leader</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200/70 overflow-hidden relative">
            <div className="absolute inset-0 flex justify-between px-2" aria-hidden="true">
              <div className="w-px h-full bg-white/60" />
              <div className="w-px h-full bg-white/60" />
            </div>
            <motion.div
              className="h-full bg-od-gradient"
              initial={{ width: '5%' }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 3, ease: 'circOut', delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
          <p className="text-xs text-gray-500 font-medium italic">*Automated systems absorb demand spikes instantly.</p>
        </div>
      </div>
    </div>
  );
}
