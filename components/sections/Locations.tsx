import { GridLines } from "@/components/ui/grid-lines"
import { SectionKicker } from "@/components/ui/section-kicker"
import { LocationMapPack } from "../ui/locations/LocationMapPack"

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
  const locations = [
    {
      id: "office",
      name: LOCATIONS.office.name,
      address: LOCATIONS.office.address,
      phone: LOCATIONS.office.phone,
      email: LOCATIONS.office.email,
      kind: "office" as const,
      city: "Christchurch" as const,
    },
    ...LOCATIONS.hubs.christchurch.map((address, index) => ({
      id: `chc-${index}`,
      name: `Christchurch Site ${index + 1}`,
      address,
      kind: "hub" as const,
      city: "Christchurch" as const,
    })),
    ...LOCATIONS.hubs.auckland.map((address, index) => ({
      id: `akl-${index}`,
      name: `Auckland Site ${index + 1}`,
      address,
      kind: "hub" as const,
      city: "Auckland" as const,
    })),
  ]

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F7FAFF] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      <GridLines lineColor="border-od-dark-blue" opacity={0.08} />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0 grid grid-cols-12">
        <div className="mb-12 md:mb-16 max-w-3xl col-span-5">
          <SectionKicker label="National Network" className="mb-6" />
          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-[var(--od-dark-blue)] mb-6">
            Strategic Coverage. <br />
            <span className="text-[var(--od-mid-blue)] opacity-80">Local Expertise.</span>
          </h2>
          <p className="text-lg font-lato text-gray-600 leading-relaxed max-w-2xl">
            With strategically located fulfilment centres across Auckland and Christchurch, we run a national 3PL network that puts inventory closer to customers — and keeps service levels predictable.
          </p>
        </div>
        <div className="col-span-7">
        <LocationMapPack locations={locations} />
        </div>
        </div>
    </section>
  )
}
