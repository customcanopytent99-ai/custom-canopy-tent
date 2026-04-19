import { client } from "@/utils/sanityClient";
import ProductPageTemplate from "@/app/components/ProductPageTemplate";
import { urlFor } from "@/utils/sanityClient";

export const revalidate = 60;

export default async function TenByFifteenPage() {
  const products = await client.fetch(`
    *[_type == "product" && category->slug.current == "10x15-tents"] {
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
      size="10x15"
      sqft="150 sq ft"
      startPrice={`$${mainProduct?.price || 549}`}
      tagline="Expanded coverage for high-traffic events and larger booth spaces."
      description="The 10x15 Event Tent offers significantly more space for your branding and customer interaction. Engineered with the same high-strength aluminum frame technology as our 10x10 model, but in a size that commands attention."
      variants={variants}
      specs={mainProduct?.specifications || [
        { label: "Footprint", value: "10' x 15'" },
        { label: "Material", value: "6 oz. Tent Fabric (600x600 denier)" },
        { label: "Frame", value: "40mm Aluminum Hex Hardware" }
      ]}
    />
  );
}
