import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const revalidate = 60;

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();
  return posts.map((post) => ({ id: String(post.id) }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors mb-8 inline-block"
      >
        &larr; Back to posts
      </Link>
      <span className="text-xs text-zinc-400 font-mono">#{post.id}</span>
      <h1 className="text-3xl font-bold capitalize mt-1 mb-6">{post.title}</h1>
      <p className="text-zinc-600 leading-relaxed">{post.body}</p>
      <p className="mt-8 text-xs text-zinc-400">
        ISR — revalidates every 60 seconds
      </p>
    </main>
  );
}
