'use client'

import { motion } from "framer-motion"
import { GridLines } from "@/components/ui/grid-lines"
import { SectionKicker } from "@/components/ui/section-kicker"
import { 
  ShieldCheck, 
  Container, 
  Utensils, 
  Lock, 
  Server, 
  Users, 
  CheckCircle2,
  HardHat
} from "lucide-react"

const WMS_FEATURES = [
  "Proven omni-channel capability",
  "Real-time inventory visibility",
  "Multi-warehouse support",
  "Secure customised user access",
  "Industry best practice EDI",
  "SOC 2 Type II data security"
]

const SAFETY_STEPS = [
  "AI-powered surveillance tools",
  "Regular team upskilling",
  "Confidential counselling service",
  "Health insurance for employees",
  "Rigorous hazard management"
]

export function ComplianceGrid() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F8FAFC] overflow-hidden">
      <GridLines lineColor="border-od-dark-blue" opacity={0.08} />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[var(--od-light-blue)]/20 to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
        
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <SectionKicker label="Governance & Safety" className="mb-6" />

          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-[var(--od-dark-blue)] mb-6 max-w-3xl">
            Uncompromising Standards. <br />
            <span className="text-[var(--od-mid-blue)] opacity-80">Certified Security.</span>
          </h2>
          <p className="font-lato text-lg text-gray-600 max-w-2xl leading-relaxed">
             From MPI accreditation to SOC 2 Type II data security, our infrastructure is built on a foundation of rigorous compliance and an industry-leading safety culture.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">

          {/* Card 1: Safety Culture (Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 row-span-1 bg-white p-8 border border-[var(--od-dark-blue)]/10 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <HardHat className="w-32 h-32 text-[var(--od-dark-blue)]" />
             </div>

             <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-[var(--od-light-blue)]/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--od-dark-blue)]" />
                    </div>
                    <h3 className="text-xl font-sans font-medium text-[var(--od-dark-blue)]">
                        Safety Focused Operations
                    </h3>
                </div>
                
                <p className="text-gray-600 font-lato mb-8 leading-relaxed max-w-xl">
                    Our safety culture comes first. We are proud members of the <strong className="text-[var(--od-dark-blue)]">Business Leaders’ Health and Safety Forum</strong> since 2020, complying with the Health and Safety at Work Act and industry best practices.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                    {SAFETY_STEPS.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[var(--od-mid-blue)] flex-shrink-0" />
                            <span className="text-sm text-gray-700 font-lato">{step}</span>
                        </div>
                    ))}
                </div>
             </div>
          </motion.div>

          {/* Card 2: Tech Compliance (Tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 lg:row-span-2 bg-[var(--od-dark-blue)] p-8 relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
             
             <div className="relative z-10">
                <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                    <Lock className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-sans font-medium text-white mb-4">
                    Data Security & WMS
                </h3>

                <p className="text-white/70 font-lato text-sm mb-8">
                    SOC 2 Type II compliance for complete data security and real-time inventory visibility.
                </p>

                <ul className="space-y-4">
                    {WMS_FEATURES.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/90 border-b border-white/10 pb-3 last:border-0 font-lato">
                            <Server className="w-4 h-4 mt-0.5 text-[var(--od-light-blue)] flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
             </div>
          </motion.div>

          {/* Card 3: MPI Transitional */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 border border-[var(--od-dark-blue)]/10 hover:border-[var(--od-mid-blue)]/40 transition-colors group"
          >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Container className="w-6 h-6 text-[var(--od-dark-blue)]" />
                </div>
                <span className="text-[10px] font-mono border border-[var(--od-dark-blue)]/20 px-2 py-1 rounded text-[var(--od-dark-blue)]">
                    ATF CERTIFIED
                </span>
              </div>
              <h3 className="text-lg font-sans font-medium text-[var(--od-dark-blue)] mb-3">
                MPI Transitional Facilities
              </h3>
              <p className="text-sm font-lato text-gray-600 leading-relaxed">
                Equipped to handle domestic and international containers, taking the stress out of devanning with full MPI accreditation.
              </p>
          </motion.div>

          {/* Card 4: MPI Food Safety */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 border border-[var(--od-dark-blue)]/10 hover:border-[var(--od-mid-blue)]/40 transition-colors group"
          >
             <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                    <Utensils className="w-6 h-6 text-green-700" />
                </div>
                <span className="text-[10px] font-mono border border-green-700/20 px-2 py-1 rounded text-green-800 bg-green-50">
                    HACCP / NP1
                </span>
              </div>
              <h3 className="text-lg font-sans font-medium text-[var(--od-dark-blue)] mb-3">
                Food Safety Certified
              </h3>
              <p className="text-sm font-lato text-gray-600 leading-relaxed">
                Compliant with Food Act 2014 (National Programme 1) and HACCP principles for safe food handling and distribution.
              </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}