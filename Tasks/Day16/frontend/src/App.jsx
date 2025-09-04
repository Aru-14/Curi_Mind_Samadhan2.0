// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import ProductList from "./Components/ProductList";
import AdminDashboard from "./Components/AdminDashboard";
import Cart from "./Components/Cart"
import Login from "./Components/Login"
import Register from "./Components/Register"
function App() {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
  path="/products"
  element={<ProductList />}
/>
     <Route
  path="/admin"
  element={<AdminDashboard />}
/>
  <Route
  path="/home"
  element={<Home />}
/>

        <Route
  path="/cart"
  element={<Cart />}

/>
  <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;
