'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface RotatingCubeProps {
  size?: number;
  className?: string;
}

export function RotatingCube({ size = 25, className = '' }: RotatingCubeProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="w-full h-full"
        animate={{ 
          rotate: [0, 1250, -1250, 0], // Rotate right (15deg), then left (-15deg), then back to center
        }}
        transition={{ 
          duration: 4, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.33, 0.66, 1] // Timing distribution
        }}
      >
        <Image 
          src="/icons/Blue Cube - Colour.svg" 
          alt="Online Distribution Cube" 
          width={size} 
          height={size}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
