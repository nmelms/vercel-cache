"use client";

import { useState } from "react";
import { revalidateAllPosts, revalidateSinglePost } from "../actions";

export default function RevalidateButtons() {
  const [postId, setPostId] = useState("");
  const [allStatus, setAllStatus] = useState("");
  const [singleStatus, setSingleStatus] = useState("");

  async function handleRevalidateAll() {
    await revalidateAllPosts();
    setAllStatus("All posts revalidated!");
    setTimeout(() => setAllStatus(""), 3000);
  }

  async function handleRevalidateSingle() {
    if (!postId.trim()) return;
    await revalidateSinglePost(postId.trim());
    setSingleStatus(`Post ${postId} revalidated!`);
    setTimeout(() => setSingleStatus(""), 3000);
  }

  return (
    <div className="flex flex-col gap-4 mb-10 p-4 rounded-lg border border-zinc-200 bg-zinc-50">
      <h2 className="text-sm font-semibold text-zinc-700">Cache Controls</h2>

      <div className="flex items-center gap-3">
        <button
          onClick={handleRevalidateAll}
          className="px-4 py-2 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
        >
          Clear all posts
        </button>
        {allStatus && (
          <span className="text-xs text-green-600">{allStatus}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          max={100}
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          placeholder="Post ID (e.g. 1)"
          className="w-36 px-3 py-2 text-sm rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
        <button
          onClick={handleRevalidateSingle}
          disabled={!postId.trim()}
          className="px-4 py-2 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Clear post
        </button>
        {singleStatus && (
          <span className="text-xs text-green-600">{singleStatus}</span>
        )}
      </div>
    </div>
  );
}
