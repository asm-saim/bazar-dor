import { cacheLife } from "next/cache";
import type { IProduct } from "./api";

export const getProducts = async (): Promise<IProduct[]> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  return res.json();
};
