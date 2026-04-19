'use client';

import { useCart } from '../context/CartContext';
import { urlFor } from '@/utils/sanityClient';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: product._id,
      name: product.title,
      price: product.price || 0,
      image: product.images?.[0] ? urlFor(product.images[0]).url() : '',
      quantity: 1,
      size: product.specifications?.find((s: any) => s.label.toLowerCase().includes('size'))?.value || 'Standard'
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-orange-500/20 active:scale-95 flex-1 ${
        added 
          ? 'bg-green-500 text-white' 
          : 'bg-brand-orange text-white hover:bg-brand-orange-hover'
      }`}
    >
      {added ? '✓ Added to Cart' : 'Add to Cart — $' + (product.price?.toLocaleString() || '0')}
    </button>
  );
}
