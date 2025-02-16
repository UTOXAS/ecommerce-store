import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        try {
            const baseUrl = process.env.REACT_APP_DEV_BASE_URL;
            const cartCountResponse = await fetch(`${baseUrl}/api/cart/count`);
            const cartCountData = await cartCountResponse.json();
            // console.log(cartResponse);
            setCartCount(cartCountData.count || 0);
        } catch (error) {
            console.error("Error fetching cart count:" , error);
        }
    };

    return (
        <AppContext.Provider value={{ fetchCartCount, cartCount }}>
            {children}
        </AppContext.Provider>
    )
}