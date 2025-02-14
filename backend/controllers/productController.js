const Product = require("../models/product");

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}