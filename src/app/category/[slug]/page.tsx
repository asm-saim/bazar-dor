import { Suspense } from "react";
import { getProductsByCategory } from "@/lib/data";
import CategoryView from "@/components/CategoryView";
import CategorySkeleton from "@/components/CategorySkeleton";
import CategoryEmpty from "@/components/CategoryEmpty";

const CategoryProducts = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  if (products.length === 0) return <CategoryEmpty />;

  return <CategoryView products={products} />;
};

const CategoryPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryProducts params={params} />
    </Suspense>
  );
};

export default CategoryPage;
