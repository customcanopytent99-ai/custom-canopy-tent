'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../actions/orders';
import Banner from '../components/Banner';
import { CheckCircle2, Loader2, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    const orderData = {
      customerName: `${form.firstName} ${form.lastName}`,
      customerEmail: form.email,
      customerPhone: form.phone,
      shippingAddress: {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode,
        phone: form.phone,
      },
      items: cart,
      totalAmount: totalPrice,
    };

    const result = await createOrder(orderData);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setOrderId(result.orderNumber || '');
      clearCart();
    } else {
      alert('Failed to place order: ' + result.error);
    }
  };

  if (success) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen font-sans">
        <Banner 
          badge="Order Confirmed"
          title="Thank You"
          accentTitle="For Your Order"
          subtitle="Your request has been received and our engineering team is reviewing your assets."
        />
        <section className="py-24 px-6">
          <div className="max-w-[600px] mx-auto bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-brand-gray-mid">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-brand-charcoal mb-4">Order #{orderId}</h2>
            <p className="text-brand-text-muted mb-10 leading-relaxed">
              We've sent a confirmation email to <strong>{form.email}</strong>. Our designers will reach out with a 3D proof within 24 hours.
            </p>
            <Link href="/" className="inline-block bg-brand-orange text-white px-10 py-4 rounded-full font-bold hover:bg-brand-orange-hover transition-all shadow-lg">
              Return Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Banner 
        badge="Secure Checkout"
        title="Complete Your"
        accentTitle="Purchase"
        subtitle="Review your selection and provide shipping details to finalize your custom order."
      />

      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-brand-gray-mid shadow-sm">
              <h3 className="text-2xl font-black text-brand-charcoal mb-8 flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-brand-orange" />
                Your Selection
              </h3>
              
              {cart.length === 0 ? (
                <div className="text-center py-20 bg-brand-gray-light/30 rounded-3xl border-2 border-dashed border-brand-gray-mid">
                  <div className="text-6xl mb-6">🛒</div>
                  <h4 className="text-xl font-bold text-brand-charcoal mb-2">Your cart is empty</h4>
                  <p className="text-brand-text-muted mb-8">Looks like you haven't added any products yet.</p>
                  <Link href="/shop" className="inline-block bg-brand-charcoal text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all shadow-lg">
                    Browse Shop
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="group flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-[2rem] border border-brand-gray-mid hover:border-brand-orange hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500">
                      <div className="w-28 h-28 bg-brand-gray-light rounded-2xl border border-brand-gray-mid/50 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img src={item.image} alt={item.name} className="max-w-[80%] max-h-[80%] object-contain" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                           <span className="inline-block self-center sm:self-start text-[10px] font-black text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-2 py-0.5 rounded-full">
                             Customized
                           </span>
                           <h4 className="font-bold text-brand-charcoal text-xl">{item.name}</h4>
                        </div>
                        <p className="text-sm text-brand-text-muted font-medium mb-4">{item.size} Professional Series</p>
                        
                        {/* Assets preview */}
                        {item.assets && item.assets.length > 0 && (
                          <div className="flex gap-3 items-center justify-center sm:justify-start">
                            <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider">Your Assets:</span>
                            <div className="flex -space-x-2">
                              {item.assets.slice(0, 4).map((asset, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                                  <img src={asset} className="w-full h-full object-cover" />
                                </div>
                              ))}
                              {item.assets.length > 4 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-gray-mid text-[10px] font-bold flex items-center justify-center text-brand-text-muted shadow-md">
                                  +{item.assets.length - 4}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center sm:text-right pt-6 sm:pt-0 border-t sm:border-t-0 sm:border-l border-brand-gray-mid sm:pl-8 w-full sm:w-auto">
                        <div className="text-3xl font-black text-brand-charcoal mb-1">${item.price}</div>
                        <div className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest bg-brand-gray-light px-3 py-1.5 rounded-lg inline-block">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-brand-gray-mid shadow-sm">
              <h3 className="text-2xl font-black text-brand-charcoal mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-brand-orange" />
                Shipping & Contact
              </h3>
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">First Name</label>
                    <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="firstName" type="text" placeholder="John" required value={form.firstName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Last Name</label>
                    <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="lastName" type="text" placeholder="Doe" required value={form.lastName} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Email Address</label>
                    <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="email" type="email" placeholder="john@example.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Phone Number</label>
                    <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="phone" type="tel" placeholder="+1 (555) 000-0000" required value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Shipping Address</label>
                  <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="address" type="text" placeholder="123 Event St, Suite 100" required value={form.address} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">City</label>
                    <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="city" type="text" placeholder="Vancouver" required value={form.city} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Province/State</label>
                    <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="province" type="text" placeholder="BC" required value={form.province} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest pl-1">Postal Code</label>
                    <input className="w-full px-5 py-4 border-2 border-brand-gray-light rounded-xl focus:outline-none focus:border-brand-orange bg-brand-gray-light/30 transition-all text-sm" name="postalCode" type="text" placeholder="V6B 1A1" required value={form.postalCode} onChange={handleChange} />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Checkout Action */}
          <div className="lg:col-span-1">
            <div className="bg-brand-charcoal rounded-[2.5rem] p-8 sm:p-10 text-white shadow-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-8 pb-4 border-b border-white/10">Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="text-green-400 font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="font-bold">Total</span>
                  <span className="text-3xl font-black text-brand-orange">${totalPrice}</span>
                </div>
              </div>
              
              <button 
                type="submit"
                form="checkout-form"
                disabled={loading || cart.length === 0}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Place Order'}
              </button>
              
              <p className="text-[10px] text-center mt-6 text-white/40 uppercase tracking-[0.2em] font-bold">
                🔒 Secure SSL Encryption
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
