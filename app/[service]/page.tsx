
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/PageHero";
import { BrandsTicker } from "@/components/sections/BrandsTicker";
import { Integrations } from "@/components/sections/Integrations";
import { Locations } from "@/components/sections/Locations";
import { Security } from "@/components/sections/Security";
import { CTA } from "@/components/sections/CTA";

const SERVICE_PAGES: Record<
	string,
	{
		heading: string;
		subheading: string;
		ctaText: string;
		ctaLink: string;
		backgroundImage?: string;
	}
> = {
	services: {
		heading: "Services Built for Modern Fulfilment",
		subheading:
			"A national 3PL network across Auckland and Christchurch — engineered for speed, visibility, and predictable service levels.",
		ctaText: "Talk to an Expert",
		ctaLink: "/contact",
		backgroundImage: "/images/PH1-Aisle-No-People-.jpg",
	},
	locations: {
		heading: "National Coverage, Local Execution",
		subheading:
			"See where we operate — and how we keep inventory close to customers without losing control.",
		ctaText: "Contact Us",
		ctaLink: "/contact",
		backgroundImage: "/images/PH1-Aisle-No-People-.jpg",
	},
	security: {
		heading: "Uncompromising Security",
		subheading:
			"Layered controls across perimeter, people, and systems — designed to protect stock without slowing warehouse flow.",
		ctaText: "Talk to an Expert",
		ctaLink: "/contact",
		backgroundImage: "/images/PH1-Aisle-No-People-.jpg",
	},
};

export default async function ServicePage({
	params,
}: {
	params: Promise<{ service: string }>;
}) {
	const { service } = await params;
	const page = SERVICE_PAGES[service];

	// Keep behaviour explicit: we only serve the slugs we link to.
	if (!page) notFound();

	return (
		<main className="min-h-screen">
			<PageHero
				acf_fc_layout="hero_section"
				heading={page.heading}
				subheading={page.subheading}
				cta_text={page.ctaText}
				cta_link={page.ctaLink}
				background_image={page.backgroundImage}
				hero_graphic="3pl-animation"
			/>
			{service === "security" ? (
				<Security />
			) : (
				<>
					<BrandsTicker />
					<Integrations />
					<Locations />
					<CTA />
				</>
			)}
		</main>
	);
}

