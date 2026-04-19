import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "ee0kq0ez",
  dataset: "production",
  apiVersion: "2024-04-17",
  useCdn: false, // Set to false if you want to ensure fresh data always
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
