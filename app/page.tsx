/** @format */

"use client";
import Link from "next/link";
import { Shield, Palette, Timer } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-brand-gray-light min-h-screen font-sans">
      {/* ── HERO SECTION ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-24 flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-[clamp(3rem,5vw,6rem)] font-bold text-brand-charcoal leading-[0.95] tracking-[-0.04em] mb-8">
              Custom
              <br />
              <span className="text-brand-orange">Canopy</span>
              <br />
              Tents for
              <br />
              Events,
              <br />
              Brands &<br />
              Businesses
            </h1>
            <p className="text-lg text-brand-text-muted leading-relaxed max-w-[400px] mb-10">
              Engineered resilience for 10x10, 10x15, and 10x20 setups.
              Industrial grade aluminum frames meets high-fidelity custom
              printing.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/quote"
                className="bg-brand-orange text-white no-underline px-8 py-4 rounded font-semibold text-base transition-colors hover:bg-brand-orange-hover"
              >
                Get a Quote
              </Link>
              <Link
                href="/shop"
                className="border-2 border-brand-gray-mid text-brand-charcoal bg-white no-underline px-8 py-4 rounded font-semibold text-base transition-colors hover:border-brand-charcoal"
              >
                Shop Tents
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-[600px] relative">
            {/* Using standard placeholder styled div since we don't have the exact image */}
            <div className="w-full h-full bg-gradient-to-br from-brand-gray-mid to-[#CBD5E1] flex items-center justify-center">
              <div className="text-brand-text-muted text-2xl font-bold">
                Hero Image Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10x10 SERIES ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-brand-gray-mid pb-4 mb-10 gap-2">
          <h2 className="text-3xl font-bold text-brand-charcoal">
            10x10 <span className="text-brand-orange">SERIES</span>
          </h2>
          <div className="text-base text-brand-text-muted">
            Compact Professionalism
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tag: "Event Tent Pro",
              desc: "The industry standard for outdoor promotions.",
              bg: "bg-brand-gray-mid",
            },
            {
              tag: "Full Wall Kit",
              desc: "Complete enclosure for backdrop visibility.",
              bg: "bg-[#CBD5E1]",
            },
            {
              tag: "Half Wall Pack",
              desc: "Maintain ventilation while increasing brand surface.",
              bg: "bg-[#94A3B8]",
            },
          ].map((item, i) => (
            <div
              key={item.tag}
              className="bg-[#F1F4F6] rounded-xl overflow-hidden group"
            >
              <div
                className={`h-[300px] ${item.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
              >
                <span className="text-brand-gray-light font-bold">
                  Image Placeholder
                </span>
              </div>
              <div className="p-8 relative z-10 bg-[#F1F4F6]">
                <h3 className="text-xl font-semibold text-brand-charcoal mb-2">
                  {item.tag}
                </h3>
                <p className="text-[15px] text-brand-text-muted min-h-[3rem] mb-6">
                  {item.desc}
                </p>
                <Link
                  href="/products/10x10"
                  className="block bg-brand-gray-mid text-brand-charcoal text-center p-3.5 rounded-md font-semibold no-underline transition-colors hover:bg-[#CBD5E1]"
                >
                  CONFIGURE
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-brand-text-muted text-[15px] leading-relaxed max-w-[800px]">
          Our 10x10 custom canopy tents offer the perfect balance of portability
          and presence. Engineered with premium 40mm hexagonal aluminum frames,
          these tents provide 100 sq. ft. of heavy-duty, waterproof shelter
          ideal for farmers' markets, trade shows, and corporate outdoor events.
        </p>
      </section>

      {/* ── EXTENDED SIZES ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 10x15 EXTENDED */}
          <div className="bg-brand-gray-mid rounded-xl p-8 sm:p-12">
            <h3 className="text-2xl font-semibold text-brand-charcoal mb-6">
              10x15 <span className="text-brand-orange">EXTENDED</span>
            </h3>
            <p className="text-base text-brand-text-muted leading-relaxed mb-8 max-w-[450px]">
              Need more space? Our 10x15 tents provide a 150 sq. ft. footprint,
              perfect for larger product displays and checkout counters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
              <div className="flex gap-2">
                <div className="w-20 h-20 bg-[#CBD5E1] rounded-lg" />
                <div className="w-20 h-20 bg-[#94A3B8] rounded-lg" />
              </div>
              <Link
                href="/products/10x15"
                className="bg-brand-text-muted text-white px-8 py-3 rounded-md no-underline font-semibold transition-colors hover:bg-brand-charcoal"
              >
                View All
              </Link>
            </div>
          </div>
          {/* 10x20 MAXIMUM */}
          <div className="bg-brand-gray-mid rounded-xl p-8 sm:p-12">
            <h3 className="text-2xl font-semibold text-brand-charcoal mb-6">
              10x20 <span className="text-brand-orange">MAXIMUM</span>
            </h3>
            <p className="text-base text-brand-text-muted leading-relaxed mb-8 max-w-[450px]">
              The flagship. 200 sq. ft. of architectural branding. Designed for
              high-traffic environments and festivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
              <div className="flex gap-2">
                <div className="w-20 h-20 bg-[#CBD5E1] rounded-lg" />
                <div className="w-20 h-20 bg-[#94A3B8] rounded-lg" />
              </div>
              <Link
                href="/products/10x20"
                className="bg-brand-text-muted text-white px-8 py-3 rounded-md no-underline font-semibold transition-colors hover:bg-brand-charcoal"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENTO GRID FEATURES ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-brand-charcoal mb-12">
          Engineered Resilience
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Large Card */}
          <div className="relative rounded-xl border border-brand-gray-mid overflow-hidden bg-brand-charcoal min-h-[400px] flex flex-col justify-end p-8 sm:p-12 shadow-sm">
            <div className="absolute inset-0 bg-[#4a2e1d] opacity-100"></div>
            {/* Soft dark corner radials to match the gradient look without using an image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-[#8A3B0D]/30 to-black/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-[20px] text-white font-medium mb-4 tracking-normal">
                Premium Aluminum Frames
              </h3>
              <p className="text-[14px] text-white/80 leading-relaxed max-w-[400px] font-light">
                40mm and 50mm hexagonal profiles with cast-iron reinforced
                connectors. Built to withstand 35mph wind gusts.
              </p>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 content-start h-full">
            {/* Top Left Square */}
            <div className="bg-[#F8FAFC] rounded-xl border border-brand-gray-mid p-8 lg:p-10 flex flex-col items-start min-h-[200px] shadow-sm flex-1">
              <Shield
                className="w-8 h-8 text-brand-orange mb-6 flex-shrink-0"
                strokeWidth={2}
              />
              <h3 className="text-[20px] font-bold text-brand-charcoal leading-snug mb-3">
                Waterproof & UV
                <br />
                Resistant
              </h3>
              <p className="text-[14px] text-brand-text-muted leading-relaxed font-medium">
                600D Polyester with internal PU coating for maximum protection.
              </p>
            </div>

            {/* Top Right Square */}
            <div className="bg-[#F8FAFC] rounded-xl border border-brand-gray-mid p-8 lg:p-10 flex flex-col items-start min-h-[200px] shadow-sm flex-1">
              <Palette
                className="w-8 h-8 text-brand-orange mb-6 flex-shrink-0"
                strokeWidth={2}
              />
              <h3 className="text-[20px] font-bold text-brand-charcoal leading-snug mb-3 mt-auto sm:mt-0">
                High-Quality Printing
              </h3>
              <p className="text-[14px] text-brand-text-muted leading-relaxed font-medium">
                Dye-sublimation process ensures vibrant, scratch-resistant
                graphics.
              </p>
            </div>

            {/* Bottom Rectangle (spans 2 columns) */}
            <div className="sm:col-span-2 bg-[#4A6484] rounded-xl p-8 sm:p-10 flex items-center justify-between relative overflow-hidden min-h-[140px] shadow-sm lg:mt-2">
              <div className="relative z-10 max-w-[400px]">
                <h3 className="text-[20px] font-bold text-white mb-2 tracking-wide">
                  Easy 60-Second Setup
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed font-light">
                  Our spring-loaded pins make assembly effortless for a single
                  person.
                </p>
              </div>
              <Timer
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-[120px] h-[120px] text-white/10 pointer-events-none"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCESSORIES ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-brand-charcoal mb-12">
          Complete Your <span className="text-brand-orange">Setup</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col sm:flex-row bg-white rounded-xl border border-brand-gray-mid overflow-hidden">
            <div className="basis-[200px] bg-[#F1F5F9] shrink-0 min-h-[200px]"></div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-brand-charcoal mb-4">
                Tent Flag Kit
              </h3>
              <p className="text-brand-text-muted leading-relaxed mb-6">
                12ft teardrop or feather flags that mount directly to the frame.
              </p>
              <Link
                href="/shop"
                className="text-brand-orange font-semibold no-underline hover:underline"
              >
                Shop Flags →
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row bg-white rounded-xl border border-brand-gray-mid overflow-hidden">
            <div className="basis-[200px] bg-[#F1F5F9] shrink-0 min-h-[200px]"></div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-brand-charcoal mb-4">
                Tent Hardware
              </h3>
              <p className="text-brand-text-muted leading-relaxed mb-6">
                Professional sandbag, weight plates, and carry bags with wheels.
              </p>
              <Link
                href="/shop"
                className="text-brand-orange font-semibold no-underline hover:underline"
              >
                Shop Hardware →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CANOPY TENTS IN CANADA SECTION ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 mb-16 relative">
        <div className="absolute inset-0 top-10 bg-brand-orange/5 blur-3xl -z-10 rounded-full w-full max-w-[800px] h-[400px] mx-auto hidden lg:block"></div>
        <div className="bg-white rounded-3xl border border-brand-gray-mid shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10">
          <div className="lg:w-3/5 p-10 sm:p-16 relative z-10 bg-white">
            <span className="inline-block bg-[#F1F5F9] text-brand-charcoal text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Built For Canada
            </span>
            <h2 className="text-4xl font-extrabold text-brand-charcoal mb-6 tracking-tight leading-tight">
              Why Buy Canopy Tents in Canada from{" "}
              <span className="text-brand-orange">customtentcanopy.ca</span>
            </h2>
            <p className="text-xl text-brand-text-muted leading-relaxed mb-6 font-medium">
              Canadian weather demands stronger materials, better construction,
              and reliable performance.
            </p>
            <p className="text-base text-brand-text-muted leading-relaxed mb-10">
              Our canopy tents are built to handle real conditions across
              Canada, with reinforced frames and weather-resistant fabrics
              designed for repeated use.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
              {[
                "Commercial-grade construction",
                "Designed for wind, rain, and UV exposure",
                "Fast deployment for operational efficiency",
                "Custom branding available",
                "Canada-wide shipping",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 text-brand-charcoal font-medium bg-brand-gray-light p-4 rounded-xl border border-brand-gray-mid/50 hover:bg-[#E2E8F0] transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 group-hover:bg-brand-orange/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <span className="text-brand-orange text-sm font-bold">
                      ➔
                    </span>
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-4 p-5 bg-[#F1F5F9] rounded-xl border border-brand-gray-mid/50">
              <span className="text-2xl mt-0.5">🍁</span>
              <p className="text-sm text-brand-text-muted leading-relaxed italic">
                For general outdoor safety considerations, refer to the{" "}
                <a
                  href="#"
                  className="font-semibold text-brand-orange hover:underline decoration-2 underline-offset-4"
                >
                  Government of Canada
                </a>{" "}
                and the{" "}
                <a
                  href="#"
                  className="font-semibold text-brand-orange hover:underline decoration-2 underline-offset-4"
                >
                  Canadian Centre for Occupational Health and Safety
                </a>
                .
              </p>
            </div>
          </div>
          <div className="lg:w-2/5 min-h-[400px] lg:min-h-auto relative bg-[#F8FAFC] lg:border-l border-brand-gray-mid overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8F0]/30 to-[#CBD5E1]/50 flex flex-col items-center justify-center p-12">
              {/* Decorative dot pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#8A3B0D_1.5px,_transparent_1.5px)] bg-[size:24px_24px]"></div>

              {/* Image Placeholder Card */}
              <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl w-full max-w-[320px] transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-white/50">
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-gray-mid to-[#CBD5E1] rounded-xl w-full flex flex-col items-center justify-center mb-4 overflow-hidden border border-brand-gray-mid relative">
                  <span className="text-4xl mb-3 z-10">🏔️</span>
                  <span className="text-brand-charcoal font-bold text-center px-4 z-10 text-sm">
                    Canadian Landscape
                    <br />
                    <span className="text-xs font-normal opacity-70">
                      (Placeholder Image)
                    </span>
                  </span>
                </div>
                <div className="h-3 bg-brand-gray-light rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-brand-gray-light rounded w-1/2"></div>
              </div>

              {/* Ambient glow effects */}
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-brand-charcoal/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-24 bg-white">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-brand-charcoal mb-20 tracking-tight">
          From <span className="text-brand-orange">Concept</span> to Canopy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pl-4">
          {[
            {
              num: "01",
              title: "Choose Tent",
              desc: "Select your size (10x10, 10x15, or 10x20) and frame grade based on your event needs.",
            },
            {
              num: "02",
              title: "Upload Design",
              desc: "Send us your logos and branding guidelines or use our online design templates.",
            },
            {
              num: "03",
              title: "Approve Mockup",
              desc: "Receive a detailed 3D digital mockup from our designers for your final sign-off.",
            },
            {
              num: "04",
              title: "Production",
              desc: "We print, sew, and ship your custom canopy directly to your doorstep or event.",
            },
          ].map((step) => (
            <div key={step.num} className="relative">
              <div className="text-[5rem] sm:text-[6rem] font-bold text-brand-gray-mid leading-none mb-2 -translate-x-4 opacity-60">
                {step.num}
              </div>
              <h3 className="text-xl font-medium text-brand-charcoal mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="text-[15px] text-brand-text-muted leading-relaxed relative z-10 max-w-[260px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#351101] py-24 px-6 text-center">
        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-[-0.02em] mb-12">
          Ready to <span className="text-brand-orange">customize</span> yours?
        </h2>
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            href="/quote"
            className="bg-[#E86C4A] text-white no-underline px-10 py-4 rounded font-semibold text-lg hover:bg-brand-orange transition-colors"
          >
            Get Started Now
          </Link>
          <Link
            href="/guide"
            className="border-2 border-white/20 text-white no-underline px-10 py-4 rounded font-semibold text-lg hover:border-white transition-colors"
          >
            Download Design Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
