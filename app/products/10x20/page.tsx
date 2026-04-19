import { client } from "@/utils/sanityClient";
import ProductPageTemplate from "@/app/components/ProductPageTemplate";
import { urlFor } from "@/utils/sanityClient";

export const revalidate = 60;

export default async function TenByTwentyPage() {
  const products = await client.fetch(`
    *[_type == "product" && category->slug.current == "10x20-tents"] {
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
      size="10x20"
      sqft="200 sq ft"
      startPrice={`$${mainProduct?.price || 699}`}
      tagline="Maximum branding surface and coverage for premier outdoor activations."
      description="The 10x20 Event Tent is our flagship large-format canopy. With a massive 200 square feet of covered space, it's perfect for large product displays, VIP hospitality areas, and major brand presence at festivals."
      variants={variants}
      specs={mainProduct?.specifications || [
        { label: "Footprint", value: "10' x 20'" },
        { label: "Material", value: "6 oz. Tent Fabric (600x600 denier)" },
        { label: "Frame", value: "40mm Aluminum Hex Hardware" }
      ]}
    />
  );
}
