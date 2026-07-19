"use client";

import { FormEvent, useState } from "react";
import { PostEditor } from "@/components/PostEditor";
import { savePost } from "@/app/admin/actions";

type PostFormProps = {
  initial?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image_url: string;
    published: boolean;
  };
};

export function PostForm({ initial }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "<p></p>");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initial?.cover_image_url ?? "",
  );
  const [published, setPublished] = useState(initial?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await savePost(
        {
          title,
          slug,
          excerpt,
          content,
          cover_image_url: coverImageUrl,
          published,
        },
        initial?.id,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save post.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>

      <label>
        Slug
        <input
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="auto-generated from title if empty"
        />
      </label>

      <label>
        Excerpt
        <textarea
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          placeholder="Short summary shown in the posts list"
        />
      </label>

      <label>
        Cover image URL
        <input
          type="text"
          value={coverImageUrl}
          onChange={(event) => setCoverImageUrl(event.target.value)}
          placeholder="https://..."
        />
      </label>

      <div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "var(--ink-soft)",
          }}
        >
          Content
        </span>
        <PostEditor content={content} onChange={setContent} />
      </div>

      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={published}
          onChange={(event) => setPublished(event.target.checked)}
        />
        Publish
      </label>

      {error && <p className="newsletter-message error">{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" className="admin-btn primary" disabled={saving}>
          {saving ? "Saving…" : "Save post"}
        </button>
      </div>
    </form>
  );
}
