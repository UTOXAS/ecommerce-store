const Cart = require("../models/cart");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config()

const BASE_URL = 
    process.env.NODE_ENV === "production"
        ? process.env.PROD_BASE_URL
        : process.env.DEV_BASE_URL;

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate("products.productId");
        // console.log(`cart: ${cart}`)
        if (!cart) {
            return res.json({ products: [] });
        }

        const cartItems = cart.products.map(item => ({
            _id: item._id,
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image || `${BASE_URL}/images/placeholder_image.png`,
            quantity: item.quantity
        }));

        // console.log(`cartItems: ${JSON}`)
        // res.json(cart);
        res.json({ products: cartItems });
    } catch(error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to load cart" });
    }
};

exports.addToCart = async (req, res) => {
    // console.log("📌 addToCart invoked"); // Debugging
    try {
        const { productId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        let cart = await Cart.findOne();

        if (!cart) {
            cart = new Cart({ products: []});
        }

        const existingProduct = cart.products.find(p => p.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

        await cart.save();

        const updatedCart = await Cart.findOne().populate("products.productId");

        res.json({ products: updatedCart.products });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
};