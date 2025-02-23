import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Cart = () => {
    const { apiBaseUrl, fetchCartCount, loading } = useContext(AppContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/cart`);
                const data = await response.json();
                setCartItems(data.products || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, [apiBaseUrl]);

    const removeFromCart = async (productId) => {
        try {
            await fetch(`${apiBaseUrl}/api/cart/remove`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json " },
                body: JSON.stringify({ productId }),
            });

            setCartItems(prev => prev.filter(item => item.product.id !== productId));
            fetchCartCount();
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    if (loading) return <div className="text-center py-5">Loading...</div>

    return (
        <div className="py-4">
            <h1 className="text-center mb-5 fw-light">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-musted">Your cart is empty</p>
            ) : (
                <>
                    <div className="row g-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="col-12">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body d-flex align-items-center">
                                        <img src={item.product.image} alt={item.product.name} className="me-3" style={{ width: "80px" }} />
                                        <div className="flex-grow-1">
                                            <h5 className="mb-1 fw-normal">{item.product.name}</h5>
                                            <p className="mb-1 small text-muted">Quantity: {item.quantity}</p>
                                            <p className="mb-0 fw-bold">${item.subtotal.toFixed(2)}</p>
                                        </div>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFromCart(item.product.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>


                        ))}
                    </div>
                    <div className="bt-4 text-end">
                        <h4 className="fw-light">Total: <span className="fw-bold">${total.toFixed(2)}</span></h4>
                        <button className="btn btn-dark mt-2">Checkout</button>
                    </div>
                </>
            )}
        </div >
    );
};

export default Cart;