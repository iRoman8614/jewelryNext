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

    // Позиция корзины идентифицируется парой (productId, size).
    // size === null/undefined — безразмерный товар (старое поведение).
    const sameLine = (item, productId, size) =>
        item.productId === productId && (item.size ?? null) === (size ?? null);

    const addToCart = (productId, size = null) => {
        const existingItem = cartItems.find(item => sameLine(item, productId, size));
        let newCart;
        if (existingItem) {
            newCart = cartItems.map(item =>
                sameLine(item, productId, size) ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            newCart = [...cartItems, { productId, size: size ?? null, quantity: 1 }];
        }
        saveCart(newCart);
    };

    const removeFromCart = (productId, size = null) => {
        const newCart = cartItems.filter(item => !sameLine(item, productId, size));
        saveCart(newCart);
    };

    const updateQuantity = (productId, size, quantity) => {
        // Поддержка старой сигнатуры updateQuantity(productId, quantity).
        if (typeof quantity === 'undefined') {
            quantity = size;
            size = null;
        }
        if (quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            const newCart = cartItems.map(item =>
                sameLine(item, productId, size) ? { ...item, quantity } : item
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