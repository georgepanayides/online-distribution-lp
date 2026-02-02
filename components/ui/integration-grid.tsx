'use client'

import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Database, 
  Wallet, 
  RefreshCcw, 
  MessageSquare,
  Activity, 
  ArrowRight,
  LucideIcon
} from 'lucide-react'

interface IntegrationGridProps {
  data: Record<string, string[]>
}

const CATEGORY_CONFIG: Record<string, { label: string, icon: React.ElementType, description: string }> = {
  inventory_erps: {
    label: "ERP & Inventory",
    icon: Database,
    description: "Sync stock levels instantly across all channels."
  },
  shopping_carts: {
    label: "Shopping Carts",
    icon: ShoppingCart,
    description: "Direct integrations with major e-commerce platforms."
  },
  finance_accounting: {
    label: "Finance & Accounting",
    icon: Wallet,
    description: "Automated billing and revenue reconciliation."
  },
  return_management: {
    label: "Return Management",
    icon: RefreshCcw,
    description: "Streamlined RMA processing and restocking."
  },
  crms_communications: {
    label: "CRM & CX",
    icon: MessageSquare,
    description: "Keep your support team in the loop."
  }
}

export function IntegrationGrid({ data }: IntegrationGridProps) {
  // Convert object to array for mapping
  const sections = Object.entries(data).map(([key, items]) => ({
    key,
    ...CATEGORY_CONFIG[key],
    items
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sections.map((section, index) => (
        <IntegrationCard 
          key={section.key} 
          section={section} 
          index={index} 
        />
      ))}
      
      {/* "More" Card to fill the grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: sections.length * 0.1, duration: 0.5 }}
        className="group relative flex flex-col justify-between p-8 bg-gradient-to-br from-[var(--od-light-blue)]/30 to-white border border-[var(--od-dark-blue)]/10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
        
        <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-lg border border-[var(--od-dark-blue)]/10 flex items-center justify-center mb-6 shadow-sm">
                <Activity className="w-6 h-6 text-[var(--od-dark-blue)]" />
            </div>
            <h3 className="font-sans text-xl text-[var(--od-dark-blue)] font-medium mb-2">
                Custom API
            </h3>
            <p className="font-lato text-[var(--od-mid-blue)] text-sm leading-relaxed mb-8">
                Need something bespoke? Our robust REST API allows you to build custom workflows and connect proprietary systems directly to our warehouse.
            </p>
        </div>

        <div className="relative z-10 mt-auto">
            <button className="flex items-center gap-2 text-sm font-sans font-medium text-[var(--od-dark-blue)] group-hover:gap-4 transition-all">
                View API Docs <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </motion.div>
    </div>
  )
}

interface IntegrationSection {
  key: string;
  label: string;
  icon: React.ElementType;
  description: string;
  items: string[];
}

function IntegrationCard({ section, index }: { section: IntegrationSection, index: number }) {
  const Icon = section.icon || Database

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white border border-[var(--od-dark-blue)]/10 hover:border-[var(--od-mid-blue)]/30 transition-colors duration-300 overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-8 border-b border-[var(--od-dark-blue)]/5 bg-gradient-to-b from-white to-[var(--od-light-blue)]/5">
        <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white rounded-lg border border-[var(--od-dark-blue)]/10 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Icon className="w-6 h-6 text-[var(--od-dark-blue)]" strokeWidth={1.5} />
            </div>
            <div className="px-2 py-1 rounded bg-[var(--od-light-blue)]/20 border border-[var(--od-dark-blue)]/10">
                <span className="text-xs font-mono text-[var(--od-dark-blue)]">{section.items.length} connectors</span>
            </div>
        </div>
        
        <h3 className="font-sans text-xl text-[var(--od-dark-blue)] font-medium mb-2">
            {section.label}
        </h3>
        <p className="font-lato text-[var(--od-mid-blue)] text-sm leading-relaxed">
            {section.description}
        </p>
      </div>

      {/* List Container */}
      <div className="p-6 bg-white min-h-[200px]">
        <ul className="space-y-3">
            {section.items.map((item: string, i: number) => (
                <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.1) + (i * 0.05) }}
                    className="flex items-center gap-3 group/item"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--od-mid-blue)]/30 group-hover/item:bg-[var(--od-bright-blue)] transition-colors" />
                    <span className="text-sm font-lato text-gray-600 group-hover/item:text-[var(--od-dark-blue)] transition-colors">
                        {item}
                    </span>
                </motion.li>
            ))}
        </ul>
      </div>

    </motion.div>
  )
}
