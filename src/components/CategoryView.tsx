"use client";

import { useState } from "react";
import { IProduct } from "@/lib/api";
import ProductCard from "./ProductCard";

type SortKey = "default" | "priceAsc" | "priceDesc";

const CategoryView = ({ products }: { products: IProduct[] }) => {
  const [sort, setSort] = useState<SortKey>("default");

  const list =
    sort === "default"
      ? products
      : [...products].sort((a, b) =>
          sort === "priceAsc" ? (a.today ?? 0) - (b.today ?? 0) : (b.today ?? 0) - (a.today ?? 0),
        );

  const count = products.length.toLocaleString("bn-BD");

  return (
    <section className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-3 md:space-y-4">
      {/* title + icon */}
      <div className="flex items-center gap-3 md:gap-4 rounded-xl border border-gray-200 bg-white p-3 md:p-5 shadow-sm">
        <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl md:text-2xl">
          {products[0].categoryIcon}
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-bold leading-tight">{products[0].categoryNameBn}</h1>
          <p className="text-xs md:text-sm text-gray-500">{count}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      {/* sort control */}
      <div className="flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 md:px-5 shadow-sm">
        <label htmlFor="sort" className="text-xs md:text-sm text-gray-500">
          সাজান:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs md:text-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="priceAsc">দাম: কম থেকে বেশি</option>
          <option value="priceDesc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-xs md:text-sm text-gray-500">মোট {count}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default CategoryView;
