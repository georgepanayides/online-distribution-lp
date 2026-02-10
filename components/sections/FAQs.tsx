import React from "react";
import { GridLines } from "@/components/ui/grid-lines";
import { SectionKicker } from "@/components/ui/section-kicker";
import { CornerPulseDots } from "@/components/ui/faqs/corner-pulse-dots";
import { FaqAccordion, type FaqItem } from "@/components/ui/faqs/faq-accordion";

const FAQS: FaqItem[] = [
  {
    id: "integration-scope",
    question: "What platforms and carriers can you integrate with?",
    answer:
      "We support modern storefronts, ERPs, marketplaces, and carrier networks—designed to keep orders, inventory, and tracking in sync without manual re-keying. If you have a specific stack, we’ll confirm the integration path and ownership up front.",
  },
  {
    id: "onboarding-time",
    question: "How long does onboarding typically take?",
    answer:
      "Most implementations move quickly once the data sources are confirmed. We align on SKU structure, carton rules, service levels, and cut-offs first—then run a controlled go-live with clear checkpoints.",
  },
  {
    id: "inventory-accuracy",
    question: "How do you protect inventory accuracy at scale?",
    answer:
      "Accuracy is enforced by scan gates and exception rules at receipt, putaway, pick, and despatch. Every movement is recorded, and discrepancies surface as actionable tasks—not surprises.",
  },
  {
    id: "returns",
    question: "Can you handle returns and refurb workflows?",
    answer:
      "Yes. Returns can be triaged into restock, refurb, quarantine, or disposal flows with auditable condition notes and photo capture where needed. The goal is speed without losing control.",
  },
  {
    id: "locations",
    question: "Do you operate nationally across New Zealand?",
    answer:
      "We run a national footprint with strategically placed facilities to reduce delivery time and carrier risk. Your distribution strategy is mapped to where demand actually sits.",
  },
] as const;

export function FAQs() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F8FAFC] overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_55%_0%,rgba(82,184,232,0.14),transparent_65%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />

      {/* Small slash accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-od-mid-blue/5 transform -skew-x-12 translate-x-1/4" />
        <div
          className="absolute top-0 right-0 w-[18%] h-full transform -skew-x-12 translate-x-1/2 opacity-[0.10]"
          style={{ backgroundImage: "var(--image-od-gradient)" }}
        />
      </div>

      <GridLines opacity={0.08} lineColor="border-od-dark-blue" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
        <div className="max-w-3xl">
          <SectionKicker label="FAQs" />

          <h2 className="mt-6 font-sans text-4xl md:text-5xl font-bold tracking-tight text-[color:var(--od-dark-blue)]">
            Clear answers.
            <br />
            <span className="text-[var(--od-mid-blue)] opacity-80">Zero hand-waving.</span>
          </h2>
          <p className="mt-5 font-lato text-base md:text-lg text-slate-600 leading-relaxed">
            The fastest way to trust an operation is to understand how it behaves under pressure—
            integrations, accuracy, returns, and the constraints that actually matter.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative border border-od-dark-blue/10 bg-white/55 backdrop-blur-md">
            <CornerPulseDots />

            <div className="relative z-10">
              <FaqAccordion items={FAQS} defaultOpenId={FAQS[0].id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
