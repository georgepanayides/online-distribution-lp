'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PopNodeProps {
  icon: LucideIcon;
  label: string;
  sub: string;
  isActive: boolean;
  align?: 'left' | 'right';
}

export function PopNode({ icon: Icon, label, sub, isActive, align = 'right' }: PopNodeProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative px-2 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 z-50 whitespace-nowrap min-w-[160px]"
    >

      {/* Compact Text */}
      <div className="flex flex-col items-center text-center">
        <div className="relative z-10 p-1.5 bg-od-bright-blue/10 rounded-md text-od-bright-blue">
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <h4 className="text-xs font-bold text-slate-800 leading-none mb-1">{label}</h4>
        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider leading-none">{sub}</p>
      </div>

      {/* Subtle Glow Border */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-od-bright-blue/0 pointer-events-none"
        animate={{ borderColor: ['rgba(14, 165, 233, 0)', 'rgba(14, 165, 233, 0.4)', 'rgba(14, 165, 233, 0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
