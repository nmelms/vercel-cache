"use server";

import { revalidateTag } from "next/cache";

export async function revalidateAllPosts() {
  revalidateTag("posts");
}

export async function revalidateSinglePost(id: string) {
  revalidateTag(`post-${id}`);
}
