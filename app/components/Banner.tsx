import React from 'react';

interface BannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  accentTitle?: string;
}

export default function Banner({ title, subtitle, badge, accentTitle }: BannerProps) {
  return (
    <section className="bg-brand-gray-mid py-20 px-6 pt-32 text-left relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#8A3B0D_1.5px,_transparent_1.5px)] bg-[size:32px_32px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]"></div>
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-charcoal/5 rounded-full blur-[80px]"></div>
      
      <div className="max-w-[1280px] mx-auto relative z-10">
        {badge && (
          <span className="inline-block bg-[#CBD5E1] text-brand-charcoal text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8 shadow-sm">
            {badge}
          </span>
        )}
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold text-brand-charcoal leading-[0.9] tracking-tight mb-8 max-w-[900px]">
          {title} {accentTitle && <span className="text-brand-orange">{accentTitle}</span>}
        </h1>
        {subtitle && (
          <p className="text-xl text-brand-text-muted leading-relaxed max-w-[550px] font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
