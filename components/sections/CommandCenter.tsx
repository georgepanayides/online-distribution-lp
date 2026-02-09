"use client";

import React from "react";
import { GridLines } from "@/components/ui/grid-lines";
import { SectionKicker } from "@/components/ui/section-kicker";
import { ClientPortalDashboard } from "@/components/graphics/ClientPortalDashboard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from 'next/link';

const FEATURES = [
  "Real-time Inventory Sync",
  "Live Order Tracking",
  "Automated Alerts",
  "Custom Reporting"
];

export function CommandCenter() {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      {/* 
        Mandatory Light Theme Grid Config:
        lineColor="border-od-dark-blue"
        opacity={0.08}
      */}
      <GridLines opacity={0.08} lineColor="border-od-dark-blue" />
      
      {/* Background Decor: Subtle gradient to give depth */}
      <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-slate-50 to-white -z-10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <SectionKicker label="Client Portal" className="mb-4" />
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-od-dark-blue leading-tight">
              The Command Center. <br />
              <span className="text-od-mid-blue">Your Logistics OS.</span>
            </h2>
            <p className="mt-6 font-lato text-lg text-slate-600 leading-relaxed max-w-xl">
              Stop guessing where your stock is. Our custom-built portal gives you a
              god-mode view of your entire supply chain, from global freight to the
              final mile.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 min-w-[240px]">
             {FEATURES.map((feature, i) => (
               <div key={i} className="flex items-center gap-3">
                 <CheckCircle2 className="text-od-mid-blue w-5 h-5 flex-shrink-0" />
                 <span className="font-sans font-medium text-slate-700">{feature}</span>
               </div>
             ))}
             
             <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  href="/technology" 
                  className="group inline-flex items-center gap-2 text-od-dark-blue font-bold font-sans hover:text-od-mid-blue transition-colors"
                >
                  Explore our Tech <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
             </div>
          </div>
        </div>

        {/* The Mockup Graphic */}
        <div className="relative z-10">
           {/* Decorative 'Behind' Elements to ground the mockup */}
           <div className="absolute -inset-4 bg-gradient-to-r from-od-light-blue/20 to-od-mid-blue/10 rounded-2xl blur-2xl -z-10 opacity-60" />
           
           {/* <ClientPortalDashboard /> */}
        </div>

      </div>
    </section>
  );
}
