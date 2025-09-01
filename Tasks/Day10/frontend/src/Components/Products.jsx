import ProductCard from "./ProductCard";

function Products() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Noise-cancelling, 20h battery",
      price: 2999,
      image: "/images/headphones.jpeg",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness tracking, waterproof",
      price: 4999,
      image: "/images/smart.jpeg",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      description: "RGB, ergonomic design",
      price: 1999,
      image: "/images/mouse.jpeg",
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default Products;
