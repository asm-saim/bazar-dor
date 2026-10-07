

const NavLinks = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const data = await res.json();
  console.log(data);

  return (
    <div>
      <div className="flex gap-7">
        {data.map((item) => (
          <div key={item.id} className="flex  items-center gap-1">
            <span>{item.icon}</span>
            <span>{item.nameBn}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
