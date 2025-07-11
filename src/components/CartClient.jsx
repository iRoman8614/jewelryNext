"use client";

import { useEffect, useState, useRef } from "react";
import styles from '@/app/cart/cart.module.scss';

import CartItem from "@/components/CartItem/CartItem";
import ProductImageDisplay from "@/components/ProductImageDisplay/ProductImageDisplay";
import ConfirmForm from "@/components/ConfirmForm/ConfirmForm";
import NavBar from "@/components/NavBar/NavBar";
import { useLanguage } from "@/components/LanguageProvider/LanguageProvider";
import { useCart } from "@/components/CartProvider/CartProvider";

const IMG_WIDTH = 100;
const IMG_HEIGHT = 100;

export default function CartClient({ navigation, checkoutOptions }) {
    const { lang } = useLanguage();
    const { cartItems: itemsFromProvider, removeFromCart, updateQuantity } = useCart();

    const [detailedCartItems, setDetailedCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [imagePositions, setImagePositions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const imagePanelRef = useRef(null);
    const [panelWidth, setPanelWidth] = useState(300);

    useEffect(() => {
        const fetchCartDetails = async () => {
            if (itemsFromProvider.length === 0) {
                setDetailedCartItems([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const requestBody = {
                    items: itemsFromProvider.map(item => ({ productId: item.productId }))
                };

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkout/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                });

                if (!res.ok) {
                    throw new Error('Не удалось загрузить данные корзины');
                }

                const productsFromApi = await res.json();
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

                const enrichedItems = productsFromApi.map(product => {
                    const itemInCart = itemsFromProvider.find(p => p.productId === product.id);
                    return {
                        ...product,
                        quantity: itemInCart ? itemInCart.quantity : 0,
                        imageUrl: `${baseUrl}${product.image}`
                    };
                }).filter(item => item.quantity > 0);

                setDetailedCartItems(enrichedItems);

            } catch (err) {
                console.error("Ошибка при получении данных корзины:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartDetails();
    }, [itemsFromProvider]);

    // useEffect(() => {
    //     if (imagePanelRef.current) {
    //         const observer = new ResizeObserver(entries => {
    //             setPanelWidth(entries[0].contentRect.width);
    //         });
    //         observer.observe(imagePanelRef.current);
    //         return () => observer.disconnect();
    //     }
    // }, []);

    useEffect(() => {
        if (detailedCartItems.length === 0 || panelWidth === 0) {
            setImagePositions([]);
            return;
        }

        const newPositions = [];
        let currentY = 0;

        detailedCartItems.forEach((item, index) => {
            const maxLeft = panelWidth - IMG_WIDTH - 10;
            const left = Math.random() * panelWidth;
            const top = currentY;

            newPositions.push({
                id: item.id,
                imageUrl: item.imageUrl,
                top: `${top}px`,
                left: `${left}px`,
                width: `${IMG_WIDTH}px`,
                height: `${IMG_HEIGHT}px`,
            });

            if (index < detailedCartItems.length - 1) {
                const MIN_VERTICAL_STEP = 90;
                const MAX_VERTICAL_STEP = IMG_HEIGHT - 70;
                let stepForNextImage = MIN_VERTICAL_STEP + Math.random() * (MAX_VERTICAL_STEP - MIN_VERTICAL_STEP);
                currentY += stepForNextImage;
            }
        });

        setImagePositions(newPositions);

    }, [detailedCartItems, panelWidth]);

    const handleFormShow = (state) => {
        setShowForm(state);
    };

    const totalSum = detailedCartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    if (isLoading) {
        return (
            <>
                <NavBar theme={'black'} navigation={navigation} />
                <div className={styles.loadingState}>Загрузка товаров...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar theme={'black'} navigation={navigation} />
                <div className={styles.errorState}>Ошибка: {error}</div>
            </>
        )
    }

    return (
        <>
            <NavBar theme={'black'} navigation={navigation} />
            <section className={styles.root}>
                <div className={styles.title}>{lang === 'ru' ? 'Корзина' : 'Cart'}</div>
                <div className={styles.content}>
                    <div className={styles.leftPanel} ref={imagePanelRef}>
                        {imagePositions.length > 0 ? (
                            <ProductImageDisplay imagePositions={imagePositions} />
                        ) : (
                            <div className={styles.emptyImagesPlaceholder}>Нет товаров для отображения</div>
                        )}
                    </div>
                    <div className={styles.rightPanel}>
                        {detailedCartItems.length > 0 ? (
                            detailedCartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onRemove={() => removeFromCart(item.id)}
                                    onQuantityChange={updateQuantity}
                                />
                            ))
                        ) : (
                            <p className={styles.emptyCartMessage}>{lang === 'ru' ? 'Ваша корзина пуста' : 'Cart is empty'}.</p>
                        )}
                    </div>
                </div>
                {detailedCartItems.length > 0 && (
                    <>
                        <div className={styles.cartBottom}>
                            <div>{lang === 'ru' ? 'итого' : 'Sum'}</div>
                            <div>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(totalSum)}</div>
                        </div>
                        <div className={styles.button} onClick={() => handleFormShow(true)}>{lang === 'ru' ? 'Купить' : 'Buy'}</div>
                    </>
                )}

                {showForm &&
                    <div className={styles.formContainer}>
                        <ConfirmForm
                            cartItems={detailedCartItems}
                            action={() => handleFormShow(false)}
                            checkoutOptions={checkoutOptions}
                        />
                    </div>
                }
            </section>
            <section className={styles.rootMobile}>
                <ConfirmForm
                    cartItems={detailedCartItems}
                    action={() => handleFormShow(false)}
                    checkoutOptions={checkoutOptions}
                />
            </section>
        </>
    );
}