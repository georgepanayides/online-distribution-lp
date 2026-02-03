import Image from "next/image";

import { GridLines } from "@/components/ui/grid-lines";
import { ResponsivenessSLA } from "../ui/responsiveness-sla";

export function Responsiveness() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F8FAFC] overflow-hidden">
      <GridLines lineColor="border-od-dark-blue" opacity={0.08} />

      {/* Subtle depth + forward motion */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(82,184,232,0.14),transparent_65%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-od-mid-blue/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-od-dark-blue/10">
              <Image
                src="/icons/Target - Gradient.svg"
                alt="Responsiveness"
                width={16}
                height={16}
                className="shrink-0"
              />
              <span className="text-xs font-bold text-od-dark-blue uppercase tracking-widest">
                Responsiveness
              </span>
            </div>

            <h2 className="mt-6 font-sans text-4xl sm:text-5xl font-bold text-[color:var(--od-dark-blue)] tracking-tight leading-[1.06]">
              Same-day response.
              <br />
              <span className="text-od-mid-blue">Two-hour order intervention.</span>
            </h2>
            <p className="mt-5 font-lato text-lg text-slate-600 leading-relaxed max-w-xl">
              When something breaks, you don’t need a ticket number — you need a clear owner,
              fast acknowledgement, and decisive action before customers feel it.
            </p>
          </div>

          <div className="w-full md:w-[360px]">
            <div className="border border-od-dark-blue/10 bg-white/70 backdrop-blur-sm p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                The Differentiator
              </p>
              <p className="mt-3 font-sans text-base font-semibold text-od-dark-blue leading-snug">
                “Will I actually get a response when something goes wrong?”
              </p>
              <p className="mt-3 font-lato text-sm text-slate-600 leading-relaxed">
                We back the relationship with explicit SLAs and intervention windows — not vague
                promises.
              </p>
            </div>
          </div>
        </div>

        <ResponsivenessSLA
          responseSlaLabel="Same-day response SLA"
          responseSlaDetail="Acknowledgement and next-step plan within the same business day."
          interventionSlaLabel="2hr order intervention SLA"
          interventionSlaDetail="Time-boxed intervention on orders at risk of breaching cut-off or carrier collection."
        />
      </div>
    </section>
  );
}
