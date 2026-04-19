/** @format */

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "../../utils";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/shop", label: "Shop All" },
    { href: "/products/10x10", label: "10x10 Tents" },
    { href: "/products/10x15", label: "10x15 Tents" },
    { href: "/products/10x20", label: "10x20 Tents" },
    { href: "/quote", label: "Custom Quote" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-gray-mid transition-shadow duration-300",
        scrolled && "shadow-lg shadow-black/5",
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center h-[68px] gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0 no-underline">
          <span className="text-xl font-bold tracking-widest text-brand-charcoal-dark uppercase">
            Custom Tent Canopy
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-brand-text-muted hover:text-brand-charcoal-dark no-underline rounded transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative bg-transparent border-none cursor-pointer text-brand-text-muted p-2 rounded-full hover:bg-brand-gray-mid transition-colors flex items-center justify-center no-underline">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            href="/quote"
            className="bg-brand-orange hover:bg-brand-orange-hover px-5 py-2.5 text-sm text-white rounded-full font-bold no-underline transition-all shadow-sm hidden sm:block"
          >
            Get a Quote
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden bg-transparent border-none cursor-pointer p-2 text-brand-charcoal-dark flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-gray-mid bg-brand-gray-light px-6 py-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-base font-medium text-brand-text-dark no-underline border-b border-brand-gray-mid last:border-0 hover:text-brand-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-base font-medium text-brand-text-dark no-underline border-b border-brand-gray-mid hover:text-brand-orange transition-colors"
            >
              My Cart ({totalItems})
            </Link>
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 text-center bg-brand-orange text-white py-4 rounded-xl font-bold text-sm shadow-lg"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
