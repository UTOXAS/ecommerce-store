import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

// import { Link } from "react-router-dom";

const Home = () => {
    const { apiBaseUrl, fetchCartCount, loading } = useContext(AppContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [apiBaseUrl]);

    const addToCart = async (productId) => {
        try {
            fetch(`${apiBaseUrl}/api/cart/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });
            fetchCartCount();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="py-4">
            <h1 className="text-center mb-5 fw-light">Our Collection</h1>
            <div className="row g-4">
                {products.map((product) => (
                    <div key={product._id} className="col-md-4 col-sm-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title fw-normal">{product.name}</h5>
                                <p className="card-text text-muted small">{product.description}</p>
                                <div className="d-flex justify-content-between align-items.center">
                                    <span className="fw-bold">${product.price.toFixed(2)}</span>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => addToCart(product._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;