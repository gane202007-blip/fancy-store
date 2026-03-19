const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/fancystore")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.listen(5000,()=>{
console.log("Server running on port 5000");
});