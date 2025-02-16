import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    // const [itemTotalPrice, setItemTotalPrice] = useState(0);
    const {fetchCartCount} = useContext(AppContext);
    // const [baseUrl, setBaseUrl] = useState("");

    useEffect(() => {
        const fetchBaseUrlAndCartItems = async () => {
            try {
                const baseUrl = process.env.REACT_APP_DEV_BASE_URL;
                // const configResponse = await fetch("/api/config");
                // const configData = await configResponse.json();
                // setBaseUrl(configData.baseUrl);

                const cartItems = await fetch(`${baseUrl}/api/cart`);
                const cartData = await cartItems.json();
                setCartItems(cartData.products || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } 
        };

        fetchBaseUrlAndCartItems();
    }, []);

    const removeFromCart = async(productId) => {
        try {
            const baseUrl = process.env.REACT_APP_DEV_BASE_URL;
            const response = await fetch(`${baseUrl}/api/cart/remove` , {
                method: "DELETE",
                headers: {"Content-Type": "application/json "},
                body: JSON.stringify({ productId }),
            });
            
            if (response.ok) {
                window.location.reload();
            } else {
                throw new Error("Failed to remove from cart");
            }
            // if (!response.ok) 
            fetchCartCount();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const calculateItemTotal = (item) => {
        return item.price * item.quantity;
    };

    const calculateTotalSum = () => {
        return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center my-4">Shopping Cart</h1>
            <div className="row">
                {cartItems.length === 0 ? (
                    <p className="text-center">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div className="col-md-12 cart-items" key={item.productId}>
                            <div className="card mb-3">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                                        <p className="card-text">Quantity: <strong>{item.quantity}</strong></p>
                                        <p className="card-text"><strong>Total: {calculateItemTotal(item).toFixed(2)}</strong></p>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item.productId)}>
                                            Remove
                                        </button>
                                    </div>
                                    <img src={item.image} alt={item.name} className="img-fluid rounded" />
                                </div>
                                </div>
                                </div>

                    ))
                    
                )}
                                                <div className="text-end">
                                    <h4>Total Price: <strong>{calculateTotalSum().toFixed(2)}</strong></h4>
                                    </div>
            </div>
        </div>
    );
};

export default Cart;