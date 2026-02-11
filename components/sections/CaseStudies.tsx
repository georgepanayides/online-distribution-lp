import { GridLines } from "@/components/ui/grid-lines";
import { SectionKicker } from "@/components/ui/section-kicker";
import {
	CaseStudiesSwiper,
	type CaseStudySlide,
} from "@/components/ui/case-studies/case-studies-swiper";

const CASE_STUDIES: CaseStudySlide[] = [
	{
		id: "aimn",
		clientName: "aim'n",
		clientLogoSrc: "/images/brands-work-with/OD-Logos_0002_Aimn.png",
		title: "High-velocity drops without backlog risk",
		problem:
			"Flash drops and demand spikes can overload pick/pack, causing missed carrier cut-offs and delayed tracking updates.",
		solution:
			"We stabilise throughput with wave planning, scan-gated accuracy, and tight Shopify order + inventory sync — keeping same-day dispatch predictable.",
		keywords: [
			"Shopify 3PL",
			"same-day dispatch",
			"pick & pack",
			"order spikes",
			"inventory sync",
			"carrier cut-offs",
		],
		imageSrc: "/images/PH1-Aisle-No-People-.jpg",
		imageAlt: "Warehouse aisle operations",
		stats: [
			{ label: "Peak Day", value: "5,000+", note: "Orders absorbed without cut-off slips" },
			{ label: "Accuracy", value: "99.8%", note: "Pick & pack quality at scale" },
			{ label: "Dispatch", value: "Same-Day", note: "Late orders still hit carrier windows" },
			{ label: "Visibility", value: "Live", note: "Realtime inventory + order status" },
		],
	},
	{
		id: "huski",
		clientName: "Huski",
		clientLogoSrc: "/images/brands-work-with/OD-Logos_0004_Huski.png",
		title: "Seasonal demand, stable fulfilment performance",
		problem:
			"Seasonality creates volatile volumes — the hard part is protecting lead times and returns quality without introducing manual work.",
		solution:
			"We run buffered cut-offs, controlled reverse logistics, and live operational visibility so peak weeks don’t degrade service.",
		keywords: [
			"seasonal fulfilment",
			"returns processing",
			"operational visibility",
			"lead time",
			"Auckland 3PL",
			"Christchurch 3PL",
		],
		imageSrc: "/images/2023_Online_Distribution_Library_Refresh_Chros_Chase_Photography-52-Copy-Copy.jpg",
		imageAlt: "Warehouse racking and inventory",
		stats: [
			{ label: "Lead Time", value: "< 24h", note: "Fast turn from order to dispatch" },
			{ label: "Returns", value: "Streamlined", note: "Controlled reverse logistics" },
			{ label: "Coverage", value: "Nationwide", note: "Auckland + Christchurch network" },
			{ label: "Cut-offs", value: "Protected", note: "Operational buffers during spikes" },
		],
	},
	{
		id: "mons-royale",
		clientName: "Mons Royale",
		clientLogoSrc: "/images/brands-work-with/OD-Logos_0000_Mons-Royale.png",
		title: "Complex SKUs, predictable dispatch",
		problem:
			"Variant-heavy catalogues and complex SKU rules increase mis-picks and exceptions — especially when order volumes rise.",
		solution:
			"We enforce SKU control through scan workflows, exception handling, and fast integrations so dispatch stays consistent without firefighting.",
		keywords: [
			"SKU accuracy",
			"warehouse scanning",
			"WMS workflows",
			"integrations",
			"3PL fulfilment",
			"New Zealand distribution",
		],
		imageSrc: "/images/IMG_0070-1024x1024.jpg",
		imageAlt: "Fulfilment operations and packaging",
		stats: [
			{ label: "SKU Control", value: "Tight", note: "Variant-heavy catalog handled cleanly" },
			{ label: "Ops Load", value: "Reduced", note: "Less firefighting in peak periods" },
			{ label: "SLA", value: "Consistent", note: "Service levels stay predictable" },
			{ label: "Integrations", value: "Fast", note: "Systems connect without friction" },
		],
	},
];

export function CaseStudies() {
	return (
		<section className="relative w-full py-24 sm:py-32 bg-[#F8FAFC] overflow-hidden">
			{/* Background depth */}
			<div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_55%_0%,rgba(82,184,232,0.14),transparent_65%)]" />
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
			<GridLines lineColor="border-od-dark-blue" opacity={0.08} />

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
				<div className="mb-10 md:mb-14 max-w-3xl">
					<SectionKicker label="Proof" className="mb-6" />
					<h2 className="text-4xl sm:text-5xl font-sans font-bold text-[var(--od-dark-blue)] mb-6 leading-[1.1]">
						Real brands. Real outcomes. <br />
						<span className="text-[var(--od-mid-blue)] opacity-80">Operational performance you can feel.</span>
					</h2>
					<p className="text-lg font-lato text-gray-600 leading-relaxed max-w-2xl">
						These are the moments where most 3PLs break: spikes, complex catalogues, and tight carrier windows. This is what it looks like when systems scale and service stays controlled.
					</p>
				</div>

				<CaseStudiesSwiper slides={CASE_STUDIES} />
			</div>
		</section>
	);
}

