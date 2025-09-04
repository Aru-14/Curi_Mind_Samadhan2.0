
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");

// ✅ Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching cart", error: err.message });
  }
};

// ✅ Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Ensure product exists
    const product = await Product.findById(productId);
    console.log(product)
    if (!product) return res.status(404).json({ msg: "Product not found" });
console.log("Hi")
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    await cart.populate("items.product"); // ensure product details are included
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Error adding to cart", error: err.message });
  }
};

// ✅ Update item quantity
exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      await cart.populate("items.product");
      res.json(cart);
    } else {
      res.status(404).json({ msg: "Product not in cart" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error updating cart", error: err.message });
  }
};

// ✅ Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Error removing item", error: err.message });
  }
};

// ✅ Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [] },
      { new: true }
    );
    res.json(cart || { msg: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ msg: "Error clearing cart", error: err.message });
  }
};
