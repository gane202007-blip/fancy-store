const mongoose = require("mongoose");

const connectDB = async () => {

try {

await mongoose.connect("mongodb+srv://gane202007_db_user:dqBlEcBMGwa6APou@cluster0.1ikcqiw.mongodb.net/fancystore");

console.log("MongoDB Connected");

} catch (error) {

console.error(error);
process.exit(1);

}

};

module.exports = connectDB;