"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useCart } from '@/components/CartProvider/CartProvider';
import { useLanguage } from "@/components/LanguageProvider/LanguageProvider";
import styles from './styles.module.scss';

// Длительность анимации свайпа. Раньше был Swiper (библиотека) — из-за
// slidesPerView="auto" в паре с асинхронной загрузкой картинок next/image он
// то не долистывал до конца, то стрелка "вправо" не срабатывала вовсе.
// Заменили на свою простую и полностью предсказуемую реализацию: ряд
// картинок в flex-контейнере, сдвигаем его через CSS transform с фиксированной
// длительностью — без сторонних измерений и скрытой логики.
const SLIDE_DURATION_MS = 2000;
const AUTOPLAY_DELAY_MS = 5000;

export default function ProductView({ product }) {
    const { lang } = useLanguage();
    const router = useRouter();

    const { cartItems, addToCart, removeFromCart } = useCart();

    const itemInCart = cartItems.find(item => item.productId === product.id);
    const isInCart = !!itemInCart;

    const images = product.images || [];
    const hasMultipleImages = images.length > 1;

    // Для бесшовной бесконечной прокрутки дублируем крайние картинки по краям:
    // [клон последней, ...все настоящие, клон первой]. Реальная картинка #0
    // соответствует индексу 1 в этом расширенном списке.
    const extendedImages = hasMultipleImages
        ? [images[images.length - 1], ...images, images[0]]
        : images;

    const [trackIndex, setTrackIndex] = useState(hasMultipleImages ? 1 : 0);
    const [withTransition, setWithTransition] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slotWidth, setSlotWidth] = useState(0);

    const trackRef = useRef(null);
    const firstRealSlideRef = useRef(null);

    // Замеряем реальную ширину слайда + отступ между слайдами (gap в CSS).
    // useLayoutEffect — чтобы успеть выставить правильную позицию ДО отрисовки
    // кадра в браузере (без этого на долю секунды мелькнул бы клон последней
    // картинки вместо первой настоящей).
    useLayoutEffect(() => {
        const measure = () => {
            if (!firstRealSlideRef.current || !trackRef.current) return;
            const rect = firstRealSlideRef.current.getBoundingClientRect();
            const gapPx = parseFloat(getComputedStyle(trackRef.current).columnGap || '0') || 780;
            setSlotWidth(rect.width + gapPx);
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [images.length]);

    const goTo = useCallback((direction) => {
        if (isAnimating || !hasMultipleImages || slotWidth === 0) return;
        setIsAnimating(true);
        setWithTransition(true);
        setTrackIndex(prev => prev + (direction === 'next' ? 1 : -1));
    }, [isAnimating, hasMultipleImages, slotWidth]);

    const handlePrev = () => goTo('prev');
    const handleNext = () => goTo('next');

    // Автопрокрутка каждые 5 секунд.
    useEffect(() => {
        if (!hasMultipleImages) return;
        const id = setInterval(() => goTo('next'), AUTOPLAY_DELAY_MS);
        return () => clearInterval(id);
    }, [goTo, hasMultipleImages]);

    // По завершении анимации: если уехали на клон в начале/конце списка —
    // мгновенно (без transition, незаметно для глаза — картинка та же самая)
    // перескакиваем на соответствующую настоящую позицию, чтобы можно было
    // листать бесконечно в любую сторону.
    const handleTransitionEnd = () => {
        setIsAnimating(false);
        if (!hasMultipleImages) return;
        if (trackIndex === 0) {
            setWithTransition(false);
            setTrackIndex(images.length);
        } else if (trackIndex === extendedImages.length - 1) {
            setWithTransition(false);
            setTrackIndex(1);
        }
    };

    const handleBackClick = () => router.back();
    const handleAddToCartClick = () => addToCart(product.id);
    const handleRemoveFromCartClick = () => removeFromCart(product.id);

    const formatMultilineText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>));
    };

    const trackStyle = {
        transform: `translateX(-${trackIndex * slotWidth}px)`,
        transition: withTransition ? `transform ${SLIDE_DURATION_MS}ms ease` : 'none',
    };

    return (
        <>
            <div className={styles.productDetailPage}>
                <div className={styles.header}>
                    <h2 className={styles.creature}>{product.collection?.[lang]}</h2>
                    <h1 className={styles.productName}>{product.name?.[lang]}</h1>
                </div>
                <div className={styles.productViewContainer}>
                    <div className={styles.productInfoOverlay}>
                        <div className={styles.productSpecs}>
                            {product.details.size.value !== '' && <>
                                <div className={styles.specItemSizeLabel}>
                                    {product.details.size.label?.[lang]}
                                </div>
                                <div className={styles.specItemSizeValue}>
                                    {product.details.size.value}
                                </div>
                            </>}
                            {product.details.weight.value !== '' && <>
                                <div className={styles.specItemWightLabel}>
                                    {product.details.weight.label?.[lang]}
                                </div>
                                <div className={styles.specItemWightValue}>
                                    {product.details.weight.value}
                                </div>
                            </>}
                            {product.details.material.value?.[lang] !== '' && <>
                                <div className={styles.specItemMaterialLabel}>
                                    {product.details.material.label?.[lang]}
                                </div>
                                <div className={styles.specItemMaterialValue}>
                                    {formatMultilineText(product.details.material.value?.[lang])}
                                </div>
                            </>}
                            <div className={styles.specItemPriceLabel}>
                                <div>{product.details.price.label?.[lang]}</div>
                            </div>
                            <div className={styles.specItemPriceValue}>
                                {product.details.price.value}
                            </div>
                        </div>
                    </div>
                    {product.isVisible && <div className={styles.cartControl}>
                        {!isInCart ? (
                            <button className={styles.addToCartButton} onClick={handleAddToCartClick}>
                                <Image
                                    className={styles.addToCartIcon}
                                    src={'/images/addBtn.svg'}
                                    alt={''}
                                    width={50}
                                    height={50}
                                />
                                {lang === 'ru' ? "ДОБАВИТЬ" : "ADD"}
                            </button>
                        ) : (
                            <button className={styles.addToCartButton} onClick={handleRemoveFromCartClick}>
                                <Image
                                    className={styles.removeFromCartIcon}
                                    src={'/images/addBtn.svg'}
                                    alt={''}
                                    width={50}
                                    height={50}
                                />
                                {lang === 'ru' ? "в корзине" : "in cart"}
                            </button>
                        )}
                    </div>}
                </div>

                <div className={`${styles.customSwiperButton} ${styles.customSwiperButtonPrev}`} onClick={handlePrev}>
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </div>
                <div className={styles.swiperLayer}>
                    <div
                        ref={trackRef}
                        className={styles.productSwiper}
                        style={trackStyle}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extendedImages.map((image, index) => (
                            <div
                                key={index}
                                className={styles.productSlide}
                                ref={index === 1 ? firstRealSlideRef : undefined}
                            >
                                <div className={styles.slideImageWrapper}>
                                    <Image
                                        src={image}
                                        alt={`${product.name} - изображение ${index + 1}`}
                                        width={355}
                                        height={530}
                                        style={{ objectFit: 'cover' }}
                                        priority={index === 1}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${styles.customSwiperButton} ${styles.customSwiperButtonNext}`} onClick={handleNext}>
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </div>
            </div>
            <div onClick={handleBackClick} className={styles.backButton}>{lang === 'ru' ? "НАЗАД" : "BACK"}</div>
        </>
    );
}