'use client';

import { useState } from 'react';
import { cn } from '@/utils';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4 w-full">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="border border-brand-gray-mid rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center p-6 text-left hover:bg-brand-gray-light/50 transition-colors"
          >
            <span className="font-bold text-brand-charcoal text-lg">{item.question}</span>
            <span className={cn(
              "text-brand-orange text-2xl transition-transform duration-300",
              openIndex === index ? "rotate-45" : "rotate-0"
            )}>
              +
            </span>
          </button>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="p-6 pt-0 text-brand-text-muted leading-relaxed border-t border-brand-gray-mid/50 mx-6">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
