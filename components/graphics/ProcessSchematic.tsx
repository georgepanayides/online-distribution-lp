"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Package, Truck, ScanBarcode, ArrowRight, type LucideIcon } from "lucide-react";

// Animation Variants
const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

const pulseVariants = {
  idle: { scale: 1, opacity: 0.5 },
  active: { 
    scale: [1, 1.2, 1], 
    opacity: 1,
    transition: { duration: 0.4 } 
  }
};

const NodeIcon = ({ icon: Icon, label, active }: { icon: LucideIcon, label: string, active: boolean }) => (
  <div className="flex flex-col items-center gap-3 relative z-10">
    <motion.div 
      animate={active ? { borderColor: "var(--color-od-mid-blue)", backgroundColor: "#ffffff" } : { borderColor: "#e2e8f0", backgroundColor: "#f8fafc" }}
      className="w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-colors duration-300 relative bg-white"
    >
      <Icon className={`w-6 h-6 ${active ? 'text-od-mid-blue' : 'text-gray-400'}`} />
      
      {/* Active Glow */}
      {active && (
        <motion.div 
          layoutId="active-glow"
          className="absolute inset-0 rounded-xl bg-od-mid-blue/10" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
    <div className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${active ? 'text-od-dark-blue' : 'text-gray-400'}`}>
      {label}
    </div>
  </div>
);

export function ProcessSchematic() {
  const [step, setStep] = React.useState(0);

  // Cycle through steps to simulate the package flow
  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5); // 5 states: 0=start, 1-4=nodes
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[300px] md:h-[180px] relative flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto px-8 md:px-0">
      
      {/* Connecting Line (Desktop: Horizontal, Mobile: Vertical) */}
      <div className="absolute inset-0 md:top-1/2 md:-translate-y-1/2 md:h-0.5 md:w-full w-0.5 h-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 bg-gray-100 -z-0">
         {/* Animated Progress Line */}
         <motion.div 
            className="absolute top-0 left-0 bg-od-mid-blue"
            style={{ 
              width: "100%", 
              height: "100%", 
              originX: 0, 
              originY: 0 
            }}
            initial={{ scaleX: 0, scaleY: 0 }}
            animate={{ 
               scaleX: typeof window !== 'undefined' && window.innerWidth >= 768 ? (step >= 1 ? 0.33 : step >= 2 ? 0.66 : step >= 3 ? 1 : 0) : 1,
               scaleY: typeof window !== 'undefined' && window.innerWidth < 768 ? (step >= 1 ? 0.33 : step >= 2 ? 0.66 : step >= 3 ? 1 : 0) : 1
            }}
            transition={{ duration: 0.5, ease: "linear" }}
         />
      </div>

      {/** 
       * NODES 
       * We map 4 regular nodes. 
      */}
      <NodeIcon 
        icon={Database} 
        label="Integration" 
        active={step >= 0} // Always start active or become active first
      />

      <NodeIcon 
        icon={ScanBarcode} 
        label="Inbound" 
        active={step >= 1} 
      />

      <NodeIcon 
        icon={Package} 
        label="Pick & Pack" 
        active={step >= 2} 
      />

      <NodeIcon 
        icon={Truck} 
        label="Despatch" 
        active={step >= 3} 
      />

      {/* Moving Packet (The "Payload") */}
      {/* This is complex to make responsive purely with CSS/Motion, so we use a simpler 'highlight' approach above */}
      
    </div>
  );
}
