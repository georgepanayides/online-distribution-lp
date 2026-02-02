'use client'

import { motion } from "framer-motion"
import { useEffect } from "react"

// Coordinate system for SVG paths
const NZ_PATHS = {
  // Simplified stylized paths for NZ
  // These are roughly digitized coordinates to form the two islands
  northIsland: "M 180 80 L 200 40 L 230 50 L 250 80 L 280 90 L 270 120 L 300 130 L 310 160 L 280 180 L 240 160 L 220 180 L 190 200 L 160 170 L 180 130 L 150 110 L 180 80 Z",
  southIsland: "M 140 220 L 180 200 L 210 230 L 190 280 L 160 320 L 130 360 L 90 380 L 60 350 L 50 300 L 80 260 L 110 240 Z",
  stewartIsland: "M 70 390 L 90 395 L 85 410 L 65 405 Z"
}

// Map Hub coordinates (relative to 350x450 viewbox)
const HUBS = [
  { id: "akl", x: 230, y: 110, label: "Auckland Hub", sites: 4 },
  { id: "chc", x: 150, y: 280, label: "Christchurch Hub", sites: 5 }
]

export function NetworkMap() {
  useEffect(() => {
    // Logic placeholder for future complex animation states
  }, [])

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[1/1] bg-[#F8FAFC] rounded-2xl border border-[var(--od-dark-blue)]/5 overflow-hidden flex items-center justify-center p-4 group">
      
      {/* 1. Map Container - Centered */}
      <div className="relative w-full max-w-[400px] h-full max-h-[500px]">
        
        {/* Abstract Grid Overlay for "Digital Twin" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,59,92,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,59,92,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

        <svg viewBox="0 0 350 450" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" /> {/* Slate-100 */}
              <stop offset="100%" stopColor="#e2e8f0" /> {/* Slate-200 */}
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>

          {/* New Zealand Base Layer */}
          <g className="fill-white stroke-[var(--od-dark-blue)]/10 hover:stroke-[var(--od-mid-blue)]/30 transition-all duration-700">
             <motion.path 
                d={NZ_PATHS.northIsland} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                fill="url(#mapGradient)"
                strokeWidth="1.5"
             />
             <motion.path 
                d={NZ_PATHS.southIsland} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                fill="url(#mapGradient)"
                strokeWidth="1.5"
             />
             <motion.path 
                d={NZ_PATHS.stewartIsland} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                fill="url(#mapGradient)"
                strokeWidth="1.5"
             />
          </g>

          {/* Connection Line (Inter-Island) - Curved for elegance */}
          <motion.path
            d={`M ${HUBS[0].x} ${HUBS[0].y} Q 250 200 ${HUBS[1].x} ${HUBS[1].y}`} 
            fill="none"
            stroke="var(--od-mid-blue)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-30"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          {/* Data Packet moving North <-> South */}
          {/* Packet 1: Southbound */}
          <motion.circle r="3" fill="var(--od-mid-blue)" filter="url(#glow)">
            <animateMotion 
                dur="3s" 
                repeatCount="indefinite"
                path={`M ${HUBS[0].x} ${HUBS[0].y} Q 250 200 ${HUBS[1].x} ${HUBS[1].y}`} 
                keyPoints="0;1"
                keyTimes="0;1" 
                calcMode="linear"
            />
          </motion.circle>
          
          {/* Packet 2: Northbound */}
          <motion.circle r="3" fill="var(--od-dark-blue)" className="opacity-60" filter="url(#glow)">
            <animateMotion 
                dur="4s" 
                repeatCount="indefinite"
                path={`M ${HUBS[1].x} ${HUBS[1].y} Q 250 200 ${HUBS[0].x} ${HUBS[0].y}`} 
                keyPoints="0;1"
                keyTimes="0;1" 
                calcMode="linear"
            />
          </motion.circle>

          {/* Hub Markers */}
          {HUBS.map((hub, i) => (
             <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                {/* Ping Rings */}
                <motion.circle 
                    r="8" 
                    fill="none" 
                    stroke="var(--od-mid-blue)" 
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
                <motion.circle 
                    r="15" 
                    fill="none" 
                    stroke="var(--od-mid-blue)" 
                    strokeWidth="0.5"
                    className="opacity-50"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 + 0.3 }}
                />
                
                {/* Inner Target Icon - Simplified to circles for clean SVG */}
                <circle r="4" fill="var(--od-dark-blue)" className="drop-shadow-md" />
                <circle r="2" fill="white" />
             </g>
          ))}
        </svg>

        {/* HTML Labels Overlays */}
        {HUBS.map((hub) => (
             <div 
                key={hub.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ 
                    // Manual adjustment to align with SVG coordinate scale roughly
                    left: `${(hub.x / 350) * 100}%`, 
                    top: `${(hub.y / 450) * 100}%` 
                }}
             >
                {/* Tooltip Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    // Conditional positioning based on hub ID to avoid overlap/cropping
                    className={`absolute ${hub.id === 'akl' ? 'left-6 -top-10' : 'left-6 -bottom-6'} pointer-events-auto bg-white/95 backdrop-blur-md border border-[var(--od-dark-blue)]/10 shadow-lg p-3 rounded-lg min-w-[140px] z-10`}
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[var(--od-dark-blue)] uppercase tracking-wider">{hub.label}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-sans font-bold text-[var(--od-mid-blue)]">{hub.sites}</span>
                        <span className="text-[10px] uppercase text-gray-400 font-medium">Facilities</span>
                    </div>
                </motion.div>
             </div>
        ))}
        
        {/* Legend / Status Badge */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
             <div className="bg-white/80 backdrop-blur border border-[var(--od-dark-blue)]/10 rounded px-2 py-1 flex items-center gap-2 shadow-sm pointer-events-auto">
                 <div className="flex gap-0.5">
                     <div className="w-1 h-3 bg-[var(--od-mid-blue)] rounded-full animate-[height_1s_ease-in-out_infinite]" />
                     <div className="w-1 h-3 bg-[var(--od-dark-blue)] rounded-full animate-[height_1s_ease-in-out_infinite_0.2s]" />
                     <div className="w-1 h-3 bg-[var(--od-bright-blue)] rounded-full animate-[height_1s_ease-in-out_infinite_0.4s]" />
                 </div>
                 <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Live Network Feed</span>
            </div>
            {/* Compass / Scale indication mock */}
            <div className="opacity-30">
                 <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center">
                    <div className="w-0.5 h-3 bg-gray-500 relative top-[-25%] arrow-n" />
                 </div>
            </div>
        </div>

      </div>
    </div>
  )
}
