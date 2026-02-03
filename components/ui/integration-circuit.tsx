"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  ShoppingCart,
  Wallet,
  RefreshCcw,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Configuration ---
const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: React.ElementType; color: string; bg: string; description: string }
> = {
  inventory_erps: {
    label: "ERP & Inventory",
    description: "Stock & Order Sync",
    icon: Database,
    color: "#003B5C", // od-dark-blue
    bg: "bg-blue-50"
  },
  shopping_carts: {
    label: "Commerce",
    description: "Multi-Channel Sales",
    icon: ShoppingCart,
    color: "#2B84B1", // od-mid-blue
    bg: "bg-sky-50"
  },
  finance_accounting: {
    label: "Finance",
    description: "Automated Ledger",
    icon: Wallet,
    color: "#0F172A", // slate-900
    bg: "bg-slate-50"
  },
  return_management: {
    label: "Returns",
    description: "Reverse Logistics",
    icon: RefreshCcw,
    color: "#7BAFD4", // od-light-blue
    bg: "bg-cyan-50"
  },
  crms_communications: {
    label: "CX & CRM",
    description: "Customer Alerts",
    icon: MessageSquare,
    color: "#64748B", 
    bg: "bg-gray-50"
  },
};

interface IntegrationCircuitProps {
  data: Record<string, string[]>;
}

export function IntegrationCircuit({ data }: IntegrationCircuitProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Convert dictionary to array for mapping
  const tracks = Object.entries(data).map(([key, items]) => ({
    key,
    ...CATEGORY_CONFIG[key],
    items
  }));

  return (
    <div className="w-full relative bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 lg:p-16">
      
      {/* --- Background Grid --- */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #003B5C 1px, transparent 1px),
            linear-gradient(to bottom, #003B5C 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />
      
      {/* --- Layout Container --- */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full max-w-7xl mx-auto">
        
        {/* === LEFT: The Core (Big Node in Wireframe) === */}
        <div className="relative shrink-0 order-first lg:sticky lg:top-24">
            <CoreNode />
            
            {/* 
                THE TRACES (SVG Lines) 
                Visual only, drawn from Core to the right side area.
                We'll fake it with a gradient overlay mask or absolute divs for responsiveness.
            */}
        </div>


        {/* === RIGHT: The Tracks (List of Rows) === */}
        <div className="flex-1 w-full flex flex-col gap-10 lg:gap-14 relative">
             {tracks.map((track, idx) => (
                 <TrackRow 
                    key={track.key} 
                    track={track} 
                    index={idx}
                    isActive={activeCategory === track.key}
                    onHover={setActiveCategory}
                 />
             ))}
        </div>

      </div>

    </div>
  );
}

// === Sub-Components ===

function CoreNode() {
    return (
        <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center group select-none">
            {/* Outer Rings */}
            <div className="absolute inset-0 rounded-full border-[3px] border-slate-100 group-hover:border-od-mid-blue/20 transition-colors duration-700" />
            
            {/* Spinning Dashed Ring */}
            <div className="absolute inset-3 rounded-full border border-slate-300 group-hover:border-od-mid-blue/40 border-dashed animate-[spin_40s_linear_infinite]" />
            
            {/* Inner Ring */}
            <div className="absolute inset-12 rounded-full border border-slate-200 bg-white shadow-2xl" />

            {/* Glowing Pulse behind */}
            <div className="absolute inset-0 bg-od-mid-blue/0 group-hover:bg-od-mid-blue/5 rounded-full blur-3xl transition-colors duration-700" />

            {/* Main Hub Content */ }
            <div className="relative w-32 h-32 bg-[#0F172A] rounded-full flex flex-col items-center justify-center shadow-2xl z-20 overflow-hidden border border-slate-700">
                {/* Glossy sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                
                {/* Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan pointer-events-none" />
                
                <img 
                    src="/logos/Primary Positive - White.svg" 
                    alt="OD Core" 
                    className="w-16 h-auto relative z-10" 
                />
                
                <div className="absolute bottom-6 flex items-center gap-1.5 px-3 py-1 bg-slate-900/90 rounded-full backdrop-blur-sm border border-slate-700/50">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                     <span className="text-[9px] font-mono text-slate-300 uppercase tracking-wider">Online</span>
                </div>
            </div>

            {/* Connection Nub (Right side) */}
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-300 group-hover:bg-od-mid-blue transition-colors shadow-sm z-30 hidden lg:block" />
        </div>
    )
}

function TrackRow({ track, index, isActive, onHover }: any) {
    const Icon = track.icon;
    
    return (
        <div 
            className="group/row flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 relative"
            onMouseEnter={() => onHover(track.key)}
            onMouseLeave={() => onHover(null)}
        >
            {/* 
               CONNECTOR LINE (The "Wire")
               Draws from left of component towards the node.
               Visually connects to the Core's general direction.
            */}
            <div className={cn(
                "hidden lg:block absolute right-full top-1/2 w-16 h-0.5 bg-slate-200 -mr-12 transition-all duration-300 origin-right",
                isActive ? "bg-od-mid-blue scale-x-110" : "bg-slate-200"
            )} />


            {/* === CATEGORY NODE (Medium Circle) === */}
            <div className="relative shrink-0 z-20 flex flex-col items-center gap-3">
                <div 
                    className={cn(
                        "w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center border transition-all duration-300 relative bg-white group-hover/row:scale-110",
                        isActive 
                            ? "border-od-mid-blue shadow-[0_0_20px_rgba(43,132,177,0.2)]" 
                            : "border-slate-200 shadow-sm"
                    )}
                >
                    <Icon className={cn(
                        "w-5 h-5 lg:w-6 lg:h-6 transition-colors",
                        isActive ? "text-od-mid-blue" : "text-slate-400"
                    )} />
                </div>
                
                {/* Text Label */}
                <div className="lg:absolute lg:right-full lg:mr-6 lg:top-1/2 lg:-translate-y-1/2 flex flex-col lg:items-end lg:text-right whitespace-nowrap">
                     <span className={cn(
                        "text-sm font-bold leading-none transition-colors", 
                        isActive ? "text-od-dark-blue" : "text-slate-700"
                     )}>
                        {track.label}
                     </span>
                     <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium">
                        {track.description}
                     </span>
                </div>
            </div>

            {/* === INTEGRATION TILES (The "Grid") === */}
            <div className="flex flex-wrap items-center gap-3 w-full">
                
                {track.items.map((item: string, i: number) => (
                    <IntegrationTile 
                        key={item} 
                        name={item} 
                        index={i} 
                        trackActive={isActive} 
                    />
                ))}

                {/* 'Add' Placeholder */}
                <div className="h-9 px-3 rounded border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-mono bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    + CUSTOM
                </div>
            </div>

        </div>
    )
}

function IntegrationTile({ name, index, trackActive }: { name: string, index: number, trackActive: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            className={cn(
                "relative h-9 px-3 bg-white rounded border flex items-center gap-2 shadow-sm transition-all duration-300 cursor-default select-none group/tile overflow-hidden",
                trackActive 
                    ? "border-od-mid-blue/40 ring-1 ring-od-mid-blue/10" 
                    : "border-slate-200 hover:border-slate-300"
            )}
        >
            {/* Hover "Fill" Effect */}
            <div className="absolute inset-0 bg-od-mid-blue/5 translate-y-full group-hover/tile:translate-y-0 transition-transform duration-300" />

            {/* Status Dot */}
            <div className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors",
                trackActive ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]" : "bg-slate-300"
            )} />
            
            <span className={cn(
                "text-[11px] font-semibold tracking-tight transition-colors relative z-10",
                trackActive ? "text-slate-700" : "text-slate-500"
            )}>
                {name}
            </span>
            
        </motion.div>
    )
}
