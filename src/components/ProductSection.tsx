import { IProduct } from "@/lib/api";
import ProductCard from "./ProductCard";

interface Props {
  id?: string;
  title: string;
  subtitle?: string;
  tone?: "up" | "down";
  products: IProduct[];
}

const ProductSection = ({ id, title, subtitle, tone, products }: Props) => {
  if (products.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-20 max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6">
      <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold">
        {tone && (
          <span className={`text-sm ${tone === "up" ? "text-red-600" : "text-green-600"}`}>
            {tone === "up" ? "▲" : "▼"}
          </span>
        )}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-xs md:text-sm text-gray-500">{subtitle}</p>}

      <div className="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
