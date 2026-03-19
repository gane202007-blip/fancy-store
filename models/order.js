const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

userId:String,

products:Array,

total:Number,

status:{
type:String,
default:"processing"
},

trackingId:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Order",OrderSchema);