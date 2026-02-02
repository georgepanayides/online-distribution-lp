'use client';

import React from "react";
import { motion } from "framer-motion";

interface RevealPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealPanel({ children, className = "", delay = 0 }: RevealPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ type: "spring", stiffness: 280, damping: 28, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
