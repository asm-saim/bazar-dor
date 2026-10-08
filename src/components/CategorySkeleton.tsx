const CategorySkeleton = () => {
  return (
    <section
      className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-3 md:space-y-4 animate-pulse"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      {/* header card */}
      <div className="flex items-center gap-3 md:gap-4 rounded-xl border border-gray-200 bg-white p-3 md:p-5">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="h-3 w-40 rounded bg-gray-100" />
        </div>
      </div>

      {/* toolbar */}
      <div className="h-12 rounded-xl border border-gray-200 bg-white" />

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-3 md:p-4">
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
        ))}
      </div>
    </section>
  );
};

export default CategorySkeleton;
