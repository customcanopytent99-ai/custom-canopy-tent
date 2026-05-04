/** @format */

"use server";

import { writeClient } from "@/sanity/lib/client";

export async function clearRemoteCart(email: string) {
  try {
    const existingCart = await writeClient.fetch(
      `*[_type == "cart" && email == $email][0]`,
      { email },
    );

    if (existingCart) {
      await writeClient.delete(existingCart._id);
    }
    return { success: true };
  } catch (error) {
    console.error("Error clearing remote cart:", error);
    return { success: false, error: "Failed to clear remote cart" };
  }
}
