interface ICategory {
  id: string;
  icon: string;
  nameBn: string;
}

const NavLinks = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const data: ICategory[] = await res.json();

  return (
    <div className="border-b border-gray-200">
      <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-start px-3 sm:px-4 md:px-6 lg:px-10 gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 gap-y-1 lg:gap-y-2 py-2 text-xs sm:text-xs md:text-sm lg:text-sm">
        {data.map((item) => (
          <div key={item.id} className="flex items-center font-semibold gap-1 whitespace-nowrap">
            <span>{item.icon}</span>
            <span>{item.nameBn}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;