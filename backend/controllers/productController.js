const Product = require("../models/product");

exports.getProducts = async (req, res) => {
    // console.log("getProducts");
    const products = await Product.find();
    // console.log(products);
    res.json(products);
}