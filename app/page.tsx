import Link from "next/link";
import RevalidateButtons from "./components/RevalidateButtons";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const revalidate = 60;

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { tags: ["posts"] },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Posts</h1>
      <p className="text-sm text-zinc-500 mb-8">
        ISR — revalidates every 60 seconds
      </p>
      <RevalidateButtons />
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="block p-4 rounded-lg border border-zinc-200 hover:border-zinc-400 transition-colors"
            >
              <span className="text-xs text-zinc-400 font-mono">
                #{post.id}
              </span>
              <h2 className="font-semibold capitalize mt-1">{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
