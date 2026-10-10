import { cacheLife } from "next/cache";
import type { IProduct } from "./api";
import type { IProductDetail } from "./api";

export const getProducts = async (): Promise<IProduct[]> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  return res.json();
};

//for category section:
export const getProductsByCategory = async (category: string): Promise<IProduct[]> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(category)}`,
  );
  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

//for product detail:
export const getProduct = async (id: string): Promise<IProductDetail | null> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${encodeURIComponent(id)}`);
  if (!res.ok) return null;

  const data = await res.json();
  return data && data.id ? data : null;
};
