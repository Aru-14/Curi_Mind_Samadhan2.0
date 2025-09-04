// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");

// GET all products
router.get("/get", productController.getProducts);

// GET single product by ID
router.get("/:id", productController.getProductById);

// CREATE a new product
router.post("/add", productController.addProduct);

// UPDATE a product
router.put("/update/:id", productController.updateProduct);

// DELETE a product
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
