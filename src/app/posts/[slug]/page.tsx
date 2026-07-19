import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} — Barisuka Turakpe`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="wrap">
      <article>
        <div className="post-header">
          <Link href="/posts" className="back-link">
            ← All posts
          </Link>
          <h1>{post.title}</h1>
          {post.published_at && (
            <p className="post-meta">{formatDate(post.published_at)}</p>
          )}
        </div>

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="post-cover"
          />
        )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <SiteFooter />
    </div>
  );
}
