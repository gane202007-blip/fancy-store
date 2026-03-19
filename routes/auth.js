const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* ================= SIGNUP ================= */

router.post("/signup", async (req,res)=>{

try{

const {name,email,password} = req.body;

/* CHECK USER EXISTS */
const existingUser = await User.findOne({email});

if(existingUser){
return res.json({message:"User already exists"});
}

/* HASH PASSWORD */
const hashed = await bcrypt.hash(password,10);

/* CREATE USER */
const user = new User({
name,
email,
password:hashed,
role:"user" // default role
});

await user.save();

res.json({message:"User created successfully ✅"});

}catch(err){
console.error(err);
res.status(500).json({message:"Server error ❌"});
}

});

/* ================= LOGIN ================= */

router.post("/login", async(req,res)=>{

try{

const {email,password} = req.body;

/* FIND USER */
const user = await User.findOne({email});

if(!user){
return res.json({message:"User not found ❌"});
}

/* ✅ FIX: COMPARE HASHED PASSWORD */
const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
return res.json({message:"Wrong password ❌"});
}

/* GENERATE TOKEN */
const token = jwt.sign({
id:user._id,
role:user.role
},"secretkey",{expiresIn:"1d"});

/* SUCCESS */
res.json({
token,
role:user.role,
message:"Login successful ✅"
});

}catch(err){
console.error(err);
res.status(500).json({message:"Server error ❌"});
}

});

module.exports = router;