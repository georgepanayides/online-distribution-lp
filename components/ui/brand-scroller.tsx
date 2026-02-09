"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Brand {
  id: string;
  name: string;
  logoSrc?: string;
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
          x: ["0%", "-50.5%"],
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
            {brand.logoSrc ? (
              <Image
                src={brand.logoSrc}
                alt={brand.name}
                width={180}
                height={56}
                className="h-20 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="font-sans text-2xl font-bold text-gray-400 uppercase tracking-widest hover:text-od-mid-blue transition-colors duration-300 cursor-default">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
