import type { Metadata } from "next";
import Link from "next/link";
import { PostsSection } from "@/components/PostsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts — Barisuka Turakpe",
  description: "Writing on fintech, product, and building in Africa.",
};

export default async function PostsPage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  return (
    <div className="wrap">
      <div className="post-header">
        <Link href="/" className="back-link">
          ← Home
        </Link>
        <h1>Posts</h1>
        <p className="post-meta">Writing on fintech, product, and building.</p>
      </div>

      {posts.length > 0 ? (
        <PostsSection posts={posts} showAllLink={false} />
      ) : (
        <p>No posts yet. Check back soon.</p>
      )}

      <SiteFooter />
    </div>
  );
}
