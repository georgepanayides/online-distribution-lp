"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Box, Truck, Check } from "lucide-react";

export function DispatchScene({ phase }: { phase: "scan" | "timeline" }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        
        {/* Phase 1: 3D Box Scan */}
        {phase === "scan" && (
          <motion.div
            key="scan-view"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            {/* Rotating 3D Box */}
            <motion.div
              className="w-32 h-32 bg-[#E1C699] border-4 border-[#D4B98C] shadow-2xl relative flex items-center justify-center"
              initial={{ rotateY: -30, rotateX: 10 }}
              animate={{ rotateY: 10, rotateX: 5 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              <Box className="text-[#967C55] opacity-50 w-16 h-16" />
              {/* Tape */}
              <motion.div 
                className="absolute top-1/2 left-0 right-0 h-4 bg-od-mid-blue/80 mix-blend-multiply" 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
            </motion.div>

            {/* Scanner Beam / Reticle */}
            <motion.div
              className="absolute -inset-4 border-2 border-od-bright-blue/50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1, duration: 0.4, repeat: 1 }}
            />
            <motion.div 
                className="absolute top-1/2 left-0 right-0 h-1 bg-red-500 shadow-[0_0_10px_red]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: [0, 1, 0], y: 50 }}
                transition={{ delay: 1, duration: 0.5 }}
            />
          </motion.div>
        )}

        {/* Phase 2: Horizontal Timeline */}
        {phase === "timeline" && (
          <motion.div
            key="timeline-view"
            className="w-full max-w-[320px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Timeline Track */}
            <div className="relative h-1 bg-slate-200 rounded-full w-full">
                
                {/* Steps */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 bg-od-dark-blue rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 left-[33%] w-3 h-3 bg-slate-300 rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 left-[66%] w-3 h-3 bg-slate-300 rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-slate-300 rounded-full" />

                {/* Moving Bar (The Driver / Time) */}
                <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 h-8 w-1 bg-od-bright-blue shadow-[0_0_15px_rgba(14,165,233,0.5)] z-10"
                    initial={{ left: "0%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                >
                    {/* Tooltip on the bar */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-od-dark-blue text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                        09:41 AM
                    </div>
                </motion.div>

                {/* Fill behind bar */}
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-od-mid-blue rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                />
            </div>

            {/* Labels beneath */}
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Pick</span>
                <span>Pack</span>
                <span>Ship</span>
                <span>Done</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
