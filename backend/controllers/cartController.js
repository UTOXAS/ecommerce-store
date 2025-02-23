const Cart = require("../models/cart");

class CartController {
    static async getCart(req, res) {
        try {
            const cart = await Cart.findOne().populate("products.productId");
            if (!cart) return res.status(200).json({ products: [] });

            const cartItems = cart.products.map(item => ({
                id: item._id,
                product: {
                    id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    image: item.productId.image,
                },
                quantity: item.quantity,
                subtotal: item.quantity * item.productId.price
            }));

            res.status(200).json({ products: cartItems, total: cartItems.reduce((sum, item) => sum + item.subtotal, 0) });
        } catch (error) {
            res.status(500).json({ message: "Error fetching cart", error: error.message });
        }
    }

    static async addToCart(req, res) {
        try {
            const { productId, quantity = 1 } = req.body;
            if (!productId) return res.status(400).json({ message: "Product ID is required" });

            let cart = await Cart.findOne();
            if (!cart) cart = new Cart({ products: [] });

            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }

            await cart.save();
            const updatedCart = await Cart.findOne().populate("products.productId");
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: "Error adding to cart", error: error.message });
        }
    }


    static async removeCartItem(req, res) {
        try {
            const { productId } = req.body;
            if (!productId) return res.status(400).json({ message: "Product ID is required" });

            const cart = await Cart.findOne();
            if (!cart) return res.status(404).json({ message: "Cart not found" });

            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex === -1) {
                return res.status(404).json({ message: "Product not found in cart" });
            }

            cart.products.splice(productIndex, 1);
            await cart.save();

            const updatedCart = await Cart.findOne().populate("products.productId");
            const cartItems = updatedCart ? updatedCart.products.map(item => ({
                id: item._id,
                product: {
                    id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    image: item.productId.image,
                },
                quantity: item.quantity,
                subtotal: item.quantity * item.productId.price
            })) : [];

            res.status(200).json({
                message: "Item removed successfully",
                products: cartItems,
                total: cartItems.reduce((sum, item) => sum + item.subtotal, 0)
            });
        } catch (error) {
            res.status(500).json({ message: "Error removing item from cart", error: error.message });
        }
    }

    static async getCartCount(rea, res) {
        try {
            const cart = await Cart.findOne();

            if (!cart) return res.status(200).json({ count: 0 });
            const totalCount = cart.products.reduce((sum, item) => sum + item.quantity, 0);

            res.status(200).json({ count: totalCount });
        } catch (error) {
            res.status(500).json({ message: "Error fetching cart count", error: error.message });
        }
    }

}

module.exports = CartController;