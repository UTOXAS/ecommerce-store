const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/product");
const Cart = require("../models/cart");

dotenv.config()

const BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

// Sample product data
const products = [
    {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        price: 49.99,
        category: "Electronics",
        image: '/images/placeholder_image.png',
    },
    {
        name: "Smartphone",
        description: "Latest model smartphone with OLED display and 128GB storage.",
        price: 699.99,
        category: "Electronics",
        image: '/images/placeholder_image.png',
    },
    {
        name: "Gaming Laptop",
        description: "Powerful gaming laptop with RTX 3070 GPU and 16GB RAM.",
        price: 1499.99,
        category: "Computers",
        image: '/images/placeholder_image.png',
    },
    {
        name: "Running Shoes",
        description: "Lightweight and comfortable running shoes for daily use.",
        price: 79.99,
        category: "Fashion",
        image: '/images/placeholder_image.png',
    },
];


const seedDatabase = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Cart.deleteMany();
        const insertedProducts = await Product.insertMany(products);
        console.log(`✅ Database Seeded Successfully! Added ${insertedProducts.length} products.`); mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

module.exports = seedDatabase;

if (require.main === module) {
    seedDatabase();
}