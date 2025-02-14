const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/product");
const Cart = require("../models/cart");

dotenv.config()

const BASE_URL = 
    process.env.NODE_ENV === "production"
        ? process.env.PROD_BASE_URL
        : process.env.DEV_BASE_URL;

// Sample product data
const products = [
    {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        price: 49.99,
        category: "Electronics",
        stock: 100,
        image: `${BASE_URL}/images/placeholder_image.png`,
    },
    {
        name: "Smartphone",
        description: "Latest model smartphone with OLED display and 128GB storage.",
        price: 699.99,
        category: "Electronics",
        stock: 50,
        image: `${BASE_URL}/images/placeholder_image.png`,
    },
    {
        name: "Gaming Laptop",
        description: "Powerful gaming laptop with RTX 3070 GPU and 16GB RAM.",
        price: 1499.99,
        category: "Computers",
        stock: 30,
        image: `${BASE_URL}/images/placeholder_image.png`,
    },
    {
        name: "Running Shoes",
        description: "Lightweight and comfortable running shoes for daily use.",
        price: 79.99,
        category: "Fashion",
        stock: 200,
        image: `${BASE_URL}/images/placeholder_image.png`,
    },
];


const seedDatabase = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Cart.deleteMany();
        await Product.insertMany(products);
        console.log("✅ Database Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
        mongoose.connection.close();
    }
};

seedDatabase();