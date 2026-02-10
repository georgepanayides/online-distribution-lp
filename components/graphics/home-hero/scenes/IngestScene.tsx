"use client";

import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Receipt, 
  ShoppingBag, 
  Globe,
  Tag,
  Truck
} from "lucide-react";
import Image from "next/image";

const ORDER_ICONS_LEFT = [
  ShoppingCart,
  CreditCard,
  ShoppingBag,
  Tag,
];

const ORDER_ICONS_RIGHT = [
  Package,
  Receipt,
  Globe,
  Truck,
];

const ORDER_BADGE_COUNTS = [1, 2, 3, 4, 5, 7, 8, 9] as const;

function prng01(seed: number) {
  // deterministic pseudo-random in [0, 1)
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function getBadgeCount(seed: number) {
  // show a badge most of the time, but not always
  const show = prng01(seed) > 0.22;
  if (!show) return null;
  const idx = Math.floor(prng01(seed + 17) * ORDER_BADGE_COUNTS.length);
  return ORDER_BADGE_COUNTS[idx];
}

function OrderBadge({ value }: { value: number }) {
  return (
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-od-dark-blue text-white text-[9px] font-bold leading-4 text-center shadow-sm ring-2 ring-white">
      {value}
    </span>
  );
}

function HorizontalTicker({ 
  icons, 
  direction = "right", 
  className 
}: { 
  icons: React.ElementType[], 
  direction?: "left" | "right", // Direction of movement
  className?: string 
}) {
  // Quadruple the list to ensure smooth seamless loop
  const duplicatedIcons = [...icons, ...icons, ...icons, ...icons];
  const keyframes = direction === "right" ? ["-50%", "0%"] : ["0%", "-50%"];
  
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 overflow-hidden h-36 w-[44%] flex items-center ${className}`}
    >
      {/* Gradient Masks to fade edges */}
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

      <div className="w-full flex flex-col gap-3">
        <motion.div
          className="flex flex-row gap-4 px-4"
          animate={{ x: keyframes }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedIcons.map((Icon, i) => (
            <div
              key={`row1-${i}`}
              className="w-14 h-14 bg-white rounded-sm shadow-lg shadow-blue-900/10 border border-slate-100 flex items-center justify-center relative shrink-0"
            >
              <Icon size={24} className="text-od-mid-blue opacity-80" strokeWidth={1.5} />
              {(() => {
                const badge = getBadgeCount(i + (direction === "right" ? 100 : 200));
                return badge ? <OrderBadge value={badge} /> : null;
              })()}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-row gap-4 px-4"
          animate={{ x: keyframes }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedIcons
            // offset the second row so it doesn't mirror row one
            .slice(2)
            .concat(duplicatedIcons.slice(0, 2))
            .map((Icon, i) => (
              <div
                key={`row2-${i}`}
                className="w-14 h-14 bg-white rounded-sm shadow-lg shadow-blue-900/10 border border-slate-100 flex items-center justify-center relative shrink-0"
              >
                <Icon size={24} className="text-od-mid-blue opacity-70" strokeWidth={1.5} />
                {(() => {
                  const badge = getBadgeCount(i + (direction === "right" ? 300 : 400));
                  return badge ? <OrderBadge value={badge} /> : null;
                })()}
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}

export function IngestScene() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      
      {/* Left Ticker - Flows Right (Towards Center) */}
      <HorizontalTicker 
        icons={ORDER_ICONS_LEFT} 
        direction="right" 
        className="left-0 justify-start pl-10" 
      />

      {/* Right Ticker - Flows Left (Towards Center) */}
      <HorizontalTicker 
        icons={ORDER_ICONS_RIGHT} 
        direction="left" 
        className="right-0 justify-end pr-10" 
      />

      {/* Central Hub (Brand Cube) */}
      <motion.div
        className="absolute z-20 w-42 h-42 bg-white rounded-xl shadow-2xl shadow-blue-900/30 border border-od-dark-blue/15 flex items-center justify-center scale-90 md:scale-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl" />
        <div className="relative w-16 h-16 z-10">
            <Image 
                src="/logos/Primary Positive - Colour.svg" 
                alt="OD Logo" 
                fill 
                className="object-contain"
            />
        </div>
      </motion.div>
    </div>
  );
}

