import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

// import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    // const [baseUrl, setBaseUrl] = useState("");    
    const {fetchCartCount} = useContext(AppContext);

    useEffect(() => {
        const fetchBaseUrlAndProducts = async () => {
            try {
                const baseUrl = process.env.REACT_APP_DEV_BASE_URL;
                // console.log(`${baseUrl}/api/products`);
                // const configResponse = await fetch("/api/config");
                // const configData = await configResponse.json();
                // setBaseUrl(configData.baseUrl);

                const productResponse = await fetch(`${baseUrl}/api/products`);
                const productData = await productResponse.json();
                setProducts(productData);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
            
            // try {

            // } catch (error) {
            //     console.error("Error fetching products:", error);
            // }
        };

        fetchBaseUrlAndProducts();
    }, []);

    const addToCart = async(productId) => {
        try {
            const baseUrl = process.env.REACT_APP_DEV_BASE_URL;
            const response = await fetch(`${baseUrl}/api/cart/add` , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity: 1 }),
            });

            if (!response.ok) throw new Error("Failed to add to cart");

            fetchCartCount();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center my-4">Our Products</h1>
            <div className="row">
                {products.map((product) => (
                    
                    <div className="col-md-4" key={product._id}>
                        <div className="card mb-4">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price}</p>
                                {/* <Link to="/cart/add" className="btn btn-primary">Add to Cart</Link> */}
                                <button className="btn btn-primary" onClick={() => addToCart(product._id)}>
                                    Add to Cart
                                </button>
                            </div>
                            </div>
                            </div>
                ))}
            </div>
        </div>
    );
};

export default Home;