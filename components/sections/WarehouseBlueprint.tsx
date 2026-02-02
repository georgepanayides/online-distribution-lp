"use client";

import React from "react";
import { GridLines } from "@/components/ui/grid-lines";
import { ProcessSchematic } from "@/components/graphics/ProcessSchematic";
import { ArrowRight, Box, Check, ShieldCheck, Zap } from "lucide-react";
import Link from 'next/link';

export function WarehouseBlueprint() {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      <GridLines opacity={0.08} lineColor="border-od-dark-blue" />
      
      {/** Background "Blueprint" styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">The Process</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-od-dark-blue leading-tight mb-6">
            Precision Engineered Logistics.
          </h2>
          <p className="font-lato text-lg text-slate-600 leading-relaxed">
            We don&apos;t just store boxes. We implement a rigorous, tech-enabled workflow 
            that transforms chaos into a predictable, scalable supply chain.
          </p>
        </div>

        {/* The Animated Diagram */}
        <div className="w-full bg-slate-50 border border-gray-100 rounded-2xl p-10 md:p-16 mb-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Box size={120} />
             </div>
             <ProcessSchematic />
        </div>

        {/* 3 Columns of Detail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <div className="w-12 h-12 bg-od-mid-blue/10 rounded-lg flex items-center justify-center mb-6 text-od-mid-blue">
                    <Zap size={24} />
                </div>
                <h3 className="font-sans text-xl font-bold text-od-dark-blue mb-3">Sync & Speed</h3>
                <p className="font-lato text-slate-600 leading-relaxed text-sm">
                    Orders flow automatically from your ERP or Shopping Cart (Shopify, NetSuite, etc.) 
                    directly to our warehouse floor scanners. Zero manual entry.
                </p>
            </div>
            
            <div>
                <div className="w-12 h-12 bg-od-mid-blue/10 rounded-lg flex items-center justify-center mb-6 text-od-mid-blue">
                    <ShieldCheck size={24} />
                </div>
                <h3 className="font-sans text-xl font-bold text-od-dark-blue mb-3">Audit-Ready Accuracy</h3>
                <p className="font-lato text-slate-600 leading-relaxed text-sm">
                    Every item is barcode scanned at receipt, putaway, and pick. 
                    Our system enforces 99.99% inventory accuracy before the label is printed.
                </p>
            </div>

            <div>
                <div className="w-12 h-12 bg-od-mid-blue/10 rounded-lg flex items-center justify-center mb-6 text-od-mid-blue">
                    <Check size={24} />
                </div>
                <h3 className="font-sans text-xl font-bold text-od-dark-blue mb-3">Scalable Output</h3>
                <p className="font-lato text-slate-600 leading-relaxed text-sm">
                    Surge volume? No problem. Our wave-picking algorithms and automated 
                    conveyor systems handle Black Friday peaks without breaking a sweat.
                </p>
            </div>
        </div>
        
        <div className="mt-16 text-center">
            <Link 
                href="/process"
                className="inline-flex items-center justify-center px-8 py-3 bg-od-dark-blue text-white font-sans font-bold rounded-sm hover:bg-od-mid-blue transition-colors gap-2"
            >
                See the full workflow <ArrowRight size={18} />
            </Link>
        </div>

      </div>
    </section>
  );
}
