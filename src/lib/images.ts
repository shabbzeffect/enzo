export function getImageUrl(placeholderId: string): string {
  if (placeholderId.startsWith("placeholder:")) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const id = placeholderId.replace("placeholder:", "");
    if (cloudName) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_800/nyumba-edit/${id}`;
    }
    const encoded = encodeURIComponent(id);
    return `https://placehold.co/800x600/e8e8e8/666666?text=${encoded}`;
  }
  return placeholderId;
}

export function getOptimizedImageUrl(
  placeholderId: string,
  width?: number,
  height?: number,
  quality: "auto" | "low" | "medium" | "high" = "auto"
): string {
  if (placeholderId.startsWith("placeholder:")) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const id = placeholderId.replace("placeholder:", "");
    if (cloudName) {
      const params = new URLSearchParams();
      params.set("f", "auto");
      params.set("q", quality);
      if (width) params.set("w", String(width));
      if (height) params.set("h", String(height));
      if (width && height) params.set("c", "fill");
      if (width && height) params.set("g", "auto");
      return `https://res.cloudinary.com/${cloudName}/image/upload/${params.toString()}/nyumba-edit/${id}`;
    }
    const encoded = encodeURIComponent(id);
    const dims = width && height ? `${width}x${height}` : "800x600";
    return `https://placehold.co/${dims}/e8e8e8/666666?text=${encoded}`;
  }
  return placeholderId;
}