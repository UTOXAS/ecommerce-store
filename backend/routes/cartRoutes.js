const express = require("express");
const router = express.Router();
const { getCart, addToCart, getCartCount, removeCartItem } = require("../controllers/cartController");

router.get("/cart", getCart);
router.get("/cart/count", getCartCount);
router.post("/cart/add", addToCart);
router.delete("/cart/remove", removeCartItem);

module.exports = router;