const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-white/70">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-4 lg:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-6 lg:gap-8 text-center md:text-left text-xs lg:text-sm text-[#1D271F]">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="md:text-right">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;
