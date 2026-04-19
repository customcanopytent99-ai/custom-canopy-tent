'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import Banner from '../components/Banner';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Banner 
        badge="Your Selection"
        title="Shopping"
        accentTitle="Cart"
        subtitle="Review your premium event equipment before proceeding to checkout."
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.length === 0 ? (
              <div className="bg-white border border-brand-gray-mid rounded-[2.5rem] p-20 text-center shadow-sm">
                <div className="text-6xl mb-6">🛒</div>
                <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Your cart is empty</h2>
                <p className="text-brand-text-muted mb-8">Looks like you haven't added any premium tents to your cart yet.</p>
                <Link href="/shop" className="bg-brand-orange text-white px-10 py-4 rounded-full font-bold hover:bg-brand-orange-hover transition-all inline-block">
                  Go back to Shop
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white border border-brand-gray-mid rounded-[2rem] p-8 flex flex-col sm:flex-row gap-8 items-center shadow-sm hover:shadow-md transition-all group">
                    <div className="relative w-32 h-32 bg-brand-gray-light rounded-2xl overflow-hidden flex-shrink-0 border border-brand-gray-mid/50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-brand-charcoal mb-1">{item.name}</h3>
                      <p className="text-brand-text-muted text-sm font-medium mb-4">Size: {item.size || 'Standard'}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-700 transition-colors"
                      >
                        Remove Item
                      </button>
                    </div>

                    <div className="flex items-center gap-6 bg-brand-gray-light px-6 py-3 rounded-2xl border border-brand-gray-mid/50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-brand-charcoal font-black text-xl hover:text-brand-orange transition-colors"
                      >
                        −
                      </button>
                      <span className="font-bold text-brand-charcoal min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-brand-charcoal font-black text-xl hover:text-brand-orange transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-xl font-black text-brand-charcoal sm:min-w-[100px] text-right">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-charcoal text-white rounded-[2.5rem] p-10 sticky top-32 shadow-2xl border-t-8 border-brand-orange">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60 font-medium">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60 font-medium">
                  <span>Shipping</span>
                  <span className="text-brand-orange font-bold uppercase text-xs tracking-widest mt-1">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-black text-brand-orange">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button 
                disabled={cart.length === 0}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                Checkout Now
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <span>🔒 Secure Payment</span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span>Ships in 7-10 Days</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
