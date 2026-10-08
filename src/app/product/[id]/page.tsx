import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/data";
import { formatPrice, formatPct, unitBn } from "@/lib/api";

const badgeStyle = {
  up: "text-red-600",
  down: "text-green-600",
  flat: "text-gray-500",
} as const;

const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const { change, markets } = product;
  const unitShort = unitBn(product.unit).replace("প্রতি ", "");

  // summary numbers
  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const average = markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length;

  // today vs yesterday
  const diff = (product.today ?? 0) - (product.yesterday ?? 0);
  const diffText =
    change?.dir === "flat" || diff === 0
      ? "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
      : `গতকালের তুলনায় আজ দাম ${diff > 0 ? "বেড়েছে" : "কমেছে"} · ${formatPrice(Math.abs(diff))} টাকা`;

  return (
    <div className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-5">
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-green-700">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      {/* header card */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl md:text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold leading-tight">{product.nameBn}</h1>
            <p className="text-xs md:text-sm text-gray-500">
              {unitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-xs md:text-sm text-gray-700">{diffText}</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-green-50/60 px-5 py-3 text-center md:min-w-40">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl md:text-3xl font-extrabold">{formatPrice(product.today)}</p>
          <p className="text-xs text-gray-500">টাকা / {unitShort}</p>
          {change && (
            <p className={`mt-1 text-xs font-semibold ${badgeStyle[change.dir]}`}>
              {change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—"} {formatPct(Math.abs(change.pct))}%
            </p>
          )}
        </div>
      </section>

      {/* summary */}
      <section className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="mb-3 text-base md:text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="rounded-lg border border-gray-200 p-3 md:p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-xl md:text-2xl font-bold text-green-600">
              {formatPrice(lowest.min)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার: {lowest.market}</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-3 md:p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="text-xl md:text-2xl font-bold text-red-600">
              {formatPrice(highest.max)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার: {highest.market}</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-3 md:p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-xl md:text-2xl font-bold text-green-700">
              {formatPrice(average)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">{unitBn(product.unit)}-এর হিসাবে</p>
          </div>
        </div>
      </section>

      {/* market table */}
      <section className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="mb-3 text-base md:text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-xl text-left text-xs md:text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-3 py-2.5 md:px-4 font-medium">বাজার</th>
                <th className="px-3 py-2.5 md:px-4 font-medium">বিভাগ</th>
                <th className="px-3 py-2.5 md:px-4 font-medium text-right">সর্বনিম্ন</th>
                <th className="px-3 py-2.5 md:px-4 font-medium text-right">সর্বাধিক</th>
                <th className="px-3 py-2.5 md:px-4 font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {markets.map((m) => (
                <tr key={`${m.market}-${m.division}`} className="odd:bg-white even:bg-gray-50/70">
                  <td className="px-3 py-2.5 md:px-4 font-semibold">{m.market}</td>
                  <td className="px-3 py-2.5 md:px-4 text-gray-600">{m.division}</td>
                  <td className="px-3 py-2.5 md:px-4 text-right">{formatPrice(m.min)} টাকা</td>
                  <td className="px-3 py-2.5 md:px-4 text-right">{formatPrice(m.max)} টাকা</td>
                  <td className="px-3 py-2.5 md:px-4 text-right font-bold">{formatPrice((m.min + m.max) / 2)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4 animate-pulse">
    <div className="h-4 w-48 rounded bg-gray-200" />
    <div className="h-28 rounded-xl border border-gray-200 bg-white" />
    <div className="h-40 rounded-xl border border-gray-200 bg-white" />
    <div className="h-80 rounded-xl border border-gray-200 bg-white" />
  </div>
);

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
};

export default ProductPage;
