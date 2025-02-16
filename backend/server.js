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

const FRONTEND_BASE_URL =
    process.env.NODE_ENV === "production"
        ? process.env.PROD_FRONTEND_BASE_URL
        : process.env.DEV_FRONTEND_BASE_URL;


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const corsOptions = {
    origin: FRONTEND_BASE_URL,
    credential: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use("/images", express.static(path.join(__dirname, "../frontend/assets/images")));


app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/cartRoutes"));

app.get("/", (req, res) => {
    try {
        // res.json({ baseUrl: BASE_URL });
        console.log(`FRONTEND_BASE_URL: ${FRONTEND_BASE_URL}`)
    } catch (error)  {
        // console.error(`Error loading baseUrl ${error}`);
        res.status(500).send("Error loading baseUrl");
    }
});

app.get("/products", async (req, res) => {
    console.log("app.get(\"/products\"");
    try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const products = await response.json();
        res.render("index", { products,
            // baseUrl: BASE_URL,
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
            // baseUrl: BASE_URL,
        });
    } catch (error) {
        res.status(500).send("Error loading cart");
    }
});

app.get("/cart/count", async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/api/cart/count`);
        const cartData = await response.json();

        // console.log(`cartData: ${JSON.stringify(cartData, null, 2)}`);
        // const cartItems = Array.isArray(cartData.products) ? cartData.products : [];
        // const cartItems = Array.isArray(cartData) ? cartData : [];
        cartCount = cartData.count
        res.render("cart", {
            cartCount,
            // baseUrl: BASE_URL, b
        });
    } catch (error) {
        res.status(500).send("Error loading cart");
    }
});

// app.use("/api", require)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));