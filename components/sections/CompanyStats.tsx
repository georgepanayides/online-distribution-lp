import React from "react";
import { GridLines } from "@/components/ui/grid-lines";
import { BentoGridOverlay } from "@/components/ui/bento-grid-overlay";
import { SectionKicker } from "@/components/ui/section-kicker";

const companyData = {
  net_promoter_score: {
    score: 68.9,
    context: "45.6% higher than the industry standard based on 2024 surveys",
  },
  established_year: 1988,
  ownership: {
    percentage: 100,
    description: "New Zealand owned and operated",
  },
  system_integrations: {
    active_integrations: 150,
  },
  warehousing_capacity: {
    total_square_metres: 37000,
  },
  fulfilment_centres: {
    count: 9,
    description: "Strategically located fulfilment centres",
  },
  industry_experience: {
    years: 35,
    description: "Years as an industry leader in New Zealand",
  },
  inventory_accuracy: {
    percentage: 99.99,
    year: 2023,
  },
  annual_orders_fulfilled: {
    count: 1100000,
  },
  team_size: {
    dedicated_team_members: 200,
  },
} as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-NZ").format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-NZ", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function StatCard({
  eyebrow,
  value,
  description,
  className = "",
  premium = false,
}: {
  eyebrow: string;
  value: React.ReactNode;
  description: React.ReactNode;
  className?: string;
  premium?: boolean;
}) {
  return (
    <div
      className={
        "relative rounded-none bg-white/70 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:bg-white/90 " +
        (premium ? "" : "") +
        className
      }
      data-bento-item
    >
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-od-mid-blue">
            {eyebrow}
          </p>
        </div>

        <div className="mt-3">
          <div className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-[color:var(--od-dark-blue)]">
            {value}
          </div>
          <div className="mt-2 font-lato text-sm md:text-base text-gray-600 leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompanyStats() {
  return (
    <section className="relative w-full py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(82,184,232,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60" />
      <GridLines opacity={0.08} lineColor="border-od-dark-blue" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
        <div className="mb-10 md:mb-14">
          <SectionKicker label="Scale Proof" />

          <h2 className="mt-5 font-sans text-4xl md:text-5xl font-medium tracking-tight text-[color:var(--od-dark-blue)]">
            Enterprise-grade fulfilment, built for control.
          </h2>
          <p className="mt-4 font-lato text-base md:text-lg text-gray-600 max-w-3xl">
            These are the operational realities behind the promise — accuracy, capacity, coverage,
            and systems that integrate cleanly into modern commerce.
          </p>
        </div>

        <div
          id="company-stats-bento"
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-od-dark-blue/10 ring-1 ring-od-dark-blue/8"
        >
          <StatCard
            eyebrow="Annual Orders"
            premium
            className="lg:col-span-6"
            value={<span>{formatCompact(companyData.annual_orders_fulfilled.count)}</span>}
            description={
              <>
                Fulfilled annually across our national network — supported by{" "}
                <span className="font-bold text-[color:var(--od-dark-blue)]">
                  {companyData.inventory_accuracy.percentage}% inventory accuracy
                </span>{" "}
                (measured {companyData.inventory_accuracy.year}).
              </>
            }
          />

          <StatCard
            eyebrow="Inventory Accuracy"
            className="lg:col-span-3"
            value={
              <span>
                {companyData.inventory_accuracy.percentage}
                <span className="text-xl md:text-2xl text-gray-500">%</span>
              </span>
            }
            description={<>Accuracy rate for {companyData.inventory_accuracy.year} stock takes.</>}
          />

          <StatCard
            eyebrow="NPS"
            className="lg:col-span-3"
            value={
              <span>
                {companyData.net_promoter_score.score}
                <span className="text-xl md:text-2xl text-gray-500">/100</span>
              </span>
            }
            description={companyData.net_promoter_score.context}
          />

          <StatCard
            eyebrow="Warehousing Capacity"
            className="lg:col-span-4"
            value={<span>{formatNumber(companyData.warehousing_capacity.total_square_metres)} sqm</span>}
            description={
              <>Capacity designed for high-throughput receiving, storage, and despatch workflows.</>
            }
          />

          <StatCard
            eyebrow="Fulfilment Centres"
            className="lg:col-span-4"
            value={<span>{companyData.fulfilment_centres.count}</span>}
            description={companyData.fulfilment_centres.description}
          />

          <StatCard
            eyebrow="System Integrations"
            className="lg:col-span-4"
            value={<span>{formatNumber(companyData.system_integrations.active_integrations)}+</span>}
            description={
              <>Active connections across storefronts, marketplaces, carriers, and operational tools.</>
            }
          />

          <StatCard
            eyebrow="NZ Owned"
            className="lg:col-span-4"
            value={<span>{companyData.ownership.percentage}%</span>}
            description={companyData.ownership.description}
          />

          <StatCard
            eyebrow="Established"
            className="lg:col-span-4"
            value={<span>{companyData.established_year}</span>}
            description={
              <>Long-term infrastructure and process maturity built over decades, not quarters.</>
            }
          />

          <StatCard
            eyebrow="Industry Experience"
            className="lg:col-span-4"
            value={<span>{companyData.industry_experience.years} years</span>}
            description={companyData.industry_experience.description}
          />

          <StatCard
            eyebrow="Dedicated Team"
            className="lg:col-span-12"
            value={<span>{formatNumber(companyData.team_size.dedicated_team_members)}+</span>}
            description={
              <>Dedicated team members across warehousing, transport, systems, and client operations.</>
            }
          />
          <BentoGridOverlay containerId="company-stats-bento" />
        </div>
      </div>
    </section>
  );
}
