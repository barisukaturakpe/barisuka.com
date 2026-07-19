import { createClient } from "@/lib/supabase/server";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPublishedPosts(limit?: number) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }

  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, published, published_at, created_at, updated_at",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, published, published_at, created_at, updated_at",
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data as Post;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
