"use client";

import React from "react";
import { motion } from "framer-motion";

export function ProcessSchematic() {
  // Static view, no movement duration needed
  
  return (
    <div className="w-full h-full min-h-[500px] relative overflow-hidden select-none">
      {/* Background gradients for depth & blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white to-white" />

      {/* Vantage Point */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          perspective: "600px",
          perspectiveOrigin: "50% 50%" 
        }}
      >
        {/* World Container */}
        <div 
          className="relative w-full h-full max-w-4xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* FLOOR - Static */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[1200px] h-[2000px] bg-slate-50/40 origin-center border-x border-slate-200"
            style={{ 
               // Floor at Y=300 (bottom of 600px racks), Rotated 90deg flat.
               // We center it first (translate -50%, -50%) then move it down (translateY 300px), then rotate.
               transform: "translate(-50%, -50%) translateY(300px) rotateX(90deg)",
               transformStyle: "preserve-3d" 
            }}
          >
            {/* Grid Floor Texture - Static */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
                `,
                // Width 120px (across aisle), Height 300px (down aisle - matches rack bays)
                backgroundSize: "120px 300px",
                // Shift background to align with rack start if needed.
                // Rack starts at Z=-500. Floor starts at Z=0? 
                // We might need to offset background-position to sync lines.
                // Assuming standard flow, let's try 0 0 first.
              }}
            />
          </motion.div>

          {/* LEFT RACK - Split into 3 Shelves */}
          <div 
             className="absolute top-1/2 left-1/2 h-[600px] w-[2000px] origin-center"
             style={{ 
                // Moved further left (translateX -380px) to make aisle wider ("less and wider")
                // Shortened height (h-600)
               transform: "translate(-50%, -50%) translateX(-380px) translateZ(-500px) rotateY(90deg)",
               transformStyle: "preserve-3d"
             }}
          >
             {/* Creating 3 Distinct Shelf Levels */}
             {[0, 1, 2].map((i) => (
                <div 
                  key={`left-shelf-${i}`}
                  className="absolute left-0 w-full h-[140px] bg-gradient-to-b from-slate-50 to-white/0 border-b border-slate-200 flex items-end"
                  style={{ 
                    top: `${i * 180}px`, // 140px height + 40px gap
                  }}
                >
                    {/* Shelf Surface (Top face simulation via border/gradient) */}
                    <div className="w-full h-2 bg-slate-200/50 absolute top-0" />
                    
                    {/* Rack Grid Structure - Static */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(30, 58, 138, 0.1) 2px, transparent 2px)
                        `,
                        backgroundSize: "300px 100%" // Wider bays (300px)
                      }}
                    />
                    
                    {/* Static Boxes (using gradients) - Adjusted for wider bays */}
                    <div 
                      className="absolute inset-0 opacity-80"
                      style={{
                        backgroundImage: `
                            linear-gradient(90deg, transparent 40px, rgba(56, 189, 248, 0.10) 40px, rgba(56, 189, 248, 0.10) 140px, transparent 140px),
                            linear-gradient(90deg, transparent 220px, rgba(30, 58, 138, 0.05) 220px, rgba(30, 58, 138, 0.05) 280px, transparent 280px)
                        `,
                        backgroundSize: "300px 100%"
                      }}
                    />
                </div>
             ))}
          </div>

          {/* RIGHT RACK - Split into 3 Shelves */}
          <div 
             className="absolute top-1/2 left-1/2 h-[600px] w-[2000px] origin-center"
             style={{ 
               // Moved further right (translateX 380px)
               transform: "translate(-50%, -50%) translateX(380px) translateZ(-500px) rotateY(-90deg)",
               transformStyle: "preserve-3d"
             }}
          >
              {[0, 1, 2].map((i) => (
                <div 
                  key={`right-shelf-${i}`}
                  className="absolute left-0 w-full h-[140px] bg-gradient-to-b from-slate-50 to-white/0 border-b border-slate-200 flex items-end"
                  style={{ 
                    top: `${i * 180}px`,
                  }}
                >
                    <div className="w-full h-2 bg-slate-200/50 absolute top-0" />
                    
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(30, 58, 138, 0.1) 2px, transparent 2px)
                        `,
                        backgroundSize: "300px 100%" // Wider bays
                      }}
                    />

                     <div 
                      className="absolute inset-0 opacity-80"
                      style={{
                        backgroundImage: `
                            linear-gradient(90deg, transparent 60px, rgba(30, 58, 138, 0.08) 60px, rgba(30, 58, 138, 0.08) 120px, transparent 120px),
                            linear-gradient(90deg, transparent 180px, rgba(56, 189, 248, 0.08) 180px, rgba(56, 189, 248, 0.08) 280px, transparent 280px)
                        `,
                        backgroundSize: "300px 100%"
                      }}
                    />
                </div>
             ))}
          </div>

        </div>
      </div>
      
      {/* Atmosphere / Vignette */}
      <div className="absolute top-0 inset-x-0 h-2/3 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent pointer-events-none" />

    </div>
  );
}
