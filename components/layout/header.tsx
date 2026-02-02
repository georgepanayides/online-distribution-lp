'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { GridLines } from "@/components/ui/grid-lines"

const NAV_LINKS = [
    { label: "Services", href: "/services" },
    { label: "Technology", href: "/technology" },
    { label: "Network", href: "/locations" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
]

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 h-[76px]">
                {/* Backplate + brand geometry */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 border-b"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.82)",
                            borderColor: "rgba(0,59,92,0.08)",
                            backdropFilter: "blur(16px)",
                        }}
                    />

                    {/* Subtle light-blue separation */}
                    <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_80%_0%,rgba(123,175,212,0.22),transparent_60%)]" />

                    {/* Forward slash accent (premium) */}
                    <div
                        className="absolute top-0 right-65.5 h-full w-[32.5%] opacity-9 transform -skew-x-12 translate-x-1/4"
                        style={{
                            backgroundImage: "var(--image-od-gradient)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    />

                    {/* Grid discipline */}
                    <GridLines opacity={0.08} lineColor="border-od-dark-blue" />
                </div>

                <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-0 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-50" aria-label="Go to homepage">
                        <div className="relative w-[180px] h-[40px]">
                            <Image
                                src="/logos/Primary Positive - Colour.svg"
                                alt="Online Distribution"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-[13px] font-lato font-medium tracking-wide text-slate-600 hover:text-[var(--od-dark-blue)] transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[var(--od-mid-blue)] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/portal"
                            className="px-4 py-2 text-[13px] font-lato font-semibold text-[var(--od-dark-blue)] hover:text-[var(--od-mid-blue)] transition-colors"
                        >
                            Client Portal
                        </Link>
                        <Link
                            href="/contact"
                            className="px-5 py-2.5 text-[13px] font-sans font-medium text-white rounded-lg shadow-[0_10px_30px_rgba(0,59,92,0.18)] hover:shadow-[0_14px_44px_rgba(0,59,92,0.22)] transition-all"
                            style={{ backgroundImage: "var(--image-od-gradient)" }}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        className="md:hidden relative z-50 p-2 text-[var(--od-dark-blue)]"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_80%_0%,rgba(123,175,212,0.24),transparent_60%)]" />
                        <GridLines opacity={0.08} lineColor="border-od-dark-blue" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full max-w-6xl mx-auto">
                        <div className="flex flex-col gap-5">
                            {NAV_LINKS.map((link) => (
                                <div key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-sans font-medium text-[var(--od-dark-blue)] block border-b border-slate-100 pb-4"
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pb-10 space-y-3">
                            <Link
                                href="/portal"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center w-full py-4 rounded-lg border border-[var(--od-dark-blue)]/20 text-[var(--od-dark-blue)] font-lato font-bold"
                            >
                                Client Portal
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center w-full py-4 rounded-lg text-white font-sans font-medium shadow-[0_14px_44px_rgba(0,59,92,0.22)]"
                                style={{ backgroundImage: "var(--image-od-gradient)" }}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
