"use client";

import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useCart } from '@/components/CartProvider/CartProvider';
import { useLanguage } from "@/components/LanguageProvider/LanguageProvider";

import 'swiper/css';
import 'swiper/css/a11y';
import styles from './styles.module.scss';

export default function ProductView({ product }) {
    const { lang } = useLanguage();
    const router = useRouter();
    const swiperRef = useRef(null);

    const { cartItems, addToCart, removeFromCart } = useCart();

    const itemInCart = cartItems.find(item => item.productId === product.id);
    const isInCart = !!itemInCart;

    const formatMultilineText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>));
    };

    const handlePrev = () => swiperRef.current?.swiper?.slidePrev();
    const handleNext = () => swiperRef.current?.swiper?.slideNext();
    const handleBackClick = () => router.back();
    const handleAddToCartClick = () => addToCart(product.id);
    const handleRemoveFromCartClick = () => removeFromCart(product.id);

    // Свайп имеет смысл (и зацикливание, и автопрокрутка) только когда фото
    // больше одного.
    const hasMultipleImages = (product.images?.length || 0) > 1;

    // При slidesPerView="auto" Swiper замеряет реальную CSS-ширину слайдов
    // один раз при инициализации. Если в этот момент картинка (next/image)
    // ещё не отрисовалась, замер занижен — из-за этого слайд "доезжал" лишь
    // на пару десятков пикселей вместо полного слайда. Форсируем пересчёт
    // после монтирования и повторно после загрузки каждой картинки.
    useEffect(() => {
        const swiper = swiperRef.current?.swiper;
        if (!swiper) return;

        const update = () => swiper.update();
        update();
        const timeoutId = setTimeout(update, 300);

        const images = document.querySelectorAll(`.${styles.slideImageWrapper} img`);
        images.forEach(img => {
            if (!img.complete) img.addEventListener('load', update);
        });

        return () => {
            clearTimeout(timeoutId);
            images.forEach(img => img.removeEventListener('load', update));
        };
    }, [product.images]);

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
                    <Swiper
                        ref={swiperRef}
                        modules={[A11y, Autoplay]}
                        slidesPerView={"auto"}
                        spaceBetween={780}
                        loop={hasMultipleImages}
                        observer={true}
                        observeParents={true}
                        // Плавный сдвиг картинки под текстом за ~1.2с вместо мгновенной смены.
                        speed={1200}
                        autoplay={hasMultipleImages ? { delay: 5000, disableOnInteraction: false } : false}
                        centeredSlides={false}
                        className={styles.productSwiper}
                    >
                        {product.images.map((image, index) => (
                            <SwiperSlide key={index} className={styles.productSlide}>
                                <div className={styles.slideImageWrapper}>
                                    <Image src={image} alt={`${product.name} - изображение ${index + 1}`} width={355} height={530} style={{ objectFit: 'cover' }} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={`${styles.customSwiperButton} ${styles.customSwiperButtonNext}`} onClick={handleNext}>
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </div>
            </div>
            <div onClick={handleBackClick} className={styles.backButton}>{lang === 'ru' ? "НАЗАД" : "BACK"}</div>
        </>
    );
}