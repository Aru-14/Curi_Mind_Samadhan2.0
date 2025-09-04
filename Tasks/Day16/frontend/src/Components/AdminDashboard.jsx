import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    stock: "",
    category: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products/get");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingProduct) {
        res = await fetch(
          `http://localhost:5000/products/update/${editingProduct._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );
      } else {
        res = await fetch("http://localhost:5000/products/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      if (!res.ok) throw new Error("Failed to save product");
      setForm({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        stock: "",
        category: "",
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({ ...product });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Admin Dashboard</h1>

      {/* Add / Update Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg grid gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (in cents)"
          value={form.price}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 transition duration-300"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white shadow-xl rounded-2xl p-4 flex flex-col">
            <img
              src={p.imageUrl || "https://via.placeholder.com/200"}
              alt={p.name}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-indigo-600 font-bold mt-1">₹{(p.price / 100).toFixed(2)}</p>
            <p className="text-gray-600 text-sm mt-1">{p.description}</p>
            <p className="text-gray-400 text-xs mt-1">Stock: {p.stock}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 py-2 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
