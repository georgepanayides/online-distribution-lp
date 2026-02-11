'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';

type CaseStudyStat = {
  label: string;
  value: string;
  note?: string;
};

export type CaseStudySlide = {
  id: string;
  clientName: string;
  clientLogoSrc: string;
  title: string;
  problem: string;
  solution: string;
  keywords?: string[];
  imageSrc: string;
  imageAlt: string;
  stats: CaseStudyStat[];
};

export function CaseStudiesSwiper({ slides }: { slides: CaseStudySlide[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides.length) return null;

  const active = slides[activeIndex] ?? slides[0];

  return (
    <div className="w-full">
      <div className="relative">
        <div className="overflow-hidden rounded-none border border-[var(--od-dark-blue)]/8 bg-white/35 backdrop-blur-[1px]">
          {/* Fixed header */}
          <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
            <div className="min-w-0">
              <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-od-mid-blue">
                Case Study
              </p>

              <div className="mt-1 flex items-center gap-3 min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    className="flex items-center gap-3 min-w-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <div className="relative h-9 w-9 shrink-0 rounded-none border border-[var(--od-dark-blue)]/10 bg-white">
                      <Image
                        src={active.clientLogoSrc}
                        alt={active.clientName}
                        fill
                        className="object-contain p-1.5"
                        sizes="36px"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                        <p className="font-sans font-semibold text-sm sm:text-base text-[color:var(--od-dark-blue)] truncate max-w-[42ch]">
                          {active.title}
                        </p>

                        {active.keywords && active.keywords.length ? (
                          <ul className="flex flex-wrap items-center gap-1.5" aria-label="Case study keywords">
                            {active.keywords.slice(0, 4).map((kw) => (
                              <li key={kw}>
                                <span className="inline-flex h-6 items-center rounded-none border border-[var(--od-dark-blue)]/12 bg-white/55 px-2 text-[10px] font-sans font-semibold tracking-wide text-[color:var(--od-dark-blue)]/70">
                                  {kw}
                                </span>
                              </li>
                            ))}
                            {active.keywords.length > 4 ? (
                              <li>
                                <span className="inline-flex h-6 items-center rounded-none border border-[var(--od-dark-blue)]/12 bg-white/55 px-2 text-[10px] font-sans font-semibold tracking-wide text-[color:var(--od-dark-blue)]/60">
                                  +{active.keywords.length - 4}
                                </span>
                              </li>
                            ) : null}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <p className="hidden sm:block text-[11px] font-lato text-gray-500">
                {String(activeIndex + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => swiper?.slidePrev()}
                  className="h-9 w-9 rounded-none border border-[var(--od-dark-blue)]/12 bg-white text-[color:var(--od-dark-blue)] hover:bg-[#F7FAFF] transition-colors"
                  aria-label="Previous case study"
                >
                  <ChevronLeft className="mx-auto h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => swiper?.slideNext()}
                  className="h-9 w-9 rounded-none border border-[var(--od-dark-blue)]/12 bg-white text-[color:var(--od-dark-blue)] hover:bg-[#F7FAFF] transition-colors"
                  aria-label="Next case study"
                >
                  <ChevronRight className="mx-auto h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-px bg-[var(--od-dark-blue)]/10" aria-hidden="true" />

          {/* Fixed brief (Problem / Solution) */}
          <div className="px-4 sm:px-5 py-4 bg-white/20">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden">
                <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-500">
                  Problem
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${active.id}-problem`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="mt-2 font-lato text-sm text-slate-600 leading-relaxed will-change-transform"
                  >
                    {active.problem}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="relative overflow-hidden">
                <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-500">
                  Solution
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${active.id}-solution`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="mt-2 font-lato text-sm text-slate-600 leading-relaxed will-change-transform"
                  >
                    {active.solution}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

          </div>

          <div className="h-px bg-[var(--od-dark-blue)]/10" aria-hidden="true" />

          {/* Swiping content (image only) */}
          <Swiper
            modules={[A11y, Keyboard]}
            onSwiper={setSwiper}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            slidesPerView={1}
            spaceBetween={28}
            loop
            speed={680}
            keyboard={{ enabled: true }}
            a11y={{ enabled: true }}
            className="w-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="w-full p-0">
                  <div className="relative aspect-[16/8] cursor-grab">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      priority={false}
                      className="object-cover"
                      sizes="(min-width: 1024px) 960px, 100vw"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Fixed stats (text-only animation) */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px divide-x divide-gray-200">
              {active.stats.slice(0, 4).map((stat, index) => (
                <div key={index} className="relative bg-white/35 backdrop-blur-[1px] p-4 md:p-5 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${active.id}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="will-change-transform"
                    >
                      <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-500">
                        {stat.label}
                      </p>
                      <p className="mt-2 font-sans font-bold text-xl text-[color:var(--od-dark-blue)]">
                        {stat.value}
                      </p>
                      {stat.note ? (
                        <p className="mt-1 font-lato text-xs text-gray-600 leading-relaxed">
                          {stat.note}
                        </p>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
