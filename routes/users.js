const express = require("express");
const router = express.Router();

const User = require("../models/user");
const {verifyToken} = require("../middleware/auth");

/* USER PROFILE */

router.get("/profile", verifyToken, async(req,res)=>{

const user = await User.findById(req.user.id).select("-password");

res.json(user);

});

/* ADD ADDRESS */

router.post("/address", verifyToken, async(req,res)=>{

const user = await User.findById(req.user.id);

user.addresses.push(req.body);

await user.save();

res.json(user.addresses);

});

module.exports = router;