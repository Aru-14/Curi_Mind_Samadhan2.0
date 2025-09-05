import React, { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';

function Cart() {
  const [cart, setCart] = useState(null);


const stripePromise = loadStripe("pk_test_51S3sx4GbWK4FJ3bu23MWavVhwu8YXfKZvBX0aRU9kDTCK4AEl6DBBSGK0IdO0toAYekGiMoalKWQTWF5q4yfVhss00z90hj3gt");


async function checkOut(cartItems) {
  const res = await fetch("http://localhost:5000/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems }),
  });

  const data = await res.json();
  console.log("Stripe session response:", data); // 👈 debug here

  if (!data.id) {
    alert("Error: sessionId not received from backend");
    return;
  }

  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: data.id });
}

  // Fetch cart on load
  useEffect(() => {
    fetch("http://localhost:5000/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const updateQuantity = async (productId, newQty) => {
    try {
      const res = await fetch("http://localhost:5000/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity: newQty }),
      });
      const updated = await res.json();
      setCart(updated);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
      const updated = await res.json();
      setCart(updated);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (!cart) return <p className="p-4 text-center text-gray-500">Loading cart...</p>;
  if (cart.items.length === 0) return <p className="p-4 text-center text-gray-500">Your cart is empty.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Your Shopping Cart</h1>

      <div className="grid gap-6">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col md:flex-row items-center md:justify-between bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.imageUrl || "https://via.placeholder.com/100"}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{item.product.name}</h2>
                <p className="text-indigo-600 font-bold mt-1">
                  ₹{(item.product.price / 100).toFixed(2)}
                </p>
                <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors"
              >
                +
              </button>
              <button
                onClick={() =>
                  item.quantity > 1
                    ? updateQuantity(item.product._id, item.quantity - 1)
                    : removeItem(item.product._id)
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors"
              >
                -
              </button>
              <button
                onClick={() => removeItem(item.product._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
{console.log(cart)}
      <div className="mt-8 bg-indigo-50 p-6 rounded-2xl shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Total:</h2>
        <span className="text-2xl font-extrabold text-indigo-600">
          ₹
          {cart.items
            .reduce((acc, item) => acc + (item.product.price * item.quantity) / 100, 0)
            .toFixed(2)}
        </span>
      </div>

      <div className="mt-6 text-center">
        <button onClick={()=>{checkOut(cart.items)}} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold hover:bg-indigo-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
