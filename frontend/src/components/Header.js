import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

const Header = () => {
    const {fetchCartCount, cartCount} = useContext(AppContext);

    useEffect(() => {
        // const fetchCartCount = async () => {
        //     try {
        //         const baseUrl = process.env.REACT_APP_DEV_BASE_URL;
        //         const cartCountResponse = await fetch(`${baseUrl}/api/cart/count`);
        //         const cartCountData = await cartCountResponse.json();
        //         // console.log(cartResponse);
        //         setCartCount(cartCountData.count || 0);
        //     } catch (error) {
        //         console.error("Error fetching cart count:" , error);
        //     }
        // };

        fetchCartCount();
    }, []);
    return (

        

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Storefront</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart <span className="badge bg-light text-dark">{cartCount}</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;