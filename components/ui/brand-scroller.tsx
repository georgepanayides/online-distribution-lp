"use client";

import { motion } from "framer-motion";

interface Brand {
  id: string;
  name: string;
}

interface BrandScrollerProps {
  brands: Brand[];
  className?: string;
  speed?: number; // Duration in seconds
}

export function BrandScroller({ brands, className = "", speed = 30 }: BrandScrollerProps) {
  // Duplicate the list to ensure seamless looping
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max items-center gap-16"
        animate={{
          x: ["0%", "-51%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="flex items-center justify-center min-w-[150px]"
          >
            {/* 
              Placeholder for Brand Logo. 
              In production, replace text with <Image src={brand.logo} ... /> 
              Style: Grayscale, hover to color? Or just simple opacity
            */}
            <span className="font-sans text-2xl font-bold text-gray-400 uppercase tracking-widest hover:text-od-mid-blue transition-colors duration-300 cursor-default">
              {brand.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
