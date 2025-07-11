'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            setCartItems([]);
        }
    }, []);
    const saveCart = (newCart) => {
        setCartItems(newCart);
        try {
            localStorage.setItem('cart', JSON.stringify(newCart));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    };

    const addToCart = (productId) => {
        const existingItem = cartItems.find(item => item.productId === productId);
        let newCart;
        if (existingItem) {
            newCart = cartItems.map(item =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            newCart = [...cartItems, { productId, quantity: 1 }];
        }
        saveCart(newCart);
    };

    const removeFromCart = (productId) => {
        const newCart = cartItems.filter(item => item.productId !== productId);
        saveCart(newCart);
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            const newCart = cartItems.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            );
            saveCart(newCart);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}