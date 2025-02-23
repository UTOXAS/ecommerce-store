const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
});

// export default model("Product", productSchema);
module.exports = mongoose.model("Product", productSchema);