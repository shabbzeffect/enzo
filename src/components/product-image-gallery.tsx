"use client";

import * as React from "react";
import Image from "next/image";

export type ProductImageGalleryProps = {
  images: string[];
  alt: string;
  height?: number;
  className?: string;
};

export function ProductImageGallery({ images, alt, height = 480, className }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomPosition, setZoomPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleThumbClick = (index: number) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => setIsZoomed(false);

  return (
    <div className={["relative group", className].filter(Boolean).join(" ")}>
      <div
        className="relative rounded-xl border border-border overflow-hidden bg-cream-100 aspect-[4/5]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsZoomed(true)}
      >
        <Image
          src={images[selectedIndex] || "placeholder:product"}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedIndex === 0}
          className="object-cover transition-opacity duration-300"
        />
        {isZoomed && (
          <div
            className="absolute inset-0 pointer-events-none bg-black/10 transition-opacity"
            style={{
              backgroundImage: `radial-gradient(circle at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 0%, black 80%)`,
            }}
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => handleThumbClick(i)}
              className={[
                "shrink-0 w-16 h-16 rounded-lg border border-border bg-white overflow-hidden transition-colors hover:border-primary focus-visible-ring",
                selectedIndex === i ? "border-primary bg-primary/10" : "",
              ].filter(Boolean).join(" ")}
              aria-label={`Image ${i + 1}`}
              aria-pressed={selectedIndex === i}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
