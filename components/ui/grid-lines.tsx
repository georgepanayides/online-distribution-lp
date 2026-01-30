import React from 'react';

interface GridLinesProps {
  opacity?: number;
  lineColor?: string;
  className?: string;
}

export function GridLines({ opacity = 0.1, lineColor = "border-white", className = "" }: GridLinesProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}>
      {/* 
        Grid Container: centered, max-w-6xl
        Grid Cols 4: Creates 4 equal tracks (25% each)
      */}
      <div className={`max-w-6xl mx-auto h-full grid grid-cols-4`} style={{ opacity }}>
        
        {/* Column 1: Needs Left AND Right border (starts the grid) */}
        <div className={`h-full border-x ${lineColor}`} />
        
        {/* Column 2: Needs Right border */}
        <div className={`h-full border-r ${lineColor}`} />
        
        {/* Column 3: Needs Right border */}
        <div className={`h-full border-r ${lineColor}`} />
        
        {/* Column 4: Needs Right border (ends the grid) */}
        <div className={`h-full border-r ${lineColor}`} />
        
      </div>
    </div>
  );
}
