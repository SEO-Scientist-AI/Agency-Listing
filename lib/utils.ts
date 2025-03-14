import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUniqueValuesFromArray<T>(arr: T[], key: keyof T): T[] {
  const uniqueMap = new Map<any, T>();
  
  arr.forEach(item => {
      if (!uniqueMap.has(item[key])) {
          uniqueMap.set(item[key], item);
      }
  });
  
  return Array.from(uniqueMap.values());
}

export function formatSlug(name: string) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
}