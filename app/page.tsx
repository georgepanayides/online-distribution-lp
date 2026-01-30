
import { PageHero } from "@/components/sections/PageHero";

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
    </main>
  );
}
