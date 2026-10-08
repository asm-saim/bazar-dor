import { getProducts, formatPct } from "@/lib/api";
import ProductSection from "./ProductSection";

const byBiggestChange = (a: { change?: { pct: number } }, b: { change?: { pct: number } }) =>
  (b.change?.pct ?? 0) - (a.change?.pct ?? 0);

const Products = async () => {
  const products = await getProducts();

  const increased = products
    .filter((p) => p.change?.dir === "up")
    .sort(byBiggestChange)
    .slice(0, 6);
  const decreased = products
    .filter((p) => p.change?.dir === "down")
    .sort(byBiggestChange)
    .slice(0, 6);

  return (
    <>
      <ProductSection tone="up" title="আজ দাম বেড়েছে" products={increased} />
      <ProductSection tone="down" title="আজ দাম কমেছে" products={decreased} />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
};

export default Products;
