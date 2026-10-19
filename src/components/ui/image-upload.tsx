"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onUpload: (publicId: string, url: string) => void;
  currentImage?: string;
  label?: string;
  folder?: string;
}

export function ImageUpload({ onUpload, currentImage, label = "Image", folder = "nyumba-edit" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      onUpload(data.publicId, data.url);
      setPreview(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground block">{label}</label>
      {preview && (
        <div className="relative w-full max-w-xs">
          <img
            src={preview}
            alt={label}
            className="rounded-xl border border-border w-full aspect-video object-cover"
          />
          <input type="file" accept="image/*" onChange={handleChange} className="sr-only" id={`upload-${label.toLowerCase()}`} disabled={uploading} />
          <button
            type="button"
            onClick={() => document.getElementById(`upload-${label.toLowerCase()}`)?.click()}
            disabled={uploading}
            className="absolute bottom-2 right-2 rounded-xl bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground hover:bg-white transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Change"}
          </button>
        </div>
      )}
      {!preview && (
        <label className="cursor-pointer">
          <input type="file" accept="image/*" onChange={handleChange} className="sr-only" id={`upload-${label.toLowerCase()}`} disabled={uploading} />
          <div className="rounded-xl border-2 border-dashed border-border bg-white p-8 text-center hover:border-primary transition-colors">
            <svg className="mx-auto h-12 w-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-muted">Click to upload {label.toLowerCase()}</p>
            <p className="text-xs text-muted">PNG, JPG, WebP up to 5MB</p>
          </div>
        </label>
      )}
      {error && <p className="text-sm text-terracotta-600">{error}</p>}
    </div>
  );
}