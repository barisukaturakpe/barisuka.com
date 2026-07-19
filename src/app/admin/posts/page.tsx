import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Posts — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, published, published_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <h1>Posts</h1>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/admin/posts/new" className="admin-btn primary">
            New post
          </Link>
          <form action={signOut}>
            <button type="submit" className="admin-btn">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {(posts ?? []).map((post) => (
            <tr key={post.id}>
              <td>
                <Link href={`/admin/posts/${post.id}/edit`}>{post.title}</Link>
              </td>
              <td>{post.published ? "Published" : "Draft"}</td>
              <td>
                {new Date(post.updated_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(posts ?? []).length === 0 && (
        <p style={{ marginTop: 24 }}>No posts yet. Create your first one.</p>
      )}
    </div>
  );
}
