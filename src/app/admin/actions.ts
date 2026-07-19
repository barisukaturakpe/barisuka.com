"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/posts";
import { COVER_BUCKET, getCoverPathFromUrl } from "@/lib/storage-path";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/posts");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  published: boolean;
};

export async function savePost(input: PostInput, id?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const slug = input.slug.trim() || slugify(input.title);
  const payload = {
    title: input.title.trim(),
    slug,
    excerpt: input.excerpt.trim() || null,
    content: input.content,
    cover_image_url: input.cover_image_url.trim() || null,
    published: input.published,
    published_at: input.published ? new Date().toISOString() : null,
  };

  if (id) {
    const { error } = await supabase.from("posts").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("posts").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/posts");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("cover_image_url")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  const coverPath = post?.cover_image_url
    ? getCoverPathFromUrl(post.cover_image_url)
    : null;

  if (coverPath) {
    await supabase.storage.from(COVER_BUCKET).remove([coverPath]);
  }

  revalidatePath("/");
  revalidatePath("/posts");
  redirect("/admin/posts");
}
