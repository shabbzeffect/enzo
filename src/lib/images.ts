export function getImageUrl(placeholderId: string): string {
  // Demo placeholder format: "placeholder:category-name" or "placeholder:prod-product-name-1"
  // In production, replace with actual Cloudinary URLs or asset storage
  if (placeholderId.startsWith("placeholder:")) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (cloudName) {
      const id = placeholderId.replace("placeholder:", "");
      return `https://res.cloudinary.com/${cloudName}/image/upload/v1/nyumba-edit/${id}`;
    }
    // Fallback to a placeholder service
    const encoded = encodeURIComponent(placeholderId.replace("placeholder:", ""));
    return `https://placehold.co/800x600/e8e8e8/666666?text=${encoded}`;
  }
  return placeholderId;
}