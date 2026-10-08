import Hero from "@/components/Hero";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* ... */}
      <section id="সব-পণ্য" className="scroll-mt-20 max-w-6xl mx-auto px-4">
        <Products></Products>
      </section>
    </div>
  );
}
