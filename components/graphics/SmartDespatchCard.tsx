'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  Box, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Cpu, 
  Activity,
  Globe
} from 'lucide-react';

const STEPS = [
  { id: 'ingest', label: 'Order Sync', status: 'Processing Data stream...' },
  { id: 'optimize', label: 'AI Slotting', status: 'Optimizing pick path...' },
  { id: 'pickpack', label: 'Fulfillment', status: 'Robotic picking active...' },
  { id: 'transit', label: 'In Transit', status: 'Carrier: Express Air...' },
  { id: 'complete', label: 'Delivered', status: 'Signature captured.' },
];

export function SmartDespatchCard() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 3500); 
    return () => clearInterval(timer);
  }, []);

  const currentStep = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="relative w-full max-w-[400px] h-[540px] mx-auto select-none">
      
      {/* Container - Clean, Open Layout */}
      <div className="w-full h-full flex flex-col justify-center">
        
        {/* Header: Minimal Indicators */}
        <div className="flex items-center justify-between px-2 py-4 opacity-80">
          <div className="flex items-center gap-3">
            <div className="relative w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </div>
            <span className="text-xs font-bold text-slate-500 tracking-wider">LIVE FEED • ORD-8291</span>
          </div>
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
             <Wifi size={16} className="text-slate-400" />
          </motion.div>
        </div>

        {/* Hero "Video" Area - The Stage */}
        <div className="flex-1 relative rounded-[2rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden flex items-center justify-center">
          
          {/* Background Grid - Subtle Blue */}
          <motion.div 
            className="absolute inset-0 opacity-[0.04]"
            style={{ 
                backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }}
            animate={{ backgroundPosition: ['0px 0px', '32px 32px'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Depth Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-white to-sky-50/50" />

          {/* Content Layer */}
          <AnimatePresence mode="wait">
            {stepIndex === 0 && <ViewIngest key="ingest" />}
            {stepIndex === 1 && <ViewAI key="ai" />}
            {stepIndex === 2 && <ViewPack key="pack" />}
            {stepIndex === 3 && <ViewTransit key="transit" />}
            {stepIndex === 4 && <ViewComplete key="complete" />}
          </AnimatePresence>

        </div>

        {/* Footer: Floating Text & Progress */}
        <div className="px-2 py-6">
          <motion.div 
            key={currentStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1 mb-6 ml-2"
          >
            <h3 className="text-3xl font-bold text-slate-900 font-sans tracking-tight">
              {currentStep.label}
            </h3>
            <p className="text-sm text-slate-500 font-medium font-mono">{currentStep.status}</p>
          </motion.div>

          {/* Progress Bar - Integrated */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-od-bright-blue"
              initial={{ width: `${((stepIndex) / STEPS.length) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MICRO VIEWS (Light Theme) ---

function ViewIngest() {
  return (
    <motion.div className="flex flex-col items-center gap-6 relative z-10">
      {/* Code Stream Effect */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 relative z-10">
            <Cpu size={48} className="text-od-bright-blue" />
        </div>
        
        {/* Computing Rings */}
        <motion.div 
          className="absolute inset-0 border-2 border-dashed border-od-bright-blue/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -inset-4 border border-slate-200 rounded-full opacity-50"
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Loading Bars */}
      <div className="flex gap-1.5 justify-center">
        {[1,2,3].map(i => (
          <motion.div 
             key={i} 
             className="w-12 h-1.5 rounded-full"
             animate={{ backgroundColor: ['#e2e8f0', '#0ea5e9', '#e2e8f0'] }}
             transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function ViewAI() {
  return (
    <motion.div className="relative w-full h-full flex items-center justify-center z-10">
      {/* Node Network */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
           <motion.div
             key={i}
             className="absolute top-1/2 left-1/2 w-0.5 h-24 origin-top"
             style={{ rotate: deg, marginTop: -48 }}
           >
              <div className="w-full h-full bg-gradient-to-t from-transparent via-purple-300 to-transparent opacity-50" />
              <motion.div 
                className="absolute top-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full -translate-x-1/2"
                animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
           </motion.div>
        ))}
        <div className="relative z-10 bg-white p-4 rounded-full shadow-xl border border-purple-100">
          <Activity size={40} className="text-purple-500" />
        </div>
      </div>
    </motion.div>
  )
}

function ViewPack() {
  return (
    <motion.div className="flex items-center justify-center z-10">
       <motion.div
         initial={{ scale: 0.8, opacity: 0, y: 20 }}
         animate={{ scale: 1, opacity: 1, y: 0 }}
         className="relative"
       >
         {/* Box */}
         <Box size={96} className="text-amber-500 fill-amber-50" strokeWidth={1.5} />
         
         {/* Tape Animation */}
         <motion.div 
            className="absolute top-[40%] left-[10%] right-[10%] h-2 bg-od-mid-blue/90"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
         />

         {/* Label Tag */}
         <motion.div 
           className="absolute -right-6 -top-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg shadow-emerald-200"
           initial={{ scale: 0, rotate: -10 }}
           animate={{ scale: 1, rotate: 5 }}
           transition={{ delay: 0.8, type: 'spring' }}
         >
           READY
         </motion.div>
       </motion.div>
    </motion.div>
  )
}

function ViewTransit() {
  return (
    <motion.div className="w-full h-full relative overflow-hidden flex items-center justify-center z-10">
       
       {/* Scrolling Road Lines */}
       <motion.div 
         className="absolute inset-0 flex flex-col items-center justify-center gap-12"
         animate={{ y: [0, 48] }}
         transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
       >
         <div className="w-[120%] h-[1px] bg-slate-200" />
         <div className="w-[120%] h-[1px] bg-slate-200" />
         <div className="w-[120%] h-[1px] bg-slate-200" />
         <div className="w-[120%] h-[1px] bg-slate-200" />
         <div className="w-[120%] h-[1px] bg-slate-200" />
       </motion.div>

       <motion.div
         animate={{ 
           y: [-3, 3, -3],
         }}
         transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
       >
         <Globe size={100} className="text-blue-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />
         <div className="relative z-10 bg-white p-3 rounded-xl shadow-lg border border-slate-100">
            <Truck size={48} className="text-od-dark-blue" />
         </div>
       </motion.div>
    </motion.div>
  )
}

function ViewComplete() {
  return (
    <motion.div className="flex flex-col items-center justify-center text-center z-10">
       <motion.div 
         initial={{ scale: 0, rotate: -180 }}
         animate={{ scale: 1, rotate: 0 }}
         transition={{ type: "spring", damping: 12 }}
         className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20 ring-4 ring-emerald-50"
       >
         <CheckCircle2 size={48} className="text-white" strokeWidth={3} />
       </motion.div>
       <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
         className="flex flex-col items-center"
       >
         <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            <MapPin size={16} />
            <span className="text-xs uppercase tracking-wide">Arrived at Destination</span>
         </div>
       </motion.div>
    </motion.div>
  )
}
