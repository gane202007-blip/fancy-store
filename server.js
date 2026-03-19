const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

/* ROOT ROUTE (important for testing) */
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* MONGODB CONNECTION (USE ENV VARIABLE) */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("DB Error:", err));

/* PORT FIX (VERY IMPORTANT) */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});