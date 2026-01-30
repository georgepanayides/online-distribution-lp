'use client';

import React, { useState, useEffect } from 'react';
import { 
  Network, 
  ArrowDownToLine, 
  Layers, 
  ScanBarcode, 
  PackageCheck, 
  Truck, 
  RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PulsingTarget } from '@/components/ui/animations/PulsingTarget';
import { PopNode } from '@/components/ui/animations/PopNode';

const steps = [
  { 
    id: 1, 
    label: "Integration", 
    sub: "Two-way Sync",
    icon: Network, 
    x: 40, 
    y: 60,
    align: 'left'
  },
  { 
    id: 2, 
    label: "Inbound", 
    sub: "Quality Check",
    icon: ArrowDownToLine, 
    x: 360, 
    y: 60,
    align: 'right' 
  },
  { 
    id: 3, 
    label: "Smart Slotting", 
    sub: "Velocity Logic",
    icon: Layers, 
    x: 360, 
    y: 210,
    align: 'right' 
  },
  { 
    id: 4, 
    label: "Precision Picking", 
    sub: "Double-Scan RF",
    icon: ScanBarcode, 
    x: 40, 
    y: 210,
    align: 'left'
  },
  { 
    id: 5, 
    label: "Strategic Packing", 
    sub: "Brand-Ready",
    icon: PackageCheck, 
    x: 40, 
    y: 360,
    align: 'left'
  },
  { 
    id: 6, 
    label: "Multi-Carrier", 
    sub: "Rate Shopping",
    icon: Truck, 
    x: 360, 
    y: 360,
    align: 'right'
  },
  { 
    id: 7, 
    label: "Reverse Logistics", 
    sub: "Instant Restock",
    icon: RefreshCw, 
    x: 360, 
    y: 510,
    align: 'right'
  },
];

export function HomeHeroGraphic() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 8 ? 1 : prev + 1));
    }, 2000); // Faster pace? 2s per step
    return () => clearInterval(timer);
  }, []);

  // Construct the Grid Path: Straight lines between nodes
  const pathData = `
    M ${steps[0].x} ${steps[0].y} 
    L ${steps[1].x} ${steps[1].y} 
    L ${steps[2].x} ${steps[2].y} 
    L ${steps[3].x} ${steps[3].y} 
    L ${steps[4].x} ${steps[4].y} 
    L ${steps[5].x} ${steps[5].y} 
    L ${steps[6].x} ${steps[6].y}
  `;

  return (
    <div className="relative w-full h-[650px] flex items-center justify-center select-none pointer-events-none lg:pointer-events-auto scale-90 lg:scale-100 origin-center lg:translate-x-12">
      
      {/* SVG Path Layer */}
      <svg className="absolute w-full h-full max-w-[440px] visible overflow-visible" viewBox="0 0 400 600">
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Grid Track (Faint) */}
        <path 
          d={pathData} 
          fill="none" 
          stroke="rgba(15, 23, 42, 0.05)" 
          strokeWidth="3"
        />

        {/* 2. Active Progress Lines (Persistent segments) */}
        {steps.map((step, index) => {
           if (index === steps.length - 1) return null;
           const nextStep = steps[index + 1];
           // Line is active if we have passed this step index
           const isActive = activeStep > index + 1; 
           const isCurrentSegment = activeStep === index + 1;

           return (
             <React.Fragment key={`seg-${index}`}>
               {/* Completed Line Segment - Solid Blue */}
               <motion.line
                 x1={step.x} y1={step.y}
                 x2={nextStep.x} y2={nextStep.y}
                 stroke="url(#grid-gradient)"
                 strokeWidth="3"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ 
                   pathLength: isActive || isCurrentSegment ? 1 : 0,
                   opacity: isActive || isCurrentSegment ? 0.6 : 0
                 }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
                 strokeLinecap="round"
               />
               
               {/* Moving Packet on Current Segment */}
               {isCurrentSegment && (
                 <motion.circle
                   r="6"
                   fill="#0ea5e9"
                   filter="url(#glow-line)"
                   initial={{ cx: step.x, cy: step.y, opacity: 0 }}
                   animate={{ cx: nextStep.x, cy: nextStep.y, opacity: 1 }}
                   transition={{ 
                     duration: 2,
                     ease: "easeInOut"
                   }}
                 />
               )}
             </React.Fragment>
           );
        })}

      </svg>

      {/* Nodes Container */}
      <div className="absolute inset-0 w-full h-full max-w-[440px] mx-auto">
        {steps.map((step) => {
          // Node logic:
          // Inactive: Not reached yet (activeStep < step.id)
          // Active: Currently processing (activeStep === step.id)
          // Completed: Passed (activeStep > step.id)
          const isFuture = activeStep < step.id;
          const isCurrent = activeStep === step.id;
          const isCompleted = activeStep > step.id;

          // "Stay there" -> Details persist if Current or Completed
          const showDetails = isCurrent || isCompleted;

          return (
            <div 
              key={step.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: step.x, top: step.y }}
            >
              {/* Info Card - PopOut Node - Replaces the original small icon when active */}
              {showDetails ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <PopNode 
                    icon={step.icon} 
                    label={step.label} 
                    sub={step.sub} 
                    isActive={true} 
                    align={step.align as 'left' | 'right'}
                  />
                </div>
              ) : (
                // Passive State: Pulsing Target
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <PulsingTarget size={32} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

