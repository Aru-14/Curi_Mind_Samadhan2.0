import React, { useEffect, useState } from "react";
// import axios from "axios";

function ProductList({ onAddToCart, cartItems }) {
  const [products, setProducts] = useState([]);

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
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
      {products.map((product) => {
        const inCart = cartItems.some((item) => item._id === product._id);

        return (
          <div key={product._id} className="bg-white shadow-md rounded-2xl p-4">
            <img
              src={product.imageUrl || "https://via.placeholder.com/200"}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mt-3">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-indigo-600 font-semibold mt-2">
              ₹{(product.price / 100).toFixed(2)}
            </p>
            <button
              onClick={() => onAddToCart(product)}
              disabled={inCart}
              className={`mt-3 w-full py-2 rounded-xl ${
                inCart
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {inCart ? "In Cart ✅" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
