import Image from "next/image";
import Link from "next/link";
import { GridLines } from "@/components/ui/grid-lines";
import { SectionKicker } from "@/components/ui/section-kicker";

export function CTA() {
	return (
		<section className="relative w-full py-20 sm:py-24 bg-[#F8FAFC] overflow-hidden">
			{/* Background depth + motion language */}
			<div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(82,184,232,0.14),transparent_65%)]" />
			<div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70" />
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 right-0 w-[55%] h-full bg-od-mid-blue/5 transform -skew-x-12 translate-x-1/4" />
				<div
					className="absolute top-0 right-0 w-[18%] h-full transform -skew-x-12 translate-x-1/2 opacity-[0.10]"
					style={{ backgroundImage: "var(--image-od-gradient)" }}
				/>
			</div>

			<GridLines opacity={0.08} lineColor="border-od-dark-blue" />

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
				<div className="grid gap-10 lg:gap-12 md:grid-cols-12 md:items-center">
					<div className="md:col-span-7">
						<SectionKicker label="Get Started" />

						<h2 className="mt-6 font-sans text-4xl sm:text-5xl font-bold tracking-tight text-[color:var(--od-dark-blue)] leading-[1.06]">
							A clean start.
							<br />
							<span className="text-[var(--od-mid-blue)] opacity-80">
								A scoped plan in one call.
							</span>
						</h2>
						<p className="mt-5 font-lato text-lg text-slate-600 leading-relaxed max-w-xl">
							We align on volumes, cut-offs, and integrations — then define the workflow and controls that
							protect service when things spike.
						</p>

						<div className="mt-7 flex flex-col sm:flex-row gap-3">
							<Link
								href="/contact"
								className="inline-flex items-center justify-center px-5 py-3 font-sans font-bold text-white border border-od-dark-blue/10"
								style={{ backgroundImage: "var(--image-od-gradient)" }}
							>
								Book a call
							</Link>
							<Link
								href="/services"
								className="inline-flex items-center justify-center px-5 py-3 font-sans font-bold text-[color:var(--od-dark-blue)] border border-od-dark-blue/12 bg-white/70 hover:bg-[#F7FAFF] transition-colors"
							>
								Explore services
							</Link>
						</div>

						<div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-lato text-slate-600">
							<span className="inline-flex items-center rounded-none border border-od-dark-blue/12 bg-white/55 px-2.5 py-1">
								No obligation
							</span>
							<span className="inline-flex items-center rounded-none border border-od-dark-blue/12 bg-white/55 px-2.5 py-1">
								15 minutes
							</span>
							<span className="inline-flex items-center rounded-none border border-od-dark-blue/12 bg-white/55 px-2.5 py-1">
								Clear next step
							</span>
						</div>
					</div>

					<div className="md:col-span-5">
						<div className="relative overflow-hidden border border-od-dark-blue/10 bg-white/35 backdrop-blur-[1px]">
							<div className="absolute inset-0 opacity-[0.18]" aria-hidden="true"
								style={{
									backgroundImage:
										"linear-gradient(rgba(0,59,92,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(0,59,92,0.24) 1px, transparent 1px)",
									backgroundSize: "34px 34px",
								}}
							/>

							<div className="relative p-6">
								<div className="flex items-center justify-between gap-4">
									<div className="flex items-center gap-3 min-w-0">
										<div className="relative h-9 w-9 shrink-0 border border-od-dark-blue/10 bg-white">
											<Image
												src="/icons/Blue%20Cube%20-%20Colour.svg"
												alt=""
												fill
												className="object-contain p-1.5"
												sizes="36px"
											/>
										</div>
										<p className="text-xs font-sans font-bold uppercase tracking-widest text-slate-500 truncate">
											Operational intake
										</p>
									</div>
									<div
										className="h-1 w-14"
										style={{ backgroundImage: "var(--image-od-gradient)" }}
										aria-hidden="true"
									/>
								</div>

								<p className="mt-4 font-sans font-bold text-[color:var(--od-dark-blue)]">
									Volumes / cut-offs / integrations
								</p>
								<p className="mt-2 font-lato text-sm text-slate-600 leading-relaxed">
									We identify the handoffs that create delays — then map the controls that keep dispatch
									predictable.
								</p>

								<div className="mt-5 grid grid-cols-3 gap-px bg-od-dark-blue/10">
									{[
										{ label: "Receive", blocks: 5 },
										{ label: "Pick", blocks: 6 },
										{ label: "Despatch", blocks: 5 },
									].map((lane) => (
										<div key={lane.label} className="bg-white/55 p-3">
											<p className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500">
												{lane.label}
											</p>
											<div className="mt-3 grid gap-2">
												{Array.from({ length: lane.blocks }).map((_, i) => (
													<div
														key={i}
														className={
															"h-2 border border-od-dark-blue/10 " +
															(i % 3 === 1
																? "bg-od-mid-blue/10"
																: "bg-white/70")
														}
													/>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

