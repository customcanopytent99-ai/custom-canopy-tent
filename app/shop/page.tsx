import { client } from "@/utils/sanityClient";
import { urlFor } from "@/utils/sanityClient";
import Link from 'next/link';
import Image from 'next/image';
import Banner from '../components/Banner';

export const revalidate = 60;

export default async function ShopAllPage() {
  const categories = await client.fetch(`
    *[_type == "category"] {
      title,
      "slug": slug.current,
      "products": *[_type == "product" && references(^._id)] {
        title,
        "slug": slug.current,
        price,
        priceText,
        tag,
        images,
        features
      }
    }
  `);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Banner 
        badge="Full Catalog"
        title="Premium Equipment"
        accentTitle="Shop"
        subtitle="Professional-grade custom event tents and accessories engineered for resilience."
      />

      {categories.map((category: any, sectionIndex: number) => (
        <section 
          key={category.slug} 
          id={category.slug}
          className="max-w-[1280px] mx-auto px-6 py-24 border-b border-brand-gray-mid last:border-0"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-brand-charcoal tracking-tight mb-4">
                {category.title}
              </h2>
              <div className="h-1.5 w-24 bg-brand-orange rounded-full"></div>
            </div>
            <p className="text-brand-text-muted font-medium text-sm">Showing {category.products?.length || 0} relative products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {category.products?.map((prod: any) => (
              <Link 
                key={prod.slug} 
                href={`/product/${prod.slug}`}
                className="group bg-white rounded-[2.5rem] overflow-hidden flex flex-col relative border border-brand-gray-mid hover:border-brand-orange hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                {prod.tag && (
                  <div className="absolute top-6 left-6 bg-brand-orange text-white text-[10px] font-black px-4 py-2 z-10 rounded-full shadow-lg uppercase tracking-wider">
                    {prod.tag}
                  </div>
                )}
                
                <div className="bg-brand-gray-light aspect-[4/5] relative overflow-hidden">
                  {prod.images?.[0] ? (
                    <Image 
                      src={urlFor(prod.images[0]).url()} 
                      alt={prod.title} 
                      fill
                      className="object-contain p-12 transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-text-muted">No Image</div>
                  )}
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-brand-charcoal mb-4 group-hover:text-brand-orange transition-colors">
                    {prod.title}
                  </h3>
                  
                  <ul className="space-y-3 mb-10 flex-1">
                    {prod.features?.slice(0, 3).map((f: string) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-brand-text-muted font-medium leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0"></span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-8 border-t border-brand-gray-mid">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em] mb-1">{prod.priceText || 'Starting at'}</span>
                      <span className="text-2xl font-black text-brand-charcoal">${prod.price?.toLocaleString()}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-brand-charcoal flex items-center justify-center text-white font-bold group-hover:bg-brand-orange transition-all duration-300 transform group-hover:rotate-45">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
