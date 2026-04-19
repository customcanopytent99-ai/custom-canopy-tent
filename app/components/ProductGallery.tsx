'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/utils/sanityClient';
import { cn } from '@/utils';

export default function ProductGallery({ images }: { images: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return (
    <div className="aspect-square bg-brand-gray-light rounded-[3rem] flex items-center justify-center text-brand-text-muted font-bold">
      No Images Available
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="aspect-square bg-brand-gray-light rounded-[3rem] overflow-hidden border border-brand-gray-mid shadow-inner relative group">
        <Image
          src={urlFor(images[activeIndex]).url()}
          alt="Product Detail"
          fill
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white",
              activeIndex === index ? "border-brand-orange shadow-md scale-105" : "border-brand-gray-mid hover:border-gray-300"
            )}
          >
            <Image
              src={urlFor(img).url()}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
