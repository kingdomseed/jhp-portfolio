import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ensures image paths use the optimized WebP format
 * @param path The original image path
 * @returns The path to the optimized WebP version
 */
export function getOptimizedImagePath(path: string): string {
  if (!path || path.includes('/optimized/')) return path;
  
  const match = path.match(/\/images\/([^/]+)\/([^/]+)\.([^.]+)$/);
  if (match) {
    const [, category, filename] = match;
    return `/images/optimized/${category}/${filename}.webp`;
  }
  
  return path;
}
