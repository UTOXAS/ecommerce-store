import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Header = () => {
    const { cartCount, fetchCartCount } = useContext(AppContext);
    useEffect(() => {
        fetchCartCount();
    }, [fetchCartCount]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">Storefront</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart {cartCount > 0 && (
                                    <span className="badge bg-light text-dark ms-1">{cartCount}</span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;