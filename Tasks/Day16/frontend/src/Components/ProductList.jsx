import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // track loading per product

  const addToCart = async (productId, productName) => {
    setLoadingId(productId);
    try {
      const res = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.msg || "Failed to add to cart");
      }

      const data = await res.json();
      console.log("✅ Cart updated:", data);
      alert(`${productName} added to cart!`);
    } catch (err) {
      console.error("❌ Error:", err.message);
      alert("Error adding to cart: " + err.message);
    }
    setLoadingId(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products/get");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition duration-300"
        >
          <img
            src={product.imageUrl || "https://via.placeholder.com/200"}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h2 className="text-lg font-bold text-indigo-600">{product.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          <p className="text-indigo-700 font-semibold mt-2 text-lg">
            ₹{(product.price / 100).toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product._id, product.name)}
            disabled={loadingId === product._id}
            className={`mt-3 w-full py-2 rounded-xl font-semibold text-white transition duration-300 ${
              loadingId === product._id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loadingId === product._id ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
