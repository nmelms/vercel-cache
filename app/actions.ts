"use server";

import { revalidateTag } from "next/cache";

export async function revalidateAllPosts() {
  revalidateTag("posts", "max");
}

export async function revalidateSinglePost(id: string) {
  revalidateTag(`post-${id}`, "max");
}
