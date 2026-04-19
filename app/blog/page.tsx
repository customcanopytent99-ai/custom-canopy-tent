import { client } from "@/utils/sanityClient";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/utils/sanityClient";
import Banner from "../components/Banner";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogListingPage() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      author,
      description
    }
  `);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Banner 
        badge="Insights & Advice"
        title="Our"
        accentTitle="Blog"
        subtitle="Expert tips on event marketing, canopy maintenance, and branding strategies to help your business stand out."
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post: any) => (
            <article key={post._id} className="flex flex-col items-start bg-white rounded-3xl overflow-hidden border border-brand-gray-mid shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="relative w-full overflow-hidden aspect-[16/10]">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-gray-light flex items-center justify-center text-brand-text-muted font-bold">
                    No image
                  </div>
                )}
              </div>
              
              <div className="p-8 flex flex-col flex-1 w-full">
                <div className="flex items-center gap-x-4 text-xs font-bold uppercase tracking-widest text-brand-text-muted mb-4">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-brand-orange">Post</span>
                </div>

                <h3 className="text-xl font-bold text-brand-charcoal leading-snug mb-4 group-hover:text-brand-orange transition-colors">
                  <Link href={`/blog/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-sm leading-relaxed text-brand-text-muted line-clamp-3 mb-8">
                  {post.description || `Read more about ${post.title.toLowerCase()} and discover expert secrets for your next event.`}
                </p>

                <div className="mt-auto pt-6 border-t border-brand-gray-light flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-bold text-brand-charcoal">
                      {post.author || "Team Member"}
                    </p>
                  </div>
                  <Link href={`/blog/${post.slug.current}`} className="text-brand-orange text-sm font-bold hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <div className="col-span-1 lg:col-span-3 text-center p-20 bg-white rounded-3xl border border-dashed border-brand-gray-mid">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-2">No Stories Yet</h3>
              <p className="text-brand-text-muted">Start creating content in your Sanity Studio to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
