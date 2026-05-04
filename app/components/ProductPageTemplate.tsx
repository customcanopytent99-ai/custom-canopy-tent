'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../../utils';
import Banner from './Banner';
import { Check, X, Info, FileText, Settings, Clock, Building2, ShoppingCart, Sliders, Upload, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTION_FACILITIES, PRODUCT_FAQ } from '../../utils/constants';

interface ProductVariant {
  name: string;
  price: string;
  features: string[];
  image?: string;
}

interface ProductPageProps {
  size: string;         // e.g. "10x10"
  sqft: string;         // e.g. "100 sq ft"
  startPrice: string;    // e.g. "$299"
  tagline: string;
  description: string;
  variants: ProductVariant[];
  specs: { label: string; value: string }[];
}

export default function ProductPageTemplate({
  size, sqft, startPrice, tagline, description, variants, specs,
}: ProductPageProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { addToCart } = useCart();

  // Determine the main hero image based on size
  const heroImage = 
    size === '10x10' ? '/images/products/10ft-event-tent.png' :
    size === '10x15' ? '/images/products/15ft-event-tent.png' :
    '/images/products/20ft-event-tent.png';

  const tabs = [
    { id: 'description', label: 'Description', icon: <FileText className="w-4 h-4" /> },
    { id: 'spec', label: 'Spec', icon: <Settings className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ', icon: <Info className="w-4 h-4" /> },
  ];

  const handleAddToCartClick = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setIsModalOpen(true);
    setUploadedImages([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const confirmAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: `${selectedVariant.name}-${size}`.replace(/\s+/g, '-').toLowerCase(),
        name: `${selectedVariant.name} (${size})`,
        price: parseFloat(selectedVariant.price.replace('$', '').replace(',', '')),
        image: selectedVariant.image || heroImage,
        quantity: 1,
        size: size,
        assets: uploadedImages
      });
      setIsModalOpen(false);
    }
  };

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

      {/* Info Tabs Section */}
      <section className="py-16 bg-white border-y border-brand-gray-mid/50">
        <div className="max-w-[1000px] mx-auto px-6">
          {/* Turnaround & Facilities Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-brand-gray-mid/30">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-brand-orange" />
                <h3 className="font-bold text-brand-charcoal">Next Day Turnaround and Cut-off Time:</h3>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                Order and submit artwork before 4pm PST ships next business day. Order after 4pm add 1 business day. Orders over 100 qty require 2 extra business days.
              </p>
              <div className="mt-4">
                <h4 className="text-sm font-bold text-brand-charcoal mb-1">Same Day Turnaround:</h4>
                <p className="text-sm text-brand-text-muted">Not available for this product.</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-brand-orange" />
                <h3 className="font-bold text-brand-charcoal">Available Production Facility</h3>
              </div>
              <p className="text-xs text-brand-text-muted mb-4">Your orders are dispatched from the closest facility to your ship-to address for speed and savings.</p>
              <div className="flex flex-wrap gap-3">
                {PRODUCTION_FACILITIES.map(facility => (
                  <div key={facility.name} className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all",
                    facility.available ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200 opacity-60"
                  )}>
                    {facility.available ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {facility.name}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-brand-text-muted mt-4">Store pickup is available at our California and Texas locations.</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-brand-gray-mid">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-8 py-4 text-sm font-bold transition-all relative flex items-center gap-2",
                  activeTab === tab.id 
                    ? "text-brand-orange border-b-2 border-brand-orange bg-brand-orange/5" 
                    : "text-brand-text-muted hover:text-brand-charcoal hover:bg-brand-gray-light"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tabs Content */}
          <div className="py-12 min-h-[400px]">
            {activeTab === 'description' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold text-brand-charcoal mb-6">Description</h3>
                <p className="text-brand-text-muted mb-8 leading-relaxed">Tent walls complete your event tent display.</p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-brand-charcoal mb-3">Half wall tent graphics</h4>
                    <p className="text-sm text-brand-text-muted leading-relaxed">
                      Half wall tent graphics are versatile additions to a {size} event tent setup. They add square footage to your branding footprint, drive traffic through your preferred entry point and allow for a modular tent setups. Pick 1,2,3,4 half walls or pair them with the full walls for a complete tent package. The dye-sub graphics are printed on weather-resistant tent polyester.
                    </p>
                    <p className="text-sm text-brand-text-muted mt-3 italic">
                      Half Walls are supported with half wall hardware. Hardware comes with one telescopic pole and 2 hex clamps made specifically to attach to our premium aluminum tent hardware.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal mb-3">Full wall tent graphics</h4>
                    <p className="text-sm text-brand-text-muted leading-relaxed">
                      Full wall tent graphics add the perfect backdrop for your {size} event tent. Full wall graphics use velcro loops to attach to the hardware just under the canopy and extend to within 4 inches of the floor. The full color dye-sub graphic offers another dimension of event tent branding as well as a possible wind break for outdoor setups.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'spec' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold text-brand-charcoal mb-6">Spec</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-bold text-sm text-brand-text-muted uppercase tracking-widest mb-4">Print:</h4>
                    <ul className="space-y-2">
                      {['Dye-Sublimation Graphic', 'Scratch Resistant', 'Weather Resistant (water proof coated fabric)', 'Sewn-in velcro loops attach the wall to the upper frame and legs'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-brand-charcoal">
                          <div className="w-1 h-1 rounded-full bg-brand-orange" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-text-muted uppercase tracking-widest mb-4">Material:</h4>
                    <p className="text-sm text-brand-charcoal flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-brand-orange" />
                      6 oz. Tent Fabric (600x600 denier)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-text-muted uppercase tracking-widest mb-4">Dimensions:</h4>
                    <ul className="space-y-2 text-sm text-brand-charcoal">
                      <li className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-brand-orange" />
                        Full Wall: 113"w x 78"h
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-brand-orange" />
                        Half Wall: 113"w x 39"h
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-text-muted uppercase tracking-widest mb-4">Hardware:</h4>
                    <ul className="space-y-2 text-sm text-brand-charcoal">
                      <li className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-brand-orange mt-2" />
                        Half Wall Hardware: Half Wall aluminum support pole and 2 hex clamps
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-brand-orange mt-2" />
                        Full Wall Hardware: No hardware necessary
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold text-brand-charcoal mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {PRODUCT_FAQ.map(faq => (
                    <div key={faq.q} className="border border-brand-gray-mid rounded-2xl p-6 hover:shadow-md transition-all">
                      <h4 className="font-bold text-brand-charcoal mb-2">{faq.q}</h4>
                      <p className="text-sm text-brand-text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Variants (Using Shop Page Card Design) */}
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
              <div 
                key={v.name} 
                className="group bg-white rounded-[2.5rem] overflow-hidden flex flex-col relative border border-brand-gray-mid hover:border-brand-orange hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                {i === 1 && (
                  <div className="absolute top-6 left-6 bg-brand-orange text-white text-[10px] font-black px-4 py-2 z-10 rounded-full shadow-lg uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                
                <div className="bg-brand-gray-light aspect-[4/5] relative overflow-hidden">
                  <Image 
                    src={v.image || heroImage} 
                    alt={v.name} 
                    fill
                    className="object-contain p-12 transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-brand-charcoal mb-4 group-hover:text-brand-orange transition-colors">
                    {v.name}
                  </h3>
                  
                  <ul className="space-y-3 mb-10 flex-1">
                    {v.features.slice(0, 4).map((f: string) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-brand-text-muted font-medium leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0"></span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-4 pt-8 border-t border-brand-gray-mid">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em] mb-1">Starting at</span>
                        <span className="text-2xl font-black text-brand-charcoal">{v.price}</span>
                      </div>
                      <div className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full uppercase tracking-widest">
                        In Stock
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleAddToCartClick(v)}
                        className="flex items-center justify-center gap-2 bg-brand-orange text-white py-4 rounded-2xl font-bold text-sm hover:bg-brand-orange-hover transition-all shadow-lg hover:shadow-orange-200"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <Link 
                        href={`/quote?product=${encodeURIComponent(v.name)}&size=${size}`}
                        className="flex items-center justify-center gap-2 bg-brand-charcoal text-white py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg"
                      >
                        <Sliders className="w-4 h-4" />
                        Configure
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-fadeInUp">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-brand-charcoal">
                  Upload Your <span className="text-brand-orange">Assets</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-brand-gray-light rounded-full transition-colors">
                  <X className="w-6 h-6 text-brand-text-muted" />
                </button>
              </div>
              
              <p className="text-brand-text-muted mb-8 leading-relaxed">
                Add your logos, brand guidelines, or any reference images for <strong>{selectedVariant?.name}</strong>. Our designers will use these to create your free 3D proof.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="aspect-square relative rounded-2xl overflow-hidden border border-brand-gray-mid">
                      <img src={img} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-brand-gray-mid rounded-2xl cursor-pointer hover:border-brand-orange hover:bg-brand-orange/5 transition-all group">
                    <Plus className="w-8 h-8 text-brand-text-muted group-hover:text-brand-orange mb-2" />
                    <span className="text-[10px] font-bold text-brand-text-muted group-hover:text-brand-orange uppercase tracking-widest">Add More</span>
                    <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*" />
                  </label>
                </div>

                <div className="bg-brand-gray-light/50 p-6 rounded-2xl border border-brand-gray-mid/50">
                  <div className="flex items-start gap-4">
                    <Info className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-brand-charcoal mb-1">Design Guidelines</h4>
                      <p className="text-xs text-brand-text-muted leading-relaxed">
                        For best results, upload vector files (AI, EPS, SVG) or high-resolution PNGs/JPEGs (300dpi).
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={confirmAddToCart}
                  disabled={uploadedImages.length === 0}
                  className="w-full bg-brand-orange text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-orange-hover transition-all shadow-xl hover:shadow-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                >
                  Add to Cart with Assets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



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
