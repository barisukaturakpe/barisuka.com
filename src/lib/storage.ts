import { createClient } from "@/lib/supabase/client";
import { COVER_BUCKET, getCoverPathFromUrl } from "@/lib/storage-path";

export { COVER_BUCKET, getCoverPathFromUrl };

export function getCoverPublicUrl(path: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(COVER_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadCoverImage(file: File, slug: string) {
  const supabase = createClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-") || "post";
  const path = `${safeSlug}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage.from(COVER_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  return getCoverPublicUrl(path);
}

export async function removeCoverImage(publicUrl: string) {
  const supabase = createClient();
  const path = getCoverPathFromUrl(publicUrl);
  if (!path) return;

  const { error } = await supabase.storage.from(COVER_BUCKET).remove([path]);
  if (error) throw error;
}
