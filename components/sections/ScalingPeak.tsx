import { GridLines } from "@/components/ui/grid-lines";
import { RevealPanel } from "@/components/ui/animations/RevealPanel";
import { BentoIntersectionDots } from "@/components/ui/bento-intersection-dots";
import { SectionKicker } from "@/components/ui/section-kicker";
import { ScalingPeakCapacityCard } from "@/components/graphics/ScalingPeakCapacityCard";
import Image from "next/image";

const ARTICLES = [
  {
    title: "Elastic Infrastructure",
    body: "Scaling destroys rigid systems. We provide a 'liquid' fulfillment layer that expands instantly. Black Friday surges, influencer drops, or sudden viral hits are no longer logistical threats—they are just revenue to be captured.",
    iconSrc: "/icons/Blue Cube - Colour.svg",
    iconAlt: "Infrastructure",
  },
  {
    title: "Founder Freedom",
    body: "The ultimate benchmark of scale isn't volume—it's silence. Stop managing warehouse shifts. Stop packing boxes at 10 PM. Take a holiday. We professionalize the physical reality of your business so you can reclaim your role as CEO.",
    iconSrc: "/icons/Blue Cube - Colour.svg",
    iconAlt: "Focus",
  },
] as const;

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
            <RevealPanel delay={0.05}>
              <ScalingPeakCapacityCard fromValue={50} toValue={5000} />
            </RevealPanel>
          </div>

          {/* Bottom row: Two cards that touch */}
          <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2">
            <div
              id="scaling-peak-articles-bento"
              className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-none border border-gray-200 bg-white/90 shadow-xl shadow-od-mid-blue/5 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-gray-200 lg:before:hidden lg:after:absolute lg:after:inset-y-0 lg:after:left-1/2 lg:after:w-px lg:after:bg-gray-200"
            >
              <div data-bento-item className="relative overflow-hidden">
                  <div className="group relative">
                    {/* slash behind content */}
                    <div
                      className="pointer-events-none absolute bg-od-mid-blue/90 h-100 w-60 rotate-20 right-0 -bottom-15 blur-xl -z-1"
                      aria-hidden="true"
                    />

                    <div className="relative z-10 p-6 md:p-7">
                      <div className="flex flex-col items-start gap-4">
                        <div className="relative z-20 flex h-11 w-11 items-center justify-center">
                          <Image
                            src={ARTICLES[0].iconSrc}
                            alt={ARTICLES[0].iconAlt}
                            width={26}
                            height={26}
                            className="h-[26px] w-[26px]"
                          />
                        </div>

                        <h3 className="text-xl font-sans font-semibold text-[var(--od-dark-blue)] group-hover:text-[var(--od-mid-blue)] transition-colors duration-300">
                          {ARTICLES[0].title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed font-lato text-base">
                          {ARTICLES[0].body}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>

              <div data-bento-item className="relative overflow-hidden">
                  <div className="group relative">
                    {/* slash behind content */}
                    <div
                      className="pointer-events-none absolute bg-od-mid-blue/90 h-100 w-60 rotate-20 right-0 -bottom-15 blur-xl -z-1"
                      aria-hidden="true"
                    />

                    <div className="relative z-10 p-6 md:p-7">
                      <div className="flex flex-col items-start gap-4">
                        <div className="relative z-20 flex h-11 w-11 items-center justify-center">
                          <Image
                            src={ARTICLES[1].iconSrc}
                            alt={ARTICLES[1].iconAlt}
                            width={26}
                            height={26}
                            className="h-[26px] w-[26px]"
                          />
                        </div>

                        <h3 className="text-xl font-sans font-semibold text-[var(--od-dark-blue)] group-hover:text-[var(--od-mid-blue)] transition-colors duration-300">
                          {ARTICLES[1].title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed font-lato text-base">
                          {ARTICLES[1].body}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>

              <BentoIntersectionDots />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
