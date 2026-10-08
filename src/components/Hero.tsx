import Image from "next/image";

const Hero = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-8 rounded-3xl border border-gray-200 bg-[#FAFCFA] px-5 py-6 md:px-10 md:py-10">
        {/* left part */}
        <div className="w-full md:max-w-xl text-center md:text-left">
          {/* eyebrow */}
          <span className="inline-block rounded-full bg-green-100 text-green-800 text-xs font-semibold px-3 py-1">
            {today}
          </span>

          {/* heading */}
          <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* subtitle */}
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
            পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA */}
          <a
            href="#সব-পণ্য"
            className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_6px_-4px_rgba(21,128,61,0.8)] hover:bg-green-800 transition-colors"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* right part: hero image */}
        <div className="shrink-0">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ফলমূল ও সবজির ঝুড়ি"
            width={320}
            height={240}
            priority
            className="w-44 sm:w-56 lg:w-72 h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
