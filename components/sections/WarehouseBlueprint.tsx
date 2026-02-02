import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { GridLines } from "@/components/ui/grid-lines";
import { ProcessSchematic } from "@/components/graphics/ProcessSchematic";
import { RevealPanel } from "@/components/ui/animations/RevealPanel";

export function WarehouseBlueprint() {
  return (
    <section className="relative w-full py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(82,184,232,0.12),transparent_70%)]" />
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
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-12 items-start">
          {/* Left: Copy (no boxes) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center border border-gray-200/80 bg-transparent px-3 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-od-mid-blue">
                Operational Blueprint
              </span>
            </div>

            <h2 className="mt-5 font-sans text-4xl md:text-5xl font-bold tracking-tight text-[color:var(--od-dark-blue)]">
              A fulfilment workflow designed for total control.
            </h2>
            <p className="mt-4 font-lato text-base md:text-lg text-gray-600 max-w-xl">
              Every handoff is deliberate — sync, scan gates, exception handling, and despatch you can
              predict. This is how we close efficiency gaps without adding headcount.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-od-mid-blue/10 text-od-mid-blue">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-sans text-base font-bold text-[color:var(--od-dark-blue)]">
                    Sync + speed where it matters
                  </p>
                  <p className="mt-1 font-lato text-sm md:text-base text-gray-600 leading-relaxed">
                    Orders flow from your storefront/ERP into scan-ready warehouse tasks — no spreadsheets,
                    no re-keying, no lag.
                  </p>
                  <div className="mt-3 flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-od-mid-blue" />
                    <p className="font-lato text-sm md:text-base text-gray-600 leading-relaxed">
                      Exception rules surface issues early, before they become service failures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-od-mid-blue/10 text-od-mid-blue">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-sans text-base font-bold text-[color:var(--od-dark-blue)]">
                    Audit trail, enforced by the system
                  </p>
                  <p className="mt-1 font-lato text-sm md:text-base text-gray-600 leading-relaxed">
                    Scan gates at receipt, putaway, and pick create a defensible inventory position — and a
                    clean story when a customer questions it.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-od-dark-blue/10">
              <p className="text-xs font-bold uppercase tracking-widest text-od-mid-blue">Next Step</p>
              <p className="mt-3 font-sans text-lg md:text-xl font-bold tracking-tight text-[color:var(--od-dark-blue)]">
                See the workflow mapped to your operation.
              </p>
              <p className="mt-2 font-lato text-sm md:text-base text-gray-600 max-w-xl">
                We’ll identify the exact handoffs creating delays, then show how the system closes the gaps —
                integration, warehouse controls, and despatch.
              </p>

              <Link
                href="/process"
                className="group mt-5 inline-flex items-center gap-2 font-sans font-bold text-[color:var(--od-dark-blue)] hover:text-od-mid-blue transition-colors"
              >
                View the blueprint
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Animated panel only */}
          <div className="lg:col-span-5 h-full min-h-[400px] flex items-center">
            <RevealPanel delay={0.05} className="relative w-full h-full">
               <ProcessSchematic />
            </RevealPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
