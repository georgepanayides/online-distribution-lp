import React from 'react';
import Link from 'next/link';
import type { HeroSection } from '@/types/wordpress';
import { ArrowRight } from 'lucide-react';
import { GridLines } from '@/components/ui/grid-lines';
// import { HomeHeroGraphic } from '@/components/graphics/HomeHeroGraphic';
// import { LogisticsSequence } from '@/components/graphics/LogisticsSequence';
import { SmartDespatchCard } from '@/components/graphics/SmartDespatchCard';

export function PageHero({ 
  heading, 
  subheading, 
  cta_text, 
  cta_link, 
  background_image,
  hero_graphic
}: HeroSection) {
  const bgUrl = typeof background_image === 'string' ? background_image : background_image?.url;

  return (
    // Light Theme: Pale almost white background with subtle gradient
    <section className="relative w-full h-[700px] lg:h-[800px] flex items-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-sky-50 group">
        
      {/* GLOBAL GRID LINES - Darker lines for light theme */}
      <GridLines opacity={0.08} lineColor="border-od-dark-blue" />

      {/* Shapes Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Shape A: Large Angled Block acting as a "Bay" (Mid Blue) */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-od-mid-blue/5 transform -skew-x-12 translate-x-1/4" />
        
        {/* Shape B: Highlighting "Flow" or "Movement" (Image or Bright Blue) */}
        {/* We use a container with overflow-hidden to act as the mask */}
        <div className="absolute top-0 right-0 w-[25%] h-full transform -skew-x-12 translate-x-1/2 overflow-hidden border-l border-white/50">
           {bgUrl ? (
             <>
               {/* 
                 The Image: 
                 1. We counter-skew (skewX(12deg)) so the image looks upright 
                 2. We scale it up so it covers the skewed bounds
               */}
               <div 
                 className="absolute inset-0 bg-cover bg-center object-cover opacity-60 grayscale ease-out"
                 style={{ 
                   backgroundImage: `url(${bgUrl})`,
                   transform: 'skewX(12deg) scale(1.5)' 
                 }}
               />
               {/* Tint Overlay to keep it subtle */}
               <div className="absolute inset-0 bg-od-mid-blue/20 mix-blend-multiply" />
             </>
           ) : (
             <div className="w-full h-full bg-od-bright-blue/10" />
           )}
        </div>
        
        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-od-bright-blue to-od-dark-blue opacity-15" />
      </div>

      {/* Content Container - MUST match GridLines max-w-6xl exactly */}
      <div className="relative z-10 w-full h-full">
        <div className="max-w-6xl mx-auto h-full grid grid-cols-4 px-4 sm:px-0">
          
          {/* Main Content: Spans first 3 columns */}
          <div className="col-span-4 lg:col-span-2 flex flex-col justify-center py-20 pr-8">
            
            {/* Heading: Dark Blue for contrast */}
            <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold text-od-dark-blue leading-tight mb-8">
              {heading} 
            </h1>
            
            {subheading && (
               <div className="flex items-start gap-6 mb-10">
                  <div className="hidden md:block w-16 h-1 bg-od-bright-blue mt-4"></div>
                  {/* Subheading: Dark Grey */}
                  <p className="font-lato text-slate-600 text-xl leading-relaxed max-w-2xl">
                      {subheading}
                  </p>
               </div>
            )}

            <div className="flex flex-col sm:flex-row gap-5">
              {cta_text && cta_link && (
                <Link 
                  href={cta_link}
                  className="group relative inline-flex items-center justify-center px-10 py-4 bg-od-bright-blue text-white font-sans font-bold tracking-wide rounded-sm overflow-hidden transition-all hover:bg-od-dark-blue hover:text-white shadow-lg border border-transparent"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {cta_text}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
              
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 border border-od-dark-blue/20 text-od-dark-blue font-sans font-semibold rounded-sm hover:bg-od-dark-blue/5 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Right Content / Graphic Area */}
          <div className="hidden lg:flex col-span-2 items-center justify-center relative z-20 pl-8">
            {hero_graphic === '3pl-animation' && <SmartDespatchCard />}
          </div>
          
        </div>
      </div>
    </section>
  );
}
