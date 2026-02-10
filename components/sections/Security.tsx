
import React from "react";
import { GridLines } from "@/components/ui/grid-lines";
import { SectionKicker } from "@/components/ui/section-kicker";
import { SecurityIsometricPanes } from "@/components/ui/security/isometric-panes";

export function Security() {
	const panes = [
		{
			id: "people-process",
			iconSrc: "/icons/Target - Gradient.svg",
			iconAlt: "Target icon",
			strengthLabel: "Layer 01",
			title: "Controlled access",
			summary: "Vetted staff, logged actions, and repeatable SOPs.",
			content: (
				<div className="text-left">
					<p className="font-sans font-bold text-lg text-[color:var(--od-dark-blue)]">
						People and process
					</p>
					<p className="mt-2 font-lato text-base text-gray-600">
						Tight access controls prevent drift. Every movement is attributable.
					</p>
					<ul className="mt-6 space-y-2 font-lato text-sm text-gray-700">
						<li>Role-based permissions and unique user access</li>
						<li>Induction + ongoing training for core warehouse flows</li>
						<li>Pick/pack verification checks for high-risk SKUs</li>
						<li>Incident logging with clear escalation paths</li>
					</ul>
				</div>
			),
		},
		{
			id: "facility",
			iconSrc: "/icons/Blue Cube - Colour.svg",
			iconAlt: "Cube icon",
			strengthLabel: "Layer 02",
			title: "Secure facilities",
			summary: "Perimeter controls and zone-based protection.",
			content: (
				<div className="text-left">
					<p className="font-sans font-bold text-lg text-[color:var(--od-dark-blue)]">
						Perimeter and zones
					</p>
					<p className="mt-2 font-lato text-base text-gray-600">
						Your inventory is protected by physical controls that match real warehouse flow.
					</p>
					<ul className="mt-6 space-y-2 font-lato text-sm text-gray-700">
						<li>Controlled entry points and visitor sign-in</li>
						<li>CCTV coverage with retention and review practices</li>
						<li>Restricted zones for higher-value inventory</li>
						<li>Clear separation of inbound, storage, and despatch lanes</li>
					</ul>
				</div>
			),
		},
		{
			id: "systems",
			iconSrc: "/icons/Target - Dark Blue.svg",
			iconAlt: "Target icon",
			strengthLabel: "Layer 03",
			title: "System visibility",
			summary: "Audit trails, monitoring, and exception reporting.",
			content: (
				<div className="text-left">
					<p className="font-sans font-bold text-lg text-[color:var(--od-dark-blue)]">
						Systems and monitoring
					</p>
					<p className="mt-2 font-lato text-base text-gray-600">
						We design for traceability — so you can answer “what happened?” instantly.
					</p>
					<ul className="mt-6 space-y-2 font-lato text-sm text-gray-700">
						<li>Event history for stock adjustments and order edits</li>
						<li>Exceptions surfaced early (short picks, mismatches, delays)</li>
						<li>Regular audits and reconciliation routines</li>
						<li>Operational reporting aligned to your KPIs</li>
					</ul>
				</div>
			),
		},
	];

	return (
		<section className="relative w-full py-16 sm:py-24 bg-[#F8FAFC] overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(65%_75%_at_50%_0%,rgba(82,184,232,0.12),transparent_70%)]" />
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60" />

			{/* Hero-consistent slash geometry */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 right-0 w-[60%] h-full bg-od-mid-blue/5 transform -skew-x-12 translate-x-1/4" />
				<div
					className="absolute top-0 right-0 w-[25%] h-full transform -skew-x-12 translate-x-1/2 opacity-[0.10]"
					style={{ backgroundImage: "var(--image-od-gradient)" }}
				/>
			</div>

			<GridLines opacity={0.08} lineColor="border-od-dark-blue" />

			<div className="relative max-w-6xl mx-auto px-4 sm:px-0">
				<div className="max-w-3xl mx-auto text-center">
					<SectionKicker label="Security" />

					<h2 className="mt-5 font-sans text-4xl md:text-5xl font-bold tracking-tight text-[color:var(--od-dark-blue)]">
						Uncompromising security.
						<br />
						<span className="text-[var(--od-mid-blue)] opacity-80">Zero guesswork.</span>
					</h2>
					<p className="mt-4 font-lato text-base md:text-lg text-gray-600">
						We look after your inventory like it’s our own — with layered controls across people,
						perimeter, and systems. It’s practical protection, designed for real warehouse flow.
					</p>
				</div>

				<div className="mt-16 max-w-5xl mx-auto relative z-10">
					<div className="text-center mb-10">
						<p className="font-sans font-bold text-lg text-[color:var(--od-dark-blue)]">
							Layered protection, visualised.
						</p>
						<p className="mt-2 font-lato text-base text-gray-600">
							Open each layer to reveal stronger controls.
						</p>
					</div>

					<SecurityIsometricPanes panes={panes} initialOpenId="people-process" />
				</div>
			</div>
		</section>
	);
}

