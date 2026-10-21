import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryUpload = cloudinary.uploader;
export const cloudinaryApi = cloudinary.api;

export function getCloudinaryUrl(publicId: string, options?: Record<string, unknown>) {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
}

export function getOptimizedImageUrl(publicId: string, width?: number, height?: number, quality = "auto") {
  return cloudinary.url(publicId, {
    secure: true,
    width,
    height,
    quality,
    fetch_format: "auto",
    crop: width && height ? "fill" : undefined,
    gravity: "auto",
  });
}