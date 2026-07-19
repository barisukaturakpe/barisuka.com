import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deletePost } from "@/app/admin/actions";
import { PostForm } from "@/components/PostForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Post — Admin",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div className="admin-wrap">
      <Link href="/admin/posts" className="back-link">
        ← All posts
      </Link>
      <div className="admin-header">
        <h1>Edit post</h1>
        <form action={deletePost.bind(null, id)}>
          <button type="submit" className="admin-btn">
            Delete
          </button>
        </form>
      </div>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          cover_image_url: post.cover_image_url ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
