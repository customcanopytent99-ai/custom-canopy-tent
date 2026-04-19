import { client } from "@/utils/sanityClient";
import { urlFor } from "@/utils/sanityClient";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/app/components/Banner";
import ProductGallery from "@/app/components/ProductGallery";
import FAQ from "../../components/FAQ";
import AddToCartButton from "../../components/AddToCartButton";
import { cn } from "../../../utils";

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const product = await client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      ...,
      category-> { title, slug }
    }
  `, { slug });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-gray-light">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-brand-orange hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <Banner 
        badge={product.category?.title || "Professional Equipment"}
        title={product.title}
        subtitle={product.shortDescription}
      />

      <section className="py-24 px-6 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Gallery */}
        <ProductGallery images={product.images} />

        {/* Right: Info */}
        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-black text-brand-charcoal">${product.price?.toLocaleString()}</span>
              {product.priceText && <span className="text-brand-text-muted font-bold uppercase tracking-widest text-xs mt-1">{product.priceText}</span>}
              {product.tag && <span className="bg-brand-orange text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter ml-2 shadow-sm">{product.tag}</span>}
            </div>
            
            <div className="prose prose-brand max-w-none text-brand-text-muted leading-relaxed">
              {/* Note: In a real app, use PortableText for product.description */}
              <p>Description and technical details for the {product.title}. Engineered for the most demanding outdoor environments.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-[0.2em]">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.features?.map((f: string) => (
                <li key={f} className="flex items-center gap-3 text-brand-text-muted text-sm font-medium">
                  <span className="w-6 h-6 rounded-full bg-brand-gray-light flex items-center justify-center text-brand-orange shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <AddToCartButton product={product} />
            <Link 
              href="/quote" 
              className="px-10 py-5 rounded-2xl border-2 border-brand-charcoal text-brand-charcoal font-bold text-lg hover:bg-brand-charcoal hover:text-white transition-all text-center flex-1"
            >
              Get a Custom Proof
            </Link>
          </div>
        </div>
      </section>

      {/* Details & FAQ */}
      <section className="py-32 bg-brand-gray-light/30 border-t border-brand-gray-mid/50">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Specs */}
          <div>
            <h2 className="text-3xl font-bold text-brand-charcoal mb-12 tracking-tight">Full <span className="text-brand-orange">Specifications</span></h2>
            <div className="space-y-0 border border-brand-gray-mid rounded-3xl overflow-hidden shadow-sm bg-white">
              {product.specifications?.map((spec: any, i: number) => (
                <div key={i} className={cn(
                  "flex justify-between p-6 items-center",
                  i < product.specifications.length - 1 && "border-b border-brand-gray-mid/50"
                )}>
                  <span className="text-xs font-bold text-brand-text-muted uppercase tracking-widest">{spec.label}</span>
                  <span className="font-bold text-brand-charcoal">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-3xl font-bold text-brand-charcoal mb-12 tracking-tight">Common <span className="text-brand-orange">Questions</span></h2>
            <FAQ items={product.faqs} />
          </div>

        </div>
      </section>
    </div>
  );
}
