function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-h-60 object-contain rounded-lg mb-3 "
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-green-600">₹{product.price}</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
