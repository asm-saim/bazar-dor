import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { HomeProductsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<HomeProductsSkeleton />}>
        <Products></Products>
      </Suspense>
    </div>
  );
}
