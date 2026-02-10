"use client";

import type { ReactNode, SVGProps } from "react";
import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

const TOP_FACE_D = "M0.5 53.6162L92.5 0.5H839L916.5 53.6162Z";
const FRONT_FACE_D = "M0.5 53.6162H916.5V122.116H0.5Z";
const OUTLINE_D =
	"M0.5 53.6162H916.5M0.5 53.6162V122.116H916.5V53.6162M0.5 53.6162L92.5 0.5H809.5H839L916.5 53.6162";

type TabsSvgProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
	uid: string;
	topStops: [string, string];
	frontStops: [string, string];
};

function TabsSvg({ className, uid, topStops, frontStops, ...props }: TabsSvgProps) {
	const topFillId = `${uid}-top-fill`;
	const frontFillId = `${uid}-front-fill`;
	const topSheenId = `${uid}-top-sheen`;
	const frontSheenId = `${uid}-front-sheen`;
	return (
		<svg
			viewBox="0 0 917 123"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
			focusable="false"
			{...props}
		>
			<defs>
				<linearGradient id={topFillId} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={topStops[0]} />
					<stop offset="100%" stopColor={topStops[1]} />
				</linearGradient>
				<linearGradient id={frontFillId} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={frontStops[0]} />
					<stop offset="100%" stopColor={frontStops[1]} />
				</linearGradient>

				<radialGradient id={topSheenId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(458 6) rotate(90) scale(90 600)">
					<stop offset="0" stopColor="rgba(255,255,255,0.90)" />
					<stop offset="1" stopColor="rgba(255,255,255,0)" />
				</radialGradient>
				<linearGradient id={frontSheenId} x1="0" y1="40" x2="917" y2="123">
					<stop offset="0" stopColor="rgba(255,255,255,0.55)" />
					<stop offset="45%" stopColor="rgba(255,255,255,0)" />
					<stop offset="100%" stopColor="rgba(145,197,255,0.18)" />
				</linearGradient>
			</defs>

			{/* Opaque face fills (matches perspective) */}
			<path d={TOP_FACE_D} fill={`url(#${topFillId})`} />
			<path d={FRONT_FACE_D} fill={`url(#${frontFillId})`} />

			{/* Glass overlays clipped to faces */}
			<path d={TOP_FACE_D} fill={`url(#${topSheenId})`} opacity={0.75} />
			<path d={FRONT_FACE_D} fill={`url(#${frontSheenId})`} opacity={0.65} />

			{/* Outline / seams */}
			<path d={OUTLINE_D} stroke="currentColor" />
		</svg>
	);
}

type Pane = {
	id: string;
	iconSrc?: string;
	iconAlt?: string;
	title: string;
	summary: string;
	strengthLabel: string;
	content: ReactNode;
	outcome?: {
		title?: string;
		body: string;
	};
};

type SecurityIsometricPanesProps = {
	panes?: Pane[];
	className?: string;
	initialOpenId?: string;
};

export function SecurityIsometricPanes({ panes = [], className, initialOpenId }: SecurityIsometricPanesProps) {
	const reduceMotion = useReducedMotion();
	const uid = useId();

	const items = useMemo<Pane[]>(() => {
		if (panes.length > 0) return panes;
		return [
			{ id: "layer-1", title: "", summary: "", strengthLabel: "", content: null },
			{ id: "layer-2", title: "", summary: "", strengthLabel: "", content: null },
			{ id: "layer-3", title: "", summary: "", strengthLabel: "", content: null },
		];
	}, [panes]);

	const initialIndex = useMemo(() => {
		if (!initialOpenId) return 0;
		const found = items.findIndex((p) => p.id === initialOpenId);
		return found >= 0 ? found : 0;
	}, [initialOpenId, items]);

	const [openIndex, setOpenIndex] = useState<number>(initialIndex);

	return (
		<div className={className ?? "relative w-full isolate"}>
			{/* SVG tabs (stacked), shaded + glass, with expandable content */}
			<div className="mx-auto w-full max-w-6xl">
				<div className="relative w-full">
						<div className="grid grid-cols-1 gap-0">
							{items.map((pane, index) => {
							const isOpen = openIndex === index;
							const t = items.length <= 1 ? 0 : index / (items.length - 1);
								const controlsId = `${uid}-security-layer-${pane.id}`;
								const panelId = `${controlsId}-panel`;

							// Solid fills (opaque) inside the SVG so the geometry matches the perspective.
							const topA = 98 - t * 4;
							const topB = 95 - t * 6;
							const frontA = 95 - t * 6;
							const frontB = 90 - t * 10;
							const strokeAlpha = 0.22 + t * 0.22;
							const stackZ = items.length - index;
							const svgUid = `${uid}-pane-${index}`;

								const isFirstBelowOpen = openIndex != null && index === openIndex + 1;
								const overlapClass =
									index === 0
										? ""
										: openIndex != null && index > openIndex
											? isFirstBelowOpen
													? "-mt-px"
												: "-mt-6 sm:-mt-7"
											: "-mt-6 sm:-mt-7";

								return (
									<div key={pane.id} className="relative" style={{ zIndex: stackZ }}>
										<button
											type="button"
											className={
												"group relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--od-mid-blue)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] " +
												overlapClass
											}
											aria-expanded={isOpen}
											aria-controls={panelId}
											onClick={() => setOpenIndex(index)}
										>
											{/* SVG */}
											<motion.div
												className="relative drop-shadow-[0_18px_40px_rgba(0,59,92,0.10)]"
												initial={false}
												animate={reduceMotion ? undefined : { opacity: isOpen ? 1 : 0.78 }}
												transition={{ type: "spring", stiffness: 520, damping: 44 }}
											>
												<TabsSvg
													className="w-full h-auto"
													uid={svgUid}
													topStops={[`hsl(205 88% ${topA}%)`, `hsl(206 84% ${topB}%)`]}
													frontStops={[`hsl(206 78% ${frontA}%)`, `hsl(207 70% ${frontB}%)`]}
													style={{ color: `rgba(0, 59, 92, ${strokeAlpha})` }}
												/>
											</motion.div>

											{/* Face content aligned to the SVG front face (accordion header) */}
											<div className="pointer-events-none absolute left-[6%] right-[6%] top-[54%] bottom-[10%] flex items-center">
												<div className="flex w-full items-center justify-between gap-6">
													<p className="min-w-0 text-left font-sans font-semibold text-base sm:text-lg text-[color:var(--od-dark-blue)] truncate">
														{pane.title}
													</p>
													<motion.div
														className="shrink-0 text-[color:var(--od-dark-blue)]/55"
														initial={false}
														animate={reduceMotion ? undefined : { rotate: isOpen ? 45 : 0 }}
														transition={{ type: "spring", stiffness: 520, damping: 44 }}
													>
														<Plus className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden="true" />
													</motion.div>
												</div>
											</div>
									</button>

										{/* Inline expand area (opens directly under this pane) */}
										<AnimatePresence initial={false}>
											{isOpen && pane.content ? (
												<motion.div
													id={panelId}
													initial={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
													animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
													exit={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
													transition={{ type: "spring", stiffness: 520, damping: 44 }}
													className="overflow-visible"
												>
													<div className="-mt-3 border border-[var(--od-dark-blue)]/10 bg-white/70 shadow-[0_18px_55px_rgba(0,59,92,0.10)] w-[98%] mx-auto">
														<div className="p-6 sm:p-8">
															<div className="mx-auto max-w-2xl">{pane.content}</div>
														</div>
													</div>
												</motion.div>
											) : null}
										</AnimatePresence>
									</div>
								);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
