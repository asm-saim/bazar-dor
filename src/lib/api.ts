export interface IProduct {
  id: number;
  slug: string;
  
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string; // "kg", "dozen", "piece", ...
  image: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: { dir: "up" | "down"; pct: number };
}

export const getProducts = async (): Promise<IProduct[]> => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  return res.json();
};

// English unit -> Bengali label
const UNIT_BN: Record<string, string> = {
  kg: "প্রতি কেজি",
  g: "প্রতি গ্রাম",
  l: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  pc: "প্রতি পিস",
};

export const unitBn = (unit?: string) => (unit ? (UNIT_BN[unit.toLowerCase()] ?? `প্রতি ${unit}`) : "");

export const formatPrice = (num?: number | null) =>
  num == null ? "-" : num.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

export const formatPct = (num?: number | null) =>
  num == null ? "-" : num.toLocaleString("bn-BD", { useGrouping: false, maximumFractionDigits: 1 });
