
import { PageHero } from "@/components/sections/PageHero";
import { BrandsTicker } from "@/components/sections/BrandsTicker";
import { CompanyStats } from "@/components/sections/CompanyStats";
import { CommandCenter } from "@/components/sections/CommandCenter";
import { Responsiveness } from "@/components/sections/Responsiveness";
import { WarehouseBlueprint } from "@/components/sections/WarehouseBlueprint";
import { ScalingPeak } from "@/components/sections/ScalingPeak";
import { Integrations } from "@/components/sections/Integrations";
import { ComplianceGrid } from "@/components/sections/ComplianceGrid";
import { Locations } from "@/components/sections/Locations";

export default function Home() {
  return (
    <main className="min-h-screen">
      <PageHero 
        acf_fc_layout="hero_section"
        heading="Modern Distribution for the Digital Age"
        subheading="Seamlessly connect your CMS to your frontend with our headless architecture solutions."
        cta_text="Get Started"
        cta_link="/services"
        background_image="/images/PH1-Aisle-No-People-.jpg"
        hero_graphic="3pl-animation"
        />
        <BrandsTicker />
        <CompanyStats />
        <CommandCenter />
        <Responsiveness />
        <WarehouseBlueprint />
        <ScalingPeak />
        <Integrations />
        <ComplianceGrid />
        <Locations />
    </main>
  );
}
