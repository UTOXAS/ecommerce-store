const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const BASE_URL = 
    process.env.NODE_ENV === "production"
        ? process.env.PROD_BASE_URL
        : process.env.DEV_BASE_URL;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use("/images", express.static(path.join(__dirname, "../frontend/assets/images")));


app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/cartRoutes"));

app.get("/", async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const products = await response.json();
        res.render("index", { products,
            baseUrl: BASE_URL,
         });
    } catch (error) {
        res.status(500).send(`Error loading products\n${error}`);
        // console.error(`Error: `);
    }
});

app.get("/cart", async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/api/cart`);
        const cartData = await response.json();

        console.log(`cartData: ${JSON.stringify(cartData, null, 2)}`);
        const cartItems = Array.isArray(cartData.products) ? cartData.products : [];
        // const cartItems = Array.isArray(cartData) ? cartData : [];
        res.render("cart", {
            cartItems ,
            baseUrl: BASE_URL,
        });
    } catch (error) {
        res.status(500).send("Error loading cart");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));