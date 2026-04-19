'use client';
import { useState } from 'react';
import Banner from '../components/Banner';
import { submitLead } from '../actions/leads';

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', tentSize: '', quantity: '', useCase: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await submitLead(form);
    
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Banner 
        badge="Direct Factory Pricing"
        title="Get Your"
        accentTitle="Custom Quote"
        subtitle="Engineered for resilience. Tailored for your brand. Submit your project brief below and our team will get back to you with a proof within 24 hours."
      />

      {/* Form Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Why choose us?</h2>
              <p className="text-brand-text-muted leading-relaxed">
                We provide the highest industrial-grade aluminum frames and high-fidelity dye-sublimation printing in the industry.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: '⚡', title: '24hr Turnaround', text: 'Receive your quote and design proof within one business day.' },
                { icon: '🎨', title: 'Free Design Proof', text: 'Our professional designers create your 3D mockup at no cost.' },
                { icon: '🚚', title: 'Global Shipping', text: 'Fast, reliable shipping directly to your doorstep or event site.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 bg-white border border-brand-gray-mid rounded-xl shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-brand-charcoal text-sm">{item.title}</h4>
                    <p className="text-xs text-brand-text-muted mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white border-2 border-brand-orange rounded-3xl p-16 text-center shadow-xl animate-fade-in">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-extrabold text-brand-charcoal mb-4">Request <span className="text-brand-orange">Received!</span></h2>
                <p className="text-brand-text-muted text-lg leading-relaxed max-w-[480px] mx-auto mb-8">
                  Thank you, <strong>{form.name}</strong>. Our engineering team is reviewing your project requirements right now.
                </p>
                <button onClick={() => setSubmitted(false)} className="bg-brand-orange text-white px-8 py-4 rounded-full hover:bg-brand-orange-hover font-semibold text-base transition-all shadow-lg hover:shadow-orange-200">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="bg-white border border-brand-gray-mid rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Full Name *</label>
                      <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl text-brand-text-dark bg-brand-gray-light/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm" name="name" type="text" placeholder="John Doe" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Email Address *</label>
                      <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl text-brand-text-dark bg-brand-gray-light/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm" name="email" type="email" placeholder="john@company.com" required value={form.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Phone Number</label>
                      <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl text-brand-text-dark bg-brand-gray-light/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Company</label>
                      <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl text-brand-text-dark bg-brand-gray-light/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm" name="company" type="text" placeholder="Acme Corp" value={form.company} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Tent Size *</label>
                      <select className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl text-brand-text-dark bg-brand-gray-light/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm appearance-none" name="tentSize" required value={form.tentSize} onChange={handleChange}>
                        <option value="">Select a size</option>
                        <option value="10x10">10×10 Canopy</option>
                        <option value="10x15">10×15 Canopy</option>
                        <option value="10x20">10×20 Canopy</option>
                        <option value="custom">Custom Dimensions</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Quantity *</label>
                      <select className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl text-brand-text-dark bg-brand-gray-light/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm appearance-none" name="quantity" required value={form.quantity} onChange={handleChange}>
                        <option value="">Select quantity</option>
                        <option value="1">1 Unit</option>
                        <option value="2-5">2–5 Units</option>
                        <option value="6-20">6–20 Units</option>
                        <option value="20+">Bulk Order (20+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Project Details</label>
                    <textarea
                      className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl text-brand-text-dark bg-brand-gray-light/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm resize-none"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your custom graphics, timeline, or any specific requirements..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full group flex items-center justify-center gap-3 p-5 bg-brand-charcoal hover:bg-black text-white rounded-xl font-bold text-lg transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Send Quote Request'}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <p className="text-center text-[10px] text-brand-text-muted uppercase tracking-widest font-bold">
                    🔒 Secure Request • 24hr Response Time
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
