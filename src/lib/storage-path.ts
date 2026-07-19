export const COVER_BUCKET = "post-covers";

export function getCoverPathFromUrl(publicUrl: string) {
  const marker = `/storage/v1/object/public/${COVER_BUCKET}/`;
  if (!publicUrl.includes(marker)) return null;
  return publicUrl.split(marker)[1] ?? null;
}
