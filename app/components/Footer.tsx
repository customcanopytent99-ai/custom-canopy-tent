/** @format */

"use client";
import Link from "next/link";
import { cn } from "../../utils";

export default function Footer() {
  return (
    <footer className="bg-brand-gray-mid text-brand-text-muted font-sans">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-12 flex flex-wrap gap-16 justify-between">
        {/* Brand & Subtext */}
        <div className="flex-1 min-w-[300px] max-w-[400px]">
          <Link href="/" className="no-underline">
            <div className="text-xl font-extrabold tracking-widest text-brand-charcoal mb-6">
              CUSTOM TENT CANOPY
            </div>
          </Link>
          <p className="text-base leading-relaxed text-brand-text-muted max-w-[350px]">
            Setting the standard for custom event shelter through engineering,
            high-fidelity printing, and architectural resilience.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex gap-24 flex-wrap">
          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-brand-charcoal text-base font-semibold mb-2">
              Company
            </h4>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-brand-text-muted text-base no-underline hover:text-brand-charcoal transition-colors hover:underline decoration-brand-gray-mid underline-offset-4"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-brand-charcoal text-base font-semibold mb-2">
              Support
            </h4>
            {["Shipping Returns", "Sitemap", "Bulk Orders"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-brand-text-muted text-base no-underline hover:text-brand-charcoal transition-colors hover:underline decoration-brand-gray-mid underline-offset-4"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-gray-mid/80 border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex justify-between items-center flex-wrap gap-4">
          <p className="text-sm text-brand-text-muted">
            © 2024 Architectural Canopies. Engineered for Resilience.
          </p>
          <div className="flex gap-4 text-brand-text-muted">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
