"use client";

import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/a11y';
import styles from './styles.module.scss';
import {useLanguage} from "@/components/LanguageProvider/LanguageProvider";
import {useRouter} from "next/navigation";

export default function ProductView({ product }) {
    const { lang } = useLanguage();
    const router = useRouter();
    const swiperRef = useRef(null);
    const [itemQuantity, setItemQuantity] = useState(0);
    const cookieName = `item_${product.id}`;

    useEffect(() => {
        const quantityFromCookie = parseInt(Cookies.get(cookieName) || '0', 10);
        setItemQuantity(quantityFromCookie);
    }, [cookieName]);

    const formatMultilineText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>));
    };

    const handlePrev = () => swiperRef.current?.swiper?.slidePrev();
    const handleNext = () => swiperRef.current?.swiper?.slideNext();

    const handleAddToCart = () => {
        const newQuantity = 1;
        Cookies.set(cookieName, newQuantity.toString(), { expires: 7 });
        setItemQuantity(newQuantity);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = itemQuantity + 1;
        Cookies.set(cookieName, newQuantity.toString(), { expires: 7 });
        setItemQuantity(newQuantity);
    };

    const handleDecreaseQuantity = () => {
        if (itemQuantity <= 0) return;
        const newQuantity = itemQuantity - 1;
        if (newQuantity === 0) {
            Cookies.remove(cookieName);
        } else {
            Cookies.set(cookieName, newQuantity.toString(), { expires: 7 });
        }
        setItemQuantity(newQuantity);
    };

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className={styles.productDetailPage}>
            <div className={`${styles.customSwiperButton} ${styles.customSwiperButtonPrev}`} onClick={handlePrev}></div>
            <div className={styles.swiperLayer}>
                <Swiper
                    ref={swiperRef}
                    modules={[A11y]}
                    slidesPerView={2}
                    spaceBetween={630}
                    loop={true}
                    centeredSlides={false}
                    className={styles.productSwiper}
                >
                    {product.images.map((image, index) => (
                        <SwiperSlide key={index} className={styles.productSlide}>
                            <div className={styles.slideImageWrapper}>
                                <Image src={image} alt={`${product.name} - изображение ${index + 1}`} width={355} height={530} style={{ objectFit: 'contain' }} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.productViewContainer}>
                <div className={styles.header}>
                    <h2 className={styles.creature}>{product.collection?.[lang]}</h2>
                    <h1 className={styles.productName}>{product.name?.[lang]}</h1>
                </div>
                <div className={styles.productInfoOverlay}>
                    <div className={styles.productInfoContent}>
                        <div className={styles.productSpecs}>
                            <div className={styles.specItemSize}><span>{product.details.size.label?.[lang]}</span><span>{product.details.size.value}</span></div>
                            <div className={styles.specItemWight}><span>{product.details.weight.label?.[lang]}</span><span>{product.details.weight.value}</span></div>
                            <div className={`${styles.specItemMaterial} ${styles.materialItem}`}><span>{product.details.material.label?.[lang]}</span><span>{formatMultilineText(product.details.material.value?.[lang])}</span></div>
                            <div className={`${styles.specItem} ${styles.priceItem}`}>
                                <span className={styles.priceLable}>{product.details.price.label?.[lang]}</span>
                                <span className={styles.priceValue}>{product.details.price.value}</span>
                                <div className={styles.cartControl}>
                                    {itemQuantity === 0 ? (
                                        <button className={styles.addToCartButton} onClick={handleAddToCart}>
                                            <span className={styles.addToCartIcon}></span>
                                            {lang === 'ru' ? "ДОБАВИТЬ" : "ADD"}
                                        </button>
                                    ) : (
                                        <div className={styles.quantityControl}>
                                            <button className={`${styles.quantityButton} ${styles.quantityButtonMinus}`} onClick={handleDecreaseQuantity}>-</button>
                                            <span className={styles.quantityDisplay}>{itemQuantity}</span>
                                            <button className={`${styles.quantityButton} ${styles.quantityButtonPlus}`} onClick={handleIncreaseQuantity}>+</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleBackClick} className={styles.backButton}>{lang === 'ru' ? "НАЗАД" : "BACK"}</div>
                </div>
            </div>
            <div className={`${styles.customSwiperButton} ${styles.customSwiperButtonNext}`} onClick={handleNext}></div>
        </div>
    );
}