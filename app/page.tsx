
import { PageHero } from "@/components/sections/PageHero";
import { BrandsTicker } from "@/components/sections/BrandsTicker";
import { CompanyStats } from "@/components/sections/CompanyStats";
import { Responsiveness } from "@/components/sections/Responsiveness";
import { WarehouseBlueprint } from "@/components/sections/WarehouseBlueprint";
import { ScalingPeak } from "@/components/sections/ScalingPeak";
import { Integrations } from "@/components/sections/Integrations";
import { ComplianceGrid } from "@/components/sections/ComplianceGrid";
import { Locations } from "@/components/sections/Locations";
import { FAQs } from "@/components/sections/FAQs";
import { Security } from "@/components/sections/Security";


export default function Home() {
  return (
    <main className="min-h-screen">
      <PageHero 
        acf_fc_layout="hero_section"
        heading="3PL Fulfilment Built for Total Control"
        subheading="Close efficiency gaps across receiving, storage, pick & pack, and despatch — with high‑throughput operations and end‑to‑end visibility."
        cta_text="Explore Services"
        cta_link="/services"
        background_image="/images/PH1-Aisle-No-People-.jpg"
          live_counter={{
            label: "Live Ops",
            metric: "Orders processed",
            start: 12873491,
            intervalMs: 900,
            stepMin: 8,
            stepMax: 38,
          }}
        shape_a_video_url="https://www.onlinedistribution.co.nz/wp-content/uploads/2024/06/Web-Welcome-Video-41-Seconds.mp4"
        hero_graphic="automation-film"
        />
        <BrandsTicker />
        <CompanyStats />
        <Responsiveness />
        <WarehouseBlueprint />
        <ScalingPeak />
        <Integrations />
        <ComplianceGrid />
        <Locations />
        <Security />
        <FAQs />
    </main>
  );
}
