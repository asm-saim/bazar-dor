import MarqueeClient, { IProduct } from "./MarqueeClient";

const Marquee = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data: IProduct[] = await res.json();
  console.log(data);

  return (
    <div className="border-b border-gray-100">
      <MarqueeClient data={data} />
    </div>
  );
};

export default Marquee;
