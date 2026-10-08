import { cacheLife } from "next/cache";
import type { IProduct } from "./api";

export const getProducts = async (): Promise<IProduct[]> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  return res.json();
};

export const getProductsByCategory = async (category: string): Promise<IProduct[]> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(category)}`,
  );
  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : [];
};
