import { useState } from "react";
interface ImageWithFallbackProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const PLACEHOLDERS = {
  USER: 'https://placehold.co/150/e2e8f0/64748b?text=User',
  CONTRACTOR: 'https://placehold.co/300x200/e2e8f0/64748b?text=Contractor',
  ARTICLE: 'https://placehold.co/400x250/e2e8f0/64748b?text=Article',
  PROJECT: 'https://placehold.co/600x400/e2e8f0/64748b?text=Project',
  DEFAULT: 'https://placehold.co/300/e2e8f0/64748b?text=No+Image',
};


/**
 * Simple image component with automatic fallback
 * Usage: <ImageWithFallback src={imgUrl} alt="Description" />
 */
export default function ImageWithFallback({
  src,
  alt = "Image",
  fallback = PLACEHOLDERS.DEFAULT,
  className = "",
  width = "100%",
  height = "auto",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={{ width, height }}
      onError={() => setImgSrc(fallback)}
    />
  );
}
