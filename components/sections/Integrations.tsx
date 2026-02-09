import { GridLines } from "@/components/ui/grid-lines"
import { IntegrationCircuit } from "@/components/ui/integrations/integration-circuit"
import Image from "next/image"

import { getIntegrationIconPath } from "@/components/ui/integrations/utils/getIntegrationIconPath"
import { SectionKicker } from "@/components/ui/section-kicker"

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

const featuredConnectors = ["Shopify", "Amazon", "NetSuite", "Xero"] as const

export function Integrations() {
  return (
    <section className="relative w-full py-12 sm:py-24 bg-white overflow-hidden">
        <GridLines lineColor="border-od-dark-blue" opacity={0.08} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div className="max-w-2xl">
                  <SectionKicker label="Ecosystem" className="mb-6" />
                    
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
                    {featuredConnectors.map((name) => {
                      const iconPath = getIntegrationIconPath(name)
                      return (
                        <div
                          key={name}
                          className="w-10 h-10 shrink-0 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center overflow-hidden"
                          title={name}
                          aria-label={name}
                        >
                          {iconPath ? (
                            <Image
                              src={iconPath}
                              alt={name}
                              width={20}
                              height={20}
                              className="h-10 w-10 border object-contain"
                            />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </div>
                      )
                    })}
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[var(--od-mid-blue)] flex items-center justify-center text-white text-xs font-medium relative z-10">
                            30+
                        </div>
                    </div>
                    <p className="text-xs font-mono text-gray-400 mt-2 text-right">Active Connectors</p>
                </div>
            </div>
        </div>

        {/* Circuit Visualization (full width breakout) */}
        <div className="relative z-10 w-full">
            <IntegrationCircuit data={integrationData} />
        </div>
    </section>
  )
}
