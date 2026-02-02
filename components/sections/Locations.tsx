'use client'

import { motion } from "framer-motion"
import { GridLines } from "@/components/ui/grid-lines"
import { NetworkMap } from "@/components/graphics/NetworkMap"
import { MapPin, Phone, Mail, Building2, ArrowRight } from "lucide-react"

const LOCATIONS = {
  office: {
    name: "National Support Office",
    address: "306 Port Hills Road, Hillsborough, Christchurch",
    phone: "03 331 7700",
    email: "info@onlinedistribution.co.nz"
  },
  hubs: {
    christchurch: [
        "308 Port Hills Road, Christchurch",
        "52 Kennaway Road, Woolston, Christchurch",
        "98 Grays Road, Yaldhurst, Christchurch",
        "6 Caerphilly Place, Heathcote, Christchurch"
    ],
    auckland: [
        "42 Sir Woolf Fisher Drive, East Tamaki, Auckland",
        "181 James Fletcher Drive, Otahuhu, Auckland",
        "180 Savill Drive, Otahuhu, Auckland",
        "2–8 Freight Place, Mangere, Auckland"
    ]
  }
}

export function Locations() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white overflow-hidden">
      <GridLines lineColor="border-od-dark-blue" opacity={0.08} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Map & Intro */}
            <div className="flex flex-col">
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--od-light-blue)]/30 border border-[var(--od-dark-blue)]/10 mb-6">
                        <MapPin className="w-4 h-4 text-[var(--od-dark-blue)]" />
                        <span className="text-xs font-mono text-[var(--od-dark-blue)] uppercase tracking-wider">
                            National Network
                        </span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl font-sans font-medium text-[var(--od-dark-blue)] mb-6">
                        Strategic Coverage. <br />
                        <span className="text-[var(--od-mid-blue)] opacity-80">Local Expertise.</span>
                    </h2>
                    
                    <p className="text-lg font-lato text-gray-600 leading-relaxed mb-8">
                        With 8 strategically located fulfilment centres across Auckland and Christchurch, we offer nationwide 3PL coverage that puts your inventory closer to your customers.
                    </p>

                    {/* Support Office Card */}
                    <div className="p-6 bg-[#F8FAFC] border border-[var(--od-dark-blue)]/10 rounded-xl mb-8">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <Building2 className="w-5 h-5 text-[var(--od-dark-blue)]" />
                            </div>
                            <h4 className="font-sans font-medium text-[var(--od-dark-blue)]">
                                {LOCATIONS.office.name}
                            </h4>
                         </div>
                         <div className="space-y-3 font-lato text-sm text-gray-600 pl-2">
                             <div className="flex gap-3">
                                <MapPin className="w-4 h-4 text-[var(--od-mid-blue)] shrink-0 mt-1" />
                                <span>{LOCATIONS.office.address}</span>
                             </div>
                             <div className="flex gap-3">
                                <Phone className="w-4 h-4 text-[var(--od-mid-blue)] shrink-0" />
                                <span>{LOCATIONS.office.phone}</span>
                             </div>
                             <div className="flex gap-3">
                                <Mail className="w-4 h-4 text-[var(--od-mid-blue)] shrink-0" />
                                <a href={`mailto:${LOCATIONS.office.email}`} className="hover:text-[var(--od-bright-blue)] transition-colors">
                                    {LOCATIONS.office.email}
                                </a>
                             </div>
                         </div>
                    </div>
                </div>

                <NetworkMap />
            </div>

            {/* Right Column: Detailed Lists */}
            <div className="lg:pt-24 space-y-12">
                
                {/* Christchurch List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group"
                >
                     <div className="flex items-center justify-between border-b_ border-gray-100 mb-6">
                         <h3 className="text-2xl font-sans font-medium text-[var(--od-dark-blue)]">
                            Christchurch Hubs
                         </h3>
                         <span className="px-2 py-1 bg-[var(--od-light-blue)]/20 text-[var(--od-dark-blue)] text-xs font-bold rounded">
                            {LOCATIONS.hubs.christchurch.length} SITES
                         </span>
                     </div>
                     <ul className="space-y-4">
                        {LOCATIONS.hubs.christchurch.map((addr, i) => (
                            <LocationItem key={i} address={addr} index={i} />
                        ))}
                     </ul>
                </motion.div>

                {/* Auckland List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="group"
                >
                     <div className="flex items-center justify-between border-b_ border-gray-100 mb-6">
                         <h3 className="text-2xl font-sans font-medium text-[var(--od-dark-blue)]">
                            Auckland Hubs
                         </h3>
                         <span className="px-2 py-1 bg-[var(--od-light-blue)]/20 text-[var(--od-dark-blue)] text-xs font-bold rounded">
                            {LOCATIONS.hubs.auckland.length} SITES
                         </span>
                     </div>
                     <ul className="space-y-4">
                        {LOCATIONS.hubs.auckland.map((addr, i) => (
                            <LocationItem key={i} address={addr} index={i} />
                        ))}
                     </ul>
                </motion.div>

                {/* CTA Box */}
                <div className="mt-12 p-8 bg-[var(--od-dark-blue)] text-white relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-100" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h4 className="text-xl font-bold mb-2">Ready to expand your reach?</h4>
                            <p className="text-white/70 text-sm">Get a proposal for warehousing in either island.</p>
                        </div>
                        <button className="px-6 py-3 bg-white text-[var(--od-dark-blue)] font-bold text-sm hover:bg-[var(--od-light-blue)] transition-colors flex items-center gap-2">
                            Contact Sales <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  )
}

function LocationItem({ address, index }: { address: string, index: number }) {
    return (
        <motion.li 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
        >
            <div className="w-8 h-8 rounded-full bg-[var(--od-light-blue)]/10 flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-4 h-4 text-[var(--od-mid-blue)]" />
            </div>
            <div>
                <p className="text-gray-700 font-lato leading-relaxed">
                    {address}
                </p>
            </div>
        </motion.li>
    )
}
