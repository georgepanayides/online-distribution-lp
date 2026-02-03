import Link from "next/link";
import Image from "next/image";
import { GridLines } from "@/components/ui/grid-lines";
import { Facebook, Linkedin, Twitter, Instagram, ArrowRight, MapPin, Mail, Phone } from "lucide-react";

const FOOTER_LINKS = {
  solutions: [
    { label: "3PL Warehousing", href: "/services/warehousing" },
    { label: "eCommerce Fulfillment", href: "/services/ecommerce" },
    { label: "B2B Distribution", href: "/services/b2b" },
    { label: "Returns Management", href: "/services/returns" },
    { label: "Kitting & Assembly", href: "/services/kitting" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Network", href: "/locations" },
    { label: "Careers", href: "/careers" },
    { label: "News & Insights", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Technology Platform", href: "/technology" },
    { label: "Client Portal", href: "/portal" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Integration Docs", href: "/docs" },
  ]
};

const SOCIAL_LINKS = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0F172A] text-white overflow-hidden border-t border-slate-800">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <GridLines opacity={0.05} lineColor="border-white" />
         {/* Gradient Glow from bottom */}
         <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_bottom,_var(--od-dark-blue)_0%,_transparent_70%)] opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0 pt-20 pb-12">
        
        {/* TOP SECTION: Logo & CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-800 pb-12 mb-12">
            <div className="max-w-md">
                <Link href="/" className="block relative w-[200px] h-[48px] mb-6">
                    <Image
                        src="/logos/Primary Positive - White.svg"
                        alt="Online Distribution"
                        fill
                        className="object-contain object-left"
                    />
                </Link>
                <p className="text-slate-400 font-lato leading-relaxed">
                    Premium 3PL and fulfillment solutions for high-growth brands. 
                    We bridge the gap between warehousing and technology.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                    href="/portal"
                    className="px-6 py-3 rounded-lg border border-slate-700 text-sm font-sans font-medium hover:bg-slate-800 transition-colors text-center"
                >
                    Client Login
                </Link>
                <Link 
                    href="/contact"
                    className="px-6 py-3 rounded-lg bg-white text-[#0F172A] text-sm font-sans font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                    Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>

        {/* MIDDLE SECTION: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            
            {/* Column 1: Solutions */}
            <div>
                <h4 className="font-sans font-bold text-lg mb-6">Solutions</h4>
                <ul className="space-y-3">
                    {FOOTER_LINKS.solutions.map((link) => (
                        <li key={link.label}>
                            <Link 
                                href={link.href} 
                                className="text-slate-400 hover:text-od-light-blue font-lato text-sm transition-colors block py-0.5"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Column 2: Company */}
            <div>
                <h4 className="font-sans font-bold text-lg mb-6">Company</h4>
                <ul className="space-y-3">
                    {FOOTER_LINKS.company.map((link) => (
                        <li key={link.label}>
                            <Link 
                                href={link.href} 
                                className="text-slate-400 hover:text-od-light-blue font-lato text-sm transition-colors block py-0.5"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
                <h4 className="font-sans font-bold text-lg mb-6">Resources</h4>
                <ul className="space-y-3">
                    {FOOTER_LINKS.resources.map((link) => (
                        <li key={link.label}>
                            <Link 
                                href={link.href} 
                                className="text-slate-400 hover:text-od-light-blue font-lato text-sm transition-colors block py-0.5"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
                <h4 className="font-sans font-bold text-lg mb-6">Contact</h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-400 text-sm font-lato">
                        <MapPin className="w-5 h-5 text-od-mid-blue shrink-0" />
                        <span>
                            123 Logistics Way,<br />
                            Auckland 1024,<br />
                            New Zealand
                        </span>
                    </li>
                    <li>
                        <a href="tel:+6490000000" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm font-lato transition-colors">
                            <Phone className="w-5 h-5 text-od-mid-blue shrink-0" />
                            <span>+64 9 000 0000</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:hello@onlinedistribution.com" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm font-lato transition-colors">
                            <Mail className="w-5 h-5 text-od-mid-blue shrink-0" />
                            <span>hello@onlinedistribution.com</span>
                        </a>
                    </li>
                </ul>
            </div>

        </div>

        {/* BOTTOM SECTION: Legal & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 gap-6">
            
            <div className="text-slate-500 text-xs font-lato">
                © {currentYear} Online Distribution Ltd. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
                 {/* Legal Links */}
                 <div className="flex gap-6 text-xs text-slate-500 font-lato">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                 </div>

                 {/* Social Icons */}
                 <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
                    {SOCIAL_LINKS.map((social) => (
                        <a 
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-od-mid-blue transition-colors"
                            aria-label={social.label}
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                 </div>
            </div>

        </div>

      </div>
    </footer>
  );
}
