import ProductList from "../Components/ProductList";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600">
          Welcome to E-Store
        </h1>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={() => navigate("/admin")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-300"
          >
            Admin
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-300"
          >
            See Cart
          </button>
        </div>
      </div>

      {/* Product Listing */}
      <ProductList />
    </div>
  );
}

export default HomePage;
