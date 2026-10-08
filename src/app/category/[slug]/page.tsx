import { Suspense } from "react";

import CategoryView from "@/components/CategoryView";
import { getProductsByCategory } from "@/lib/data";

const CategoryProducts = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return <p className="max-w-6xl mx-auto px-4 py-10 text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>;
  }

  return <CategoryView products={products} />;
};

const CategoryPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-10">লোড হচ্ছে...</div>}>
      <CategoryProducts params={params} />
    </Suspense>
  );
};

export default CategoryPage;
