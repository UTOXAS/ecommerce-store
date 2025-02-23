import React, { createContext, useState, useCallback } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

    const fetchCartCount = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiBaseUrl}/api/cart/count`);
            const data = await response.json();
            setCartCount(data.count || 0);
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
        } finally {
            setLoading(false);
        }
    }, [apiBaseUrl]);

    return (
        <AppContext.Provider value={{ cartCount, fetchCartCount, loading, apiBaseUrl }}>
            {children}
        </AppContext.Provider>
    );
};