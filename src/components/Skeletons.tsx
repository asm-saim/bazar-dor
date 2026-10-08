// one card placeholder, same size and shape as ProductCard
export const ProductCardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gray-200" />
      <div className="space-y-2">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-100" />
      </div>
    </div>
    <div className="mt-4 flex items-end justify-between">
      <div className="space-y-2">
        <div className="h-3 w-16 rounded bg-gray-100" />
        <div className="h-5 w-20 rounded bg-gray-200" />
      </div>
      <div className="h-5 w-14 rounded bg-gray-100" />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// a titled section placeholder
const SectionSkeleton = () => (
  <section className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6">
    <div className="h-6 w-40 rounded bg-gray-200" />
    <div className="mt-3 md:mt-4">
      <ProductGridSkeleton />
    </div>
  </section>
);

// whole Home products area: increased, decreased, all
export const HomeProductsSkeleton = () => (
  <div className="animate-pulse" aria-busy="true" aria-label="লোড হচ্ছে">
    <SectionSkeleton />
    <SectionSkeleton />
    <SectionSkeleton />
  </div>
);

// thin bar for the marquee
export const MarqueeSkeleton = () => (
  <div className="border-b border-gray-100 animate-pulse py-2">
    <div className="max-w-6xl mx-auto px-3 md:px-4">
      <div className="h-4 w-full rounded bg-gray-100" />
    </div>
  </div>
);
