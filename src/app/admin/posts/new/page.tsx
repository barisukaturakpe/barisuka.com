import type { Metadata } from "next";
import Link from "next/link";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Post — Admin",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="admin-wrap">
      <Link href="/admin/posts" className="back-link">
        ← All posts
      </Link>
      <div className="admin-header">
        <h1>New post</h1>
      </div>
      <PostForm />
    </div>
  );
}
