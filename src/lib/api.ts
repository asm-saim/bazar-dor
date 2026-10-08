export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: { dir: "up" | "down" | "flat"; pct: number };
}

const UNIT_BN: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const unitBn = (unit?: string) => (unit ? (UNIT_BN[unit.toLowerCase()] ?? `প্রতি ${unit}`) : "");

export const formatPrice = (num?: number | null) =>
  num == null ? "-" : num.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

export const formatPct = (num?: number | null) =>
  num == null ? "-" : num.toLocaleString("bn-BD", { useGrouping: false, maximumFractionDigits: 1 });

export interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface IProductDetail extends IProduct {
  markets: IMarket[];
}

export interface ICategory {
  id: string;
  slug: string;
  icon: string;
  nameBn: string;
}
