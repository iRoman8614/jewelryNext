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

    const handleRemoveFromCart = () => {
        const newQuantity = 0;
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
        <>
            <div className={styles.productDetailPage}>
                <div className={styles.header}>
                    <h2 className={styles.creature}>{product.collection?.[lang]}</h2>
                    <h1 className={styles.productName}>{product.name?.[lang]}</h1>
                </div>
                <div className={styles.productViewContainer}>
                    <div className={styles.productInfoOverlay}>
                        <div className={styles.productSpecs}>
                            <div className={styles.specItemSizeLabel}>
                                {product.details.size.label?.[lang]}
                            </div>
                            <div className={styles.specItemSizeValue}>
                                {product.details.size.value}
                            </div>
                            <div className={styles.specItemWightLabel}>
                                {product.details.weight.label?.[lang]}
                            </div>
                            <div className={styles.specItemWightValue}>
                                {product.details.weight.value}
                            </div>
                            <div className={styles.specItemMaterialLabel}>
                                {product.details.material.label?.[lang]}
                            </div>
                            <div className={styles.specItemMaterialValue}>
                                {formatMultilineText(product.details.material.value?.[lang])}
                            </div>
                            <div className={styles.specItemPriceLabel}>
                                <div>{product.details.price.label?.[lang]}</div>
                            </div>
                            <div className={styles.specItemPriceValue}>
                                {product.details.price.value}
                            </div>
                        </div>
                    </div>
                    <div className={styles.cartControl}>
                        {itemQuantity === 0 ? (
                            <button className={styles.addToCartButton} onClick={handleAddToCart}>
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
                            <button className={styles.addToCartButton} onClick={handleRemoveFromCart}>
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
                    </div>
                </div>


                <div className={`${styles.customSwiperButton} ${styles.customSwiperButtonPrev}`} onClick={handlePrev}>
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </div>
                <div className={styles.swiperLayer}>
                    <Swiper
                        ref={swiperRef}
                        modules={[A11y]}
                        slidesPerView={2}
                        spaceBetween={780}
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
                <div className={`${styles.customSwiperButton} ${styles.customSwiperButtonNext}`} onClick={handleNext}>
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </div>
            </div>
            <div onClick={handleBackClick} className={styles.backButton}>{lang === 'ru' ? "НАЗАД" : "BACK"}</div>
        </>
    );
}