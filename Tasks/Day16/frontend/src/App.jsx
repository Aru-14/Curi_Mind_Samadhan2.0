import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
import ProductList from "./Components/ProductList";
// import CartPage from "./pages/CartPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item._id === product._id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
  path="/products"
  element={<ProductList onAddToCart={handleAddToCart} cartItems={cartItems} />}
/>
        {/* <Route path="/cart" element={<CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
