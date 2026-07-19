"use client";

import { useRef, useState } from "react";
import { removeCoverImage, uploadCoverImage } from "@/lib/storage";

type CoverImageUploadProps = {
  value: string;
  slug: string;
  onChange: (url: string) => void;
};

export function CoverImageUpload({ value, slug, onChange }: CoverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const previousUrl = value;
      const publicUrl = await uploadCoverImage(file, slug);

      onChange(publicUrl);

      if (previousUrl && previousUrl !== publicUrl) {
        try {
          await removeCoverImage(previousUrl);
        } catch {
          // Non-blocking cleanup if the old file cannot be removed.
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!value) return;

    setUploading(true);
    setError("");

    try {
      await removeCoverImage(value);
      onChange("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="cover-upload">
      <span className="cover-upload-label">Cover image</span>

      {value ? (
        <div className="cover-upload-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover preview" />
          <div className="cover-upload-actions">
            <button
              type="button"
              className="admin-btn"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              Replace
            </button>
            <button
              type="button"
              className="admin-btn"
              onClick={handleRemove}
              disabled={uploading}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="cover-upload-dropzone"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading…" : "Choose an image"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        hidden
      />

      {error && <p className="newsletter-message error">{error}</p>}
    </div>
  );
}
