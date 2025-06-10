"use client";

import { useEffect, useState, useRef } from "react";
import styles from './cart.module.scss';

import CartItem from "@/components/CartItem/CartItem";
import ProductImageDisplay from "@/components/ProductImageDisplay/ProductImageDisplay";
import ConfirmForm from "@/components/ConfirmForm/ConfirmForm";
import { MOCK_CART_ITEMS } from "@/lib/cart.data.js";
import NavBar from "@/components/NavBar/NavBar";

const IMG_WIDTH = 140;
const IMG_HEIGHT = 140;

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [imagePositions, setImagePositions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const imagePanelRef = useRef(null);
    const [panelWidth, setPanelWidth] = useState(0);

    useEffect(() => {
        if (imagePanelRef.current) {
            const observer = new ResizeObserver(entries => {
                setPanelWidth(entries[0].contentRect.width);
            });
            observer.observe(imagePanelRef.current);

            return () => observer.disconnect();
        }
    }, []);

    useEffect(() => {
        if (cartItems.length === 0 || panelWidth === 0) {
            setImagePositions([]);
            return;
        }

        const newPositions = [];
        let currentY = 10;

        cartItems.forEach((item, index) => {
            const maxLeft = panelWidth > IMG_WIDTH ? panelWidth - IMG_WIDTH - 10 : 0;
            const left = Math.random() * maxLeft;
            const top = currentY;

            newPositions.push({
                id: item.id,
                imageUrl: item.imageUrl,
                top: `${top}px`,
                left: `${left}px`,
                width: `${IMG_WIDTH}px`,
                height: `${IMG_HEIGHT}px`,
            });

            if (index < cartItems.length - 1) {
                const MIN_VERTICAL_STEP = 90;
                const MAX_VERTICAL_STEP = IMG_HEIGHT - 10;
                let stepForNextImage = MIN_VERTICAL_STEP + Math.random() * (MAX_VERTICAL_STEP - MIN_VERTICAL_STEP);
                currentY += stepForNextImage;
            }
        });
        setImagePositions(newPositions);
    }, [cartItems, panelWidth]);

    useEffect(() => {
        setCartItems(MOCK_CART_ITEMS);
    }, []);

    const handleRemoveItem = (itemIdToRemove) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemIdToRemove));
    };

    const handleFormShow = (state) => {
        setShowForm(state);
    };

    return (
        <>
            <NavBar theme={'black'} />
            <section className={styles.root}>
                <div className={styles.title}>Корзина</div>
                <div className={styles.content}>
                    <div className={styles.leftPanel} ref={imagePanelRef}>
                        {imagePositions.length > 0 ? (
                            <ProductImageDisplay imagePositions={imagePositions} />
                        ) : (
                            <div className={styles.emptyImagesPlaceholder}>Нет товаров для отображения</div>
                        )}
                    </div>
                    <div className={styles.rightPanel}>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemoveItem}
                                />
                            ))
                        ) : (
                            <p className={styles.emptyCartMessage}>Ваша корзина пуста.</p>
                        )}
                    </div>
                </div>
                <div className={styles.cartBottom}>
                    <div>итого</div>
                    <div>sum</div>
                </div>
                <div className={styles.button} onClick={() => handleFormShow(true)}>Купить</div>

                {showForm &&
                    <div className={styles.formContainer}>
                        <ConfirmForm
                            cartItems={cartItems}
                            action={() => handleFormShow(false)}
                        />
                    </div>
                }
            </section>
        </>
    );
}