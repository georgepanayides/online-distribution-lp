'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PulsingTargetProps {
  size?: number;
  className?: string;
}

export function PulsingTarget({ size = 40, className = '' }: PulsingTargetProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="w-full h-full"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.85, 1, 0.85]
        }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut", 
          repeat: Infinity,
        }}
      >
        <Image 
          src="/icons/Target - Gradient.svg" 
          alt="Target" 
          width={size} 
          height={size}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
