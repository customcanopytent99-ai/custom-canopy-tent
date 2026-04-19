import { client } from "@/utils/sanityClient";
import ProductPageTemplate from "@/app/components/ProductPageTemplate";
import { urlFor } from "@/utils/sanityClient";

export const revalidate = 60;

export default async function TenByTenPage() {
  const products = await client.fetch(`
    *[_type == "product" && category->slug.current == "10x10-tents"] {
      title,
      price,
      features,
      images,
      specifications
    }
  `);

  const variants = products.map((p: any) => ({
    name: p.title,
    price: `$${p.price}`,
    features: p.features || [],
    image: p.images?.[0] ? urlFor(p.images[0]).url() : undefined
  }));

  const mainProduct = products.find((p: any) => p.title.toLowerCase().includes('event tent')) || products[0];

  return (
    <ProductPageTemplate
      size="10x10"
      sqft="100 sq ft"
      startPrice={`$${mainProduct?.price || 299}`}
      tagline="Our most popular custom canopy, engineered for impact and built to last."
      description="The 10x10 Event Tent is the next level in outdoor advertising. Achieve 360 degrees of branding with a custom full fabric dye sub canopy and hardware package. Canopy is printed and sewn weather resistant tent polyester."
      variants={variants}
      specs={mainProduct?.specifications || [
        { label: "Footprint", value: "10' x 10'" },
        { label: "Material", value: "6 oz. Tent Fabric (600x600 denier)" },
        { label: "Frame", value: "40mm Aluminum Hex Hardware" }
      ]}
    />
  );
}
