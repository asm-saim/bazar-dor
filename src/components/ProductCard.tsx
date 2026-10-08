import { IProduct, formatPrice, formatPct, unitBn } from "@/lib/api";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { change } = product;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-4 shadow-sm">
      {/* top: icon + name + unit */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl md:text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm md:text-base font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitBn(product.unit)}</p>
        </div>
      </div>

      {/* bottom: price + change pill */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-sm">
            <span className="text-lg md:text-xl font-bold">{formatPrice(product.today)}</span> টাকা
          </p>
        </div>

        {change && (
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
              change.dir === "up" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}
          >
            {change.dir === "up" ? "▲" : "▼"} {formatPct(change.pct)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
