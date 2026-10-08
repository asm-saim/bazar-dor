import Link from "next/link";

const CategoryEmpty = () => {
  return (
    <section className="max-w-6xl mx-auto px-3 md:px-4 py-10 md:py-16">
      <div className="flex flex-col items-center text-center rounded-xl border border-gray-200 bg-white px-4 py-10 md:py-14 shadow-sm">
        <p className="text-5xl md:text-6xl font-extrabold text-green-700">৪০৪</p>
        <h1 className="mt-3 text-lg md:text-2xl font-bold">কোনো পণ্য পাওয়া যায়নি</h1>
        <p className="mt-2 max-w-md text-xs md:text-sm text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য নেই, অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_6px_-4px_rgba(21,128,61,0.8)] hover:bg-green-800 transition-colors"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
};

export default CategoryEmpty;
