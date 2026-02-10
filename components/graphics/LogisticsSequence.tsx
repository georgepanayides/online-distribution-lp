'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Box, 
  Map, 
  CheckCircle2,
  ScanBarcode, 
  Truck
} from 'lucide-react';

// --- Types ---
type Phase = 'sync' | 'pick' | 'pack' | 'ship' | 'delivered';

interface StepConfig {
  id: Phase;
  label: string;
  sub: string;
  icon: React.ElementType;
  duration: number; // ms to stay on this step
}

const SEQUENCE: StepConfig[] = [
  { id: 'sync', label: 'Integration', sub: 'Real-time Data', icon: Network, duration: 3000 },
  { id: 'pick', label: 'Smart Pick', sub: '99.9% Accuracy', icon: ScanBarcode, duration: 3000 },
  { id: 'pack', label: 'Custom Pack', sub: 'Brand Experience', icon: Box, duration: 3000 },
  { id: 'ship', label: 'Fast Ship', sub: 'Rate Optimized', icon: Truck, duration: 3000 },
  { id: 'delivered', label: 'Delivered', sub: 'Customer Joy', icon: CheckCircle2, duration: 2500 },
];

export function LogisticsSequence() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SEQUENCE.length);
    }, SEQUENCE[activeIndex].duration);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const step = SEQUENCE[activeIndex];

  return (
    <div className="relative w-full h-[500px] flex flex-col md:flex-row items-center justify-center p-6 gap-8 select-none">
      
      {/* 2. Visual Stage (The "Video" Feel) */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center overflow-hidden">
        
        {/* Background Grid Pattern (Subtle) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        {/* Stage Content Switcher */}
        <AnimatePresence mode="wait">
          {step.id === 'sync' && <SceneSync key="sync" />}
          {step.id === 'pick' && <ScenePick key="pick" />}
          {step.id === 'pack' && <ScenePack key="pack" />}
          {step.id === 'ship' && <SceneShip key="ship" />}
          {step.id === 'delivered' && <SceneDelivered key="delivered" />}
        </AnimatePresence>

        {/* Status Overlay (Bottom of stage) */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
           <motion.div 
             key={step.label}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/5 rounded-full backdrop-blur-sm"
           >
             <div className="w-1.5 h-1.5 rounded-full bg-od-bright-blue animate-pulse" />
             <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{step.label}</span>
           </motion.div>
        </div>
      </div>

      {/* 1. Steps Indicator (Side List) */}
      <div className="flex flex-row md:flex-col gap-4 z-10">
        {SEQUENCE.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div 
              key={s.id}
              animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1.05 : 1 }}
              className="flex items-center gap-3 cursor-default"
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500
                ${isActive ? 'bg-od-bright-blue text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-400'}
              `}>
                <s.icon size={18} />
              </div>
              <div className="hidden md:block">
                <h4 className={`text-sm font-bold leading-tight ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>{s.label}</h4>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">{s.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

// --- SUB-SCENES (The "Micro Animations") ---

function SceneSync() {
  return (
    <motion.div className="relative w-full h-full flex items-center justify-center">
      {/* Central Server Node */}
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
        className="w-20 h-20 bg-od-mid-blue rounded-xl flex items-center justify-center z-10 shadow-xl"
      >
        <Network className="text-white w-10 h-10" />
      </motion.div>
      
      {/* Orbiting Data Packets */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-od-bright-blue rounded-full"
          initial={{ opacity: 0, x: 100 * Math.cos(i * 1.57), y: 100 * Math.sin(i * 1.57) }}
          animate={{ 
            opacity: [0, 1, 0],
            x: 0, 
            y: 0 
          }}
          transition={{ 
            duration: 1.5, 
            delay: i * 0.2, 
            repeat: Infinity,
            repeatDelay: 0.5 
          }}
        />
      ))}
      
      {/* Connection Rings */}
      <motion.div 
        className="absolute w-40 h-40 border-2 border-dashed border-od-mid-blue/30 rounded-full"
        animate={{ rotate: 360, scale: [0.9, 1, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function ScenePick() {
  return (
    <motion.div className="relative w-full h-full flex flex-col items-center justify-center">
       {/* Shelves Grid */}
       <div className="grid grid-cols-3 gap-2 mb-8">
         {Array.from({ length: 9 }).map((_, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0.2, scale: 0.8 }}
             animate={{ 
                opacity: i === 4 ? 1 : 0.2, 
                scale: i === 4 ? 1.1 : 0.8,
                backgroundColor: i === 4 ? '#0ea5e9' : '#cbd5e1'
             }}
             className="w-12 h-12 rounded-md"
           />
         ))}
       </div>
       
       {/* Scanner Beam */}
       <motion.div
         className="absolute w-48 h-1 bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.8)]"
         initial={{ top: "30%", opacity: 0 }}
         animate={{ top: ["30%", "60%", "30%"], opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1.5, repeat: Infinity }}
       />
    </motion.div>
  );
}

function ScenePack() {
  return (
    <motion.div className="relative w-full h-full flex items-center justify-center perspective-500">
      {/* Box Base */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-32 h-32 bg-[#E1C699] border-4 border-[#D4B98C] shadow-2xl"
      >
        {/* Flaps */}
        <motion.div 
          className="absolute -top-16 left-0 w-full h-1/2 bg-[#D4B98C] origin-bottom"
          initial={{ rotateX: 120 }}
          animate={{ rotateX: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.div 
          className="absolute -bottom-16 left-0 w-full h-1/2 bg-[#D4B98C] origin-top"
          initial={{ rotateX: -120 }}
          animate={{ rotateX: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
        
        {/* Tape being applied */}
        <motion.div 
          className="absolute top-1/2 left-0 h-4 bg-od-mid-blue/80 z-20"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.2, duration: 0.4 }}
        />
        
        {/* Logo Stamp */}
        <motion.div
           className="absolute inset-0 flex items-center justify-center opacity-0"
           animate={{ opacity: 1, scale: [1.5, 1] }}
           transition={{ delay: 1.8, duration: 0.3 }}
        >
          <div className="w-12 h-12 rounded-full border-4 border-od-mid-blue/30" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SceneShip() {
  return (
    <motion.div className="relative w-full h-full overflow-hidden flex items-center justify-center">
       {/* Road/Speed Lines */}
       <div className="absolute inset-x-0 h-40 flex flex-col justify-between opacity-20">
         {[1,2,3].map(i => (
           <motion.div 
             key={i} 
             className="h-1 bg-slate-900 w-full"
             animate={{ x: ["100%", "-100%"] }}
             transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
           />
         ))}
       </div>

       {/* Moving Truck or Package */}
       <motion.div
         className="relative z-10"
         animate={{ y: [-2, 2, -2] }}
         transition={{ duration: 0.5, repeat: Infinity }}
       >
         <Truck size={80} className="text-od-mid-blue" />
         <motion.div 
           className="absolute -right-4 -top-2"
           initial={{ opacity: 0 }}
           animate={{ opacity: [0, 1, 0], x: [0, 20] }}
           transition={{ duration: 1, repeat: Infinity }}
         >
           <div className="w-2 h-2 rounded-full bg-slate-400" />
         </motion.div>
       </motion.div>
    </motion.div>
  );
}

function SceneDelivered() {
  return (
    <motion.div className="relative w-full h-full flex items-center justify-center">
      {/* Map Pin Drop */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <Map size={80} className="text-emerald-500" />
      </motion.div>
      
      {/* Checkmark Pop */}
      <motion.div
        className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <CheckCircle2 size={32} className="text-emerald-500" />
      </motion.div>
      
      {/* Confetti / Ripples */}
      <motion.div
         className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"
         initial={{ scale: 0.5, opacity: 0 }}
         animate={{ scale: 1.5, opacity: 0 }}
         transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
    </motion.div>
  );
}
