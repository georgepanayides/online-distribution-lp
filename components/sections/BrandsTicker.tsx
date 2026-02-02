import React from "react";
import { BrandScroller } from "@/components/ui/brand-scroller";
import { GridLines } from "@/components/ui/grid-lines";

const TRUSTED_BRANDS = [
  { id: "1", name: "Samsung" },
  { id: "2", name: "LG" },
  { id: "3", name: "Sony" },
  { id: "4", name: "Philips" },
  { id: "5", name: "Panasonic" },
  { id: "6", name: "Hisense" },
  { id: "7", name: "TCL" },
  { id: "8", name: "Haier" },
];

export function BrandsTicker() {
  return (
    <section className="relative w-full py-16 bg-[#F8FAFC] border-y border-gray-200/60 overflow-hidden">
      {/* Background & Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50" />
      <GridLines opacity={0.08} lineColor="border-od-dark-blue" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <div className="mb-8 text-center">
            <p className="text-sm font-bold text-od-mid-blue uppercase tracking-widest">
                Trusted by Industry Leaders
            </p>
        </div>

        <div style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <BrandScroller brands={TRUSTED_BRANDS} speed={40} />
        </div>
      </div>
    </section>
  );
}
