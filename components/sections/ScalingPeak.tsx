"use client";

import { motion } from "framer-motion";
import { GridLines } from "@/components/ui/grid-lines";
import { RevealPanel } from "@/components/ui/animations/RevealPanel";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TrendingUp } from "lucide-react";

export function ScalingPeak() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-white">
      <GridLines />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-0 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <RevealPanel>
            <div className="flex items-center gap-3 mb-4">
               <span className="h-px w-8 bg-od-mid-blue" />
               <span className="text-xs font-bold uppercase tracking-widest text-od-mid-blue">Peak & Scaling</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-[color:var(--od-dark-blue)] tracking-tight leading-[1.1]">
              Kill the growth handbrake.
            </h2>
          </RevealPanel>
          <RevealPanel delay={0.1}>
            <p className="mt-6 text-xl text-gray-600 font-lato max-w-2xl leading-relaxed">
              Your marketing works. The product is viral. The only risk is your fulfillment breaking under the pressure. We build the operational elasticity to take you from 50 to 5,000 orders a day—without you touching a box.
            </p>
          </RevealPanel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left: The Visualization */}
          <div className="relative">
             {/* Decorative slash */}
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-od-mid-blue/5 rounded-full blur-3xl" />

             <div className="bg-[#F8FAFC] border border-slate-200 p-8 md:p-12 relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <TrendingUp size={180} strokeWidth={1} />
                </div>
                
                <div className="relative z-10">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#64748B] mb-4">Daily Volume Capacity</p>
                    
                    <div className="flex items-end gap-3 mb-8">
                        {/* Start */}
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-slate-300 line-through decoration-2 decoration-od-mid-blue/50">50</span>
                        </div>
                        
                        {/* Arrow */}
                        <div className="mb-2 text-od-mid-blue">
                            <ChevronRightIcon className="w-6 h-6" />
                        </div>

                        {/* End */}
                        <div className="flex items-baseline gap-1">
                            <span className="text-6xl md:text-7xl font-sans font-bold text-od-dark-blue">
                                <AnimatedCounter value={5000} duration={4} />
                            </span>
                            <span className="text-lg font-bold text-od-mid-blue">+</span>
                        </div>
                    </div>

                    {/* Progress Bar Visualization */}
                    <div className="space-y-4">
                         <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span>Startup</span>
                            <span>Scaleup</span>
                            <span>Market Leader</span>
                         </div>
                         <div className="h-3 w-full bg-slate-200 overflow-hidden relative">
                            {/* Grid marks */}
                            <div className="absolute inset-0 flex justify-between px-2">
                                <div className="w-px h-full bg-white/50" />
                                <div className="w-px h-full bg-white/50" />
                            </div>
                            <motion.div 
                                className="h-full bg-od-gradient"
                                initial={{ width: "5%" }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 3, ease: "circOut", delay: 0.2 }}
                                viewport={{ once: true }}
                            />
                         </div>
                         <p className="text-xs text-slate-500 font-medium italic">
                            *Automated systems absorb demand spikes instantly.
                         </p>
                    </div>
                </div>
             </div>
          </div>

          {/* Right: The Narrative Points */}
          <div className="space-y-12">
            
            <Article 
                title="Elastic Infrastructure"
                body="Scaling destroys rigid systems. We provide a 'liquid' fulfillment layer that expands instantly. Black Friday surges, influencer drops, or sudden viral hits are no longer logistical threats—they are just revenue to be captured."
            />
            
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
            <div className="group pl-6 border-l-2 border-slate-200 hover:border-od-mid-blue transition-colors duration-500 cursor-default">
                <h3 className="text-xl font-bold font-sans text-od-dark-blue mb-3 group-hover:text-od-mid-blue transition-colors duration-300">{title}</h3>
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
