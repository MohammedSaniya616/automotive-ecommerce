require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (CORRECT)
mongoose.connect(
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



// ---------------- SCHEMAS ----------------

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

// Cart Schema
const CartSchema = new mongoose.Schema({
  name: String,
  price: Number
});

// Order Schema
const OrderSchema = new mongoose.Schema({
  items: Array,
  date: String
});

// Models
const Product = mongoose.model("Product", ProductSchema);
const Cart = mongoose.model("Cart", CartSchema);
const Order = mongoose.model("Order", OrderSchema);

// ---------------- ROUTES ----------------

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Get products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (admin)
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: "Product added" });
});

// Add to cart
app.post("/api/cart", async (req, res) => {
  const item = new Cart(req.body);
  await item.save();
  res.json({ message: "Added to cart" });
});

// Get cart
app.get("/api/cart", async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

// Clear cart
app.delete("/api/cart", async (req, res) => {
  await Cart.deleteMany({});
  res.json({ message: "Cart cleared" });
});

// Place order
app.post("/api/order", async (req, res) => {
  const items = await Cart.find();

  if (items.length === 0) {
    return res.json({ message: "Cart is empty" });
  }

  const order = new Order({
    items,
    date: new Date().toLocaleString()
  });

  await order.save();
  await Cart.deleteMany({});

  res.json({
    message: "Order placed successfully",
    order
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
