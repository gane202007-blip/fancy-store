const express = require("express");
const router = express.Router();

const Product = require("../models/product");

// 👇 IMPORT MIDDLEWARE
const { verifyToken, isAdmin } = require("../middleware/auth");

/* =========================
   ADD PRODUCT (ADMIN ONLY)
========================= */
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   GET ALL PRODUCTS (PUBLIC)
========================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   DELETE PRODUCT (ADMIN ONLY)
========================= */
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   UPDATE PRODUCT (ADMIN ONLY)
========================= */
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;