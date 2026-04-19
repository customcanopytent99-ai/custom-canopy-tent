'use client';
import Link from 'next/link';
import { cn } from '../../utils';
import Banner from './Banner';

interface ProductPageProps {
  size: string;         // e.g. "10x10"
  sqft: string;         // e.g. "100 sq ft"
  startPrice: string;    // e.g. "$299"
  tagline: string;
  description: string;
  variants: {
    name: string;
    price: string;
    features: string[];
    image?: string;
  }[];
  specs: { label: string; value: string }[];
}

export default function ProductPageTemplate({
  size, sqft, startPrice, tagline, description, variants, specs,
}: ProductPageProps) {
  // Determine the main hero image based on size
  const heroImage = 
    size === '10x10' ? '/images/products/10ft-event-tent.png' :
    size === '10x15' ? '/images/products/15ft-event-tent.png' :
    '/images/products/20ft-event-tent.png';

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Banner 
        badge={`${size} Professional Series`}
        title={`${size}`}
        accentTitle="Canopy"
        subtitle={tagline}
      />

      {/* Product visual & Intro */}
      <section className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-charcoal mb-6 leading-tight">
              Engineered Resilience.<br />
              <span className="text-brand-orange leading-loose">Tailored For Your Brand.</span>
            </h2>
            <p className="text-lg text-brand-text-muted leading-relaxed mb-10">
              {description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/quote" className="bg-brand-orange text-white px-10 py-4 rounded-full no-underline font-bold text-lg hover:bg-brand-orange-hover transition-all shadow-xl hover:shadow-orange-200">
                Get a Custom Quote
              </Link>
              <div className="text-brand-charcoal font-bold text-xl ml-2">
                Starting from <span className="text-brand-orange">{startPrice}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-8 bg-brand-gray-light rounded-[3rem] border border-brand-gray-mid/50 aspect-square lg:aspect-auto lg:h-[500px]">
            <img 
              src={heroImage} 
              alt={`${size} Canopy`} 
              className="max-w-full max-h-full object-contain drop-shadow-2xl animate-float" 
            />
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-brand-orange text-xs font-bold tracking-[0.3em] uppercase mb-4">Configurations</span>
            <h2 className="text-4xl font-bold text-brand-charcoal tracking-tight">
              Select Your <span className="text-brand-orange">Setup</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {variants.map((v, i) => (
              <div key={v.name} className={cn(
                "group bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full",
                i === 1 ? "border-brand-orange shadow-lg" : "border-brand-gray-mid"
              )}>
                <div className="bg-brand-gray-light p-10 h-[280px] flex items-center justify-center overflow-hidden relative">
                   {i === 1 && (
                    <div className="absolute top-6 left-6 bg-brand-orange text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full z-10 shadow-lg">
                      Recommended
                    </div>
                  )}
                  <img 
                    src={v.image || (i === 1 ? '/images/products/10ft-tent-full-wall.png' : i === 2 ? '/images/products/10ft-tent-half-wall.png' : '/images/products/10ft-event-tent.png')} 
                    alt={v.name} 
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-brand-charcoal max-w-[180px]">{v.name}</h3>
                    <div className="text-2xl font-black text-brand-orange">{v.price}</div>
                  </div>
                  
                  <ul className="space-y-4 mb-10 flex-1">
                    {v.features.map(f => (
                      <li key={f} className="flex items-start gap-4 text-sm text-brand-text-muted font-medium">
                        <span className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/quote" className={cn(
                    "block text-center no-underline p-5 rounded-2xl font-bold transition-all transform active:scale-95",
                    i === 1 
                      ? "bg-brand-orange text-white hover:bg-brand-orange-hover shadow-lg hover:shadow-orange-200" 
                      : "bg-brand-charcoal text-white hover:bg-black shadow-lg"
                  )}>
                    Configure Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-brand-text-muted text-xs font-bold tracking-[0.3em] uppercase mb-4">Deep Dive</span>
            <h2 className="text-4xl font-bold text-brand-charcoal tracking-tight">
              Full <span className="text-brand-orange">Specifications</span>
            </h2>
          </div>
          <div className="border border-brand-gray-mid rounded-3xl overflow-hidden shadow-sm">
            {specs.map((spec, i) => (
              <div key={spec.label} className={cn(
                "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 p-6 sm:px-10 items-center",
                i % 2 === 0 ? "bg-brand-gray-light/40" : "bg-white",
                i < specs.length - 1 ? "border-b border-brand-gray-mid" : "border-none"
              )}>
                <div className="text-sm font-bold text-brand-text-muted uppercase tracking-wider sm:col-span-1">{spec.label}</div>
                <div className="text-base text-brand-charcoal font-semibold sm:col-span-2">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e140d] py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 max-w-[700px] mx-auto">
          <h2 className="text-[2.5rem] sm:text-[3.5rem] font-bold text-white tracking-tight leading-[1.1] mb-8">
            Elevate Your Brand <br />
            <span className="text-brand-orange italic">Presence</span> Today.
          </h2>
          <p className="text-white/60 mb-12 leading-relaxed text-lg max-w-[500px] mx-auto">
            Get a free custom design proof from our team within 24 hours. No commitment required.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/quote" className="bg-brand-orange text-white no-underline px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-orange-hover transition-all shadow-xl hover:shadow-orange-300 transform hover:scale-105">
              Start Your Quote
            </Link>
            <Link href="/shop" className="border-2 border-white/20 text-white no-underline px-12 py-5 rounded-full font-bold text-lg hover:border-white transition-all transform hover:scale-105">
              View All Sizes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
