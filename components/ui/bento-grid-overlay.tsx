"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Renders pulsing dots at the internal grid intersections of a container using CSS Grid/Flex.
 * It detects the positions of child elements with `data-bento-item` and calculates
 * where their corners meet.
 */
export function BentoGridOverlay({ containerId }: { containerId: string }) {
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const calculateDots = () => {
      const parentRect = container.getBoundingClientRect();
      const items = Array.from(container.querySelectorAll<HTMLElement>("[data-bento-item]"));
      
      if (items.length === 0) return;

      // Collect all vertical (x) and horizontal (y) lines from item edges
      // We map coordinates relative to the specific container
      const xCoords = new Set<number>();
      const yCoords = new Set<number>();

      const rects = items.map((item) => {
        const r = item.getBoundingClientRect();
        return {
          left: r.left - parentRect.left,
          right: r.right - parentRect.left,
          top: r.top - parentRect.top,
          bottom: r.bottom - parentRect.top,
        };
      });

      // Threshold to snap close lines (handling 1px gaps or subpixel rendering)
      const SNAP = 4;

      rects.forEach((r) => {
        // Add ALL edges (including outer perimeter) so dots appear at T-junctions on the border
        xCoords.add(r.left);
        xCoords.add(r.right);
        yCoords.add(r.top);
        yCoords.add(r.bottom);
      });

      // Cluster close coordinates to single lines
      const cluster = (coords: number[]) => {
        const sorted = coords.sort((a, b) => a - b);
        const clusters: number[] = [];
        
        if (sorted.length === 0) return [];

        let currentCluster = [sorted[0]];
        
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i] - sorted[i-1] < SNAP) {
            currentCluster.push(sorted[i]);
          } else {
            clusters.push(currentCluster.reduce((a, b) => a + b) / currentCluster.length);
            currentCluster = [sorted[i]];
          }
        }
        clusters.push(currentCluster.reduce((a, b) => a + b) / currentCluster.length);
        
        return clusters;
      };

      const uniqueX = cluster(Array.from(xCoords));
      const uniqueY = cluster(Array.from(yCoords));

      // Find intersection points where both an X line and a Y line exist
      // AND this point is actually bordered by items (corner vertex)
      const validPoints: { x: number; y: number }[] = [];

      uniqueX.forEach((x) => {
        uniqueY.forEach((y) => {
           // Refined check: A point is a valid visual intersection if it touches 
           // the corners of the grid items.
           // We check if this point (x,y) is roughly one of the corners of any rect.
           const isCorner = rects.some(r => 
             (Math.abs(r.left - x) < SNAP || Math.abs(r.right - x) < SNAP) &&
             (Math.abs(r.top - y) < SNAP || Math.abs(r.bottom - y) < SNAP)
           );

           if (isCorner) {
             validPoints.push({ x, y });
           }
        });
      });

      setDots(validPoints);
    };

    calculateDots();
    
    // Recalculate on resize
    const observer = new ResizeObserver(calculateDots);
    observer.observe(container);
    
    // Also window resize for layout shifts
    window.addEventListener("resize", calculateDots);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateDots);
    };
  }, [containerId]);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {dots.map((dot, i) => (
        <motion.div
          key={`${dot.x}-${dot.y}`}
          className="absolute w-3 h-3 -ml-1.5 -mt-1.5 flex items-center justify-center"
          style={{ left: dot.x, top: dot.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
             {/* Inner solid dot */}
            <div className="h-1.5 w-1.5 rounded-full bg-od-mid-blue/15" />
            
            {/* Pulsing ring */}
            <motion.div
                className="absolute inset-0 rounded-full border border-od-mid-blue/8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 1.4] }}
                transition={{
                duration: 2,
                ease: "easeOut",
                repeat: Infinity,
                delay: i * 0.1, // Stagger effect
                }}
            />
        </motion.div>
      ))}
    </div>
  );
}
