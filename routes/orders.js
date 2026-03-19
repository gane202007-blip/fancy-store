const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const {verifyToken} = require("../middleware/auth");

/* CREATE ORDER */

router.post("/", verifyToken, async(req,res)=>{

const order = new Order({

user:req.user.id,
products:req.body.products,
total:req.body.total,
status:"pending"

});

await order.save();

res.json(order);

});

/* GET USER ORDERS */

router.get("/", verifyToken, async(req,res)=>{

const orders = await Order.find({user:req.user.id});

res.json(orders);

});

module.exports = router;