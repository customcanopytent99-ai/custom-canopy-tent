import { client } from "@/utils/sanityClient";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/utils/sanityClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      "authorName": author->name,
      body
    }`,
    { slug }
  );

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-black">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blog
        </Link>
        <p className="text-base font-semibold leading-7 text-cyan-600">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
          })}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-black">{post.title}</h1>
        <p className="mt-6 text-xl leading-8">
          By {post.authorName || "Unknown Author"}
        </p>
        
        {post.mainImage && (
          <figure className="mt-16">
            <Image
              className="aspect-video rounded-xl bg-gray-50 object-cover shadow-lg"
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              width={1200}
              height={800}
              priority
            />
          </figure>
        )}
        
        <div className="mt-16 max-w-2xl mx-auto prose prose-cyan prose-lg text-black prose-headings:font-bold prose-headings:text-black">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
