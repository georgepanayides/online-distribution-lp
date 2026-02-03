import { GridLines } from "@/components/ui/grid-lines"
import { IntegrationCircuit } from "@/components/ui/integration-circuit"

const integrationData = {
  "inventory_erps": [
    "CIN7",
    "Dynamics 365",
    "Extensiv",
    "MYOB Acumatica",
    "NetSuite",
    "Odoo",
    "Oracle",
    "SAP",
    "Unleashed"
  ],
  "shopping_carts": [
    "Amazon",
    "BigCommerce",
    "Magento",
    "Shopify",
    "Spreecommerce",
    "WIX",
    "WooCommerce"
  ],
  "finance_accounting": [
    "Business Central",
    "MYOB",
    "QuickBooks",
    "Quicken",
    "Xero"
  ],
  "return_management": [
    "Loop Returns",
    "ReBound",
    "AfterShip",
    "Starshipit"
  ],
  "crms_communications": [
    "Klaviyo",
    "Salesforce",
    "Zoho CRM"
  ]
}

export function Integrations() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--od-light-blue)]/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        <GridLines lineColor="border-od-dark-blue" opacity={0.08} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[var(--od-dark-blue)]/10 pb-12">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--od-light-blue)]/30 border border-[var(--od-dark-blue)]/10 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--od-bright-blue)] animate-pulse" />
                        <span className="text-xs font-mono text-[var(--od-dark-blue)] uppercase tracking-wider">
                            Ecosystem
                        </span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl font-sans font-medium text-[var(--od-dark-blue)] mb-6 leading-[1.1]">
                        Seamlessly Integrated. <br />
                        <span className="text-[var(--od-mid-blue)] opacity-80">Totally Connected.</span>
                    </h2>
                    
                    <p className="text-lg font-lato text-gray-600 max-w-xl leading-relaxed">
                        We plug directly into your existing tech stack. Whether you run on Shopify, NetSuite, or a custom build, our systems shake hands with yours instantly.
                    </p>
                </div>

                <div className="hidden md:block pb-2">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100/50 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-gray-300" />
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[var(--od-mid-blue)] flex items-center justify-center text-white text-xs font-medium relative z-10">
                            30+
                        </div>
                    </div>
                    <p className="text-xs font-mono text-gray-400 mt-2 text-right">Active Connectors</p>
                </div>
            </div>

            {/* Circuit Visualization */}
            <IntegrationCircuit data={integrationData} />

        </div>
    </section>
  )
}
