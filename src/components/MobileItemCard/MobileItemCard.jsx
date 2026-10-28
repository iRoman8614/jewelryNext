'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider/LanguageProvider";
import styles from './MobileItemCard.module.scss';
import { getProductById } from "@/lib/api";
import {useCart} from "@/components/CartProvider/CartProvider";
import { hasSizes, definedSizes } from "@/lib/sizes";

const arrow = '/images/arrow.svg';

const PrevArrow = ({ onClick }) => (
    <button onClick={onClick} className={`${styles.arrow} ${styles.prevArrow}`}>
        <Image src={arrow} alt={'Previous'} width={20} height={40} />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button onClick={onClick} className={`${styles.arrow} ${styles.nextArrow}`}>
        <Image src={arrow} alt={'Next'} width={20} height={40} />
    </button>
);

export const MobileItemCard = ({ id, click }) => {
    const { lang } = useLanguage();
    const { cartItems, addToCart, removeFromCart } = useCart();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [descOpen, setDescOpen] = useState(false);

    // Пока открыт попап — страница под ним не прокручивается.
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    // Размерный товар: выбор размера обязателен.
    const sized = hasSizes(product?.sizes);
    const sizeList = definedSizes(product?.sizes);
    const effectiveSize = sized ? selectedSize : null;

    const itemInCart = cartItems.find(item =>
        item.productId === Number(id) && (item.size ?? null) === (effectiveSize ?? null)
    );
    const isInCart = !!itemInCart;

    const handleAddToCartClick = () => {
        if (sized && !selectedSize) return;
        addToCart(Number(id), effectiveSize);
    };
    const handleRemoveFromCartClick = () => removeFromCart(Number(id), effectiveSize);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getProductById(id);
                if (data) {
                    setProduct(data);
                } else {
                    setError('Товар не найден.');
                }
            } catch (err) {
                setError('Ошибка при загрузке данных.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const goToPrevious = () => {
        if (!product || !product.images) return;
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? product.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        if (!product || !product.images) return;
        const isLastSlide = currentIndex === product.images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        if (product && product.images?.length > 1) {
            const timer = setTimeout(goToNext, 5000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, product]);

    // Описание из админки приходит с HTML-тегами (<p>… от редактора) —
    // убираем теги, абзацы превращаем в переносы (как в десктопной карточке).
    const descriptionText = (product?.description?.[lang] || '')
        .replace(/<\/p>\s*<p>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    const descriptionLong = descriptionText.length > 140 || descriptionText.split('\n').length > 3;

    const formatMultilineText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>));
    };

    if (isLoading) {
        return (
            <div className={styles.root}>
                <div className={styles.container}>
                    <div className={styles.loader}>Загрузка...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.root}>
                <div className={styles.clicker} onClick={click} />
                <div className={styles.container}>
                    <div className={styles.error}>{error}</div>
                </div>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className={styles.root}>
            <div className={styles.clicker} onClick={click} />
            <PrevArrow onClick={goToPrevious} />
            <div className={styles.container}>
                <div className={styles.slideWrapper}>
                    <Image
                        key={currentIndex}
                        src={product.images[currentIndex]}
                        alt={product.name?.[lang] || ''}
                        width={288}
                        height={370}
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                {/* Проданный товар (isVisible === false) — без кнопки покупки.
                    Размерный товар — кнопка активна только после выбора размера. */}
                {product.isVisible !== false && (!sized || selectedSize) && (
                    <div className={styles.productImageBlock}>
                        {!isInCart ? (
                            <Image src={'/images/basket.svg'} onClick={handleAddToCartClick} className={styles.busket} alt="add to cart" width={20} height={20} />
                        ):(
                            <Image src={'/images/BusketAdded.svg'} onClick={handleRemoveFromCartClick} className={styles.busket} alt="add to cart" width={20} height={20} />
                        )}
                        {/*<Image src={'/images/Heart.svg'} className={styles.heart} alt="add to favorites" width={20} height={20} />*/}
                    </div>
                )}
                <div className={styles.productSpecs}>
                    {sized ? (
                        <div className={styles.sizeRow}>
                            <span>{lang === 'ru' ? 'РАЗМЕР' : 'SIZE'}</span>
                            <div className={styles.sizeOptions}>
                                {sizeList.map((s) => {
                                    const inStock = Number(product.sizes[s]) > 0;
                                    const active = selectedSize === s;
                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            disabled={!inStock}
                                            className={`${styles.sizeOption} ${active ? styles.sizeOptionActive : ''} ${!inStock ? styles.sizeOptionDisabled : ''}`}
                                            onClick={() => inStock && setSelectedSize(s)}
                                        >
                                            {s}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.specItem}>
                            <span>{product.details.size.label?.[lang]}</span>
                            <span>{product.details.size.value}</span>
                        </div>
                    )}
                    <div className={styles.specItem}>
                        <span>{product.details.weight.label?.[lang]}</span>
                        <span>{product.details.weight.value}</span>
                    </div>
                    <div className={styles.specItem}>
                        <span>{product.details.material.label?.[lang]}</span>
                        <span className={styles.materialItem}>{formatMultilineText(product.details.material.value?.[lang])}</span>
                    </div>
                    <div className={`${styles.specItem} ${styles.priceItem}`}>
                        <span className={styles.priceLable}>{product.details.price.label?.[lang]}</span>
                        <span className={styles.priceValue}>{product.details.price.value}</span>
                    </div>
                    {descriptionText && (
                        <div className={styles.descriptionBlock}>
                            <div className={`${styles.description} ${descOpen ? styles.descriptionOpen : (descriptionLong ? styles.descriptionClamped : '')}`}>
                                {formatMultilineText(descriptionText)}
                            </div>
                            {descriptionLong && (
                                <button type="button" className={styles.descriptionToggle} onClick={() => setDescOpen((v) => !v)}>
                                    {descOpen
                                        ? (lang === 'ru' ? 'Свернуть' : 'Show less')
                                        : (lang === 'ru' ? 'Подробнее' : 'Read more')}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <NextArrow onClick={goToNext} />
            <div className={styles.footer}>
                <Image className={styles.hideArrow} src={arrow} alt={''} width={20} height={40} />
            </div>
        </div>
    );
};