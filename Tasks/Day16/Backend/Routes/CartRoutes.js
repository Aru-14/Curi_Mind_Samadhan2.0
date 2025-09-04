// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/CartController");
const auth =require('../Middleware/auth')
// ✅ For real apps you’d want auth middleware to set req.user
// Example: router.use(authMiddleware);

// Get current user's cart
router.get("/",auth, cartController.getCart);

// Add product to cart
router.post("/add",auth, cartController.addToCart);

// Update product quantity in cart
router.put("/update", auth, cartController.updateCartItem);

// Remove product from cart
router.delete("/remove",auth, cartController.removeFromCart);

// Clear entire cart
router.delete("/clear",auth, cartController.clearCart);

module.exports = router;
