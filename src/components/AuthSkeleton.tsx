export const ProfileSkeleton = () => (
  <section className="max-w-3xl mx-auto px-3 md:px-4 py-6 md:py-10 space-y-4 animate-pulse" aria-busy="true">
    <div className="space-y-2">
      <div className="h-7 w-40 rounded bg-gray-200" />
      <div className="h-3 w-56 rounded bg-gray-100" />
    </div>

    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/70 p-4 md:p-5">
      <div className="h-16 w-16 rounded-xl bg-gray-200" />
      <div className="space-y-2">
        <div className="h-5 w-36 rounded bg-gray-200" />
        <div className="h-3 w-48 rounded bg-gray-100" />
      </div>
    </div>

    <div className="space-y-3 rounded-2xl border border-gray-200 bg-white/70 p-4 md:p-5">
      <div className="h-5 w-16 rounded bg-gray-200" />
      <div className="h-3 w-10 rounded bg-gray-100" />
      <div className="h-10 rounded-lg bg-gray-100" />
      <div className="h-10 rounded-lg bg-gray-200" />
    </div>
  </section>
);
