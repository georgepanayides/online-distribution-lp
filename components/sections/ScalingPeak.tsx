"use client";

import { motion } from "framer-motion";
import { GridLines } from "@/components/ui/grid-lines";
import { RevealPanel } from "@/components/ui/animations/RevealPanel";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionKicker } from "@/components/ui/section-kicker";
import { TrendingUp } from "lucide-react";

export function ScalingPeak() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#F7FAFF]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      <GridLines lineColor="border-od-dark-blue" opacity={0.08} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-0 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-10 lg:gap-16 items-start">
          {/* Top-left: Text */}
          <div className="lg:col-start-1 lg:row-start-1 max-w-2xl">
            <RevealPanel>
              <SectionKicker label="Peak & Scaling" />
              <h2 className="mt-6 text-4xl md:text-5xl font-sans font-bold text-[color:var(--od-dark-blue)] tracking-tight leading-[1.1]">
                Kill the growth handbrake.
              </h2>
            </RevealPanel>
            <RevealPanel delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-gray-600 font-lato max-w-xl leading-relaxed">
                Your marketing works. The product is viral. The only risk is your fulfillment breaking under the pressure. We build the operational elasticity to take you from 50 to 5,000 orders a day—without you touching a box.
              </p>
            </RevealPanel>
          </div>

          {/* Top-right: Illustration */}
          <div className="lg:col-start-2 lg:row-start-1 relative">
            <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-[var(--od-light-blue)]/35 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl bg-white/70 border border-[var(--od-dark-blue)]/10 shadow-[0_18px_55px_rgba(0,59,92,0.10)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[var(--od-light-blue)]/25" />
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-[var(--od-dark-blue)]">
                <TrendingUp size={180} strokeWidth={1} />
              </div>

              <div className="relative z-10 p-8 md:p-12">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Daily Volume Capacity
                </p>

                <div className="flex items-end gap-3 mb-8">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-300 line-through decoration-2 decoration-[var(--od-mid-blue)]/50">
                      50
                    </span>
                  </div>

                  <div className="mb-2 text-[var(--od-mid-blue)]">
                    <ChevronRightIcon className="w-6 h-6" />
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl md:text-7xl font-sans font-bold text-[var(--od-dark-blue)]">
                      <AnimatedCounter value={5000} duration={4} />
                    </span>
                    <span className="text-lg font-bold text-[var(--od-mid-blue)]">+</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Startup</span>
                    <span>Scaleup</span>
                    <span>Market Leader</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-200/70 overflow-hidden relative">
                    <div className="absolute inset-0 flex justify-between px-2">
                      <div className="w-px h-full bg-white/60" />
                      <div className="w-px h-full bg-white/60" />
                    </div>
                    <motion.div
                      className="h-full bg-od-gradient"
                      initial={{ width: "5%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 3, ease: "circOut", delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-medium italic">
                    *Automated systems absorb demand spikes instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-left: Point */}
          <div className="lg:col-start-1 lg:row-start-2">
            <Article
              title="Elastic Infrastructure"
              body="Scaling destroys rigid systems. We provide a 'liquid' fulfillment layer that expands instantly. Black Friday surges, influencer drops, or sudden viral hits are no longer logistical threats—they are just revenue to be captured."
            />
          </div>

          {/* Bottom-right: Point */}
          <div className="lg:col-start-2 lg:row-start-2">
            <Article
              title="Founder Freedom"
              body="The ultimate benchmark of scale isn't volume—it's silence. Stop managing warehouse shifts. Stop packing boxes at 10 PM. Take a holiday. We professionalize the physical reality of your business so you can reclaim your role as CEO."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Article({ title, body }: { title: string, body: string }) {
    return (
        <RevealPanel>
      <div className="group pl-6 border-l-2 border-[var(--od-dark-blue)]/10 hover:border-[var(--od-mid-blue)]/70 transition-colors duration-500 cursor-default">
        <h3 className="text-xl font-semibold font-sans text-[var(--od-dark-blue)] mb-3 group-hover:text-[var(--od-mid-blue)] transition-colors duration-300">{title}</h3>
                <p className="text-gray-600 leading-relaxed font-lato text-base md:text-lg">
                    {body}
                </p>
            </div>
        </RevealPanel>
    )
}

// Simple internal icon component to avoid huge imports if not needed, 
// but using Lucide via lucide-react as standard.
function ChevronRightIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m9 18 6-6-6-6"/>
        </svg>
    )
}
