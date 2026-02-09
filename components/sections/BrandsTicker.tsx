import React from "react";
import { BrandScroller } from "@/components/ui/brand-scroller";
import { GridLines } from "@/components/ui/grid-lines";

const TRUSTED_BRANDS = [
  {
    id: "mons-royale",
    name: "Mons Royale",
    logoSrc: "/images/brands-work-with/OD-Logos_0000_Mons-Royale.png",
  },
  {
    id: "allbirds",
    name: "Allbirds",
    logoSrc: "/images/brands-work-with/OD-Logos_0001_Allbirds.png",
  },
  {
    id: "aimn",
    name: "Aim'n",
    logoSrc: "/images/brands-work-with/OD-Logos_0002_Aimn.png",
  },
  {
    id: "wine-friend",
    name: "Wine Friend",
    logoSrc: "/images/brands-work-with/OD-Logos_0003_Wine-Friend.png",
  },
  {
    id: "huski",
    name: "Huski",
    logoSrc: "/images/brands-work-with/OD-Logos_0004_Huski.png",
  },
  {
    id: "mountain-warehouse",
    name: "Mountain Warehouse",
    logoSrc: "/images/brands-work-with/OD-Logos_0005_Mountain-Warehouse.png",
  },
  {
    id: "ethique",
    name: "Ethique",
    logoSrc: "/images/brands-work-with/OD-Logos_0006_Ethique.png",
  },
  {
    id: "ecosa",
    name: "Ecosa",
    logoSrc: "/images/brands-work-with/OD-Logos_0007_Ecosa.png",
  },
  {
    id: "chanui",
    name: "Chanui",
    logoSrc: "/images/brands-work-with/OD-Logos_0008_Chanui.png",
  },
  {
    id: "bushbuck",
    name: "Bushbuck",
    logoSrc: "/images/brands-work-with/OD-Logos_0009_Bushbuck.png",
  },
  {
    id: "boody",
    name: "Boody",
    logoSrc: "/images/brands-work-with/OD-Logos_0010_Boody.png",
  },
  {
    id: "almighty",
    name: "Almighty",
    logoSrc: "/images/brands-work-with/OD-Logos_0011_Almighty.png",
  },
  {
    id: "clean-collective",
    name: "Clean Collective",
    logoSrc: "/images/brands-work-with/OD-Logos_0012_Clean-Collective.png",
  },
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
