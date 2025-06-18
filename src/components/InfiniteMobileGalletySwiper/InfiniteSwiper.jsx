"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import Image from 'next/image';
import styles from './InfiniteSwiper.module.scss';

// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductSwiper({ images = [] }) {
    if (images.length === 0) {
        return <div className={styles.loader}>Загрузка изображений...</div>;
    }

    return (
        <div className={styles.swiperContainer}>
            <Swiper
                modules={[Navigation, A11y]}
                className={styles.productSwiper}
                slidesPerView={1.3}
                spaceBetween={15}
                centeredSlides={true}
                loop={true}
                grabCursor={true}
                navigation={{
                    nextEl: `.${styles.nextArrow}`,
                    prevEl: `.${styles.prevArrow}`,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
            >
                {images.map((imageSrc, index) => (
                    <SwiperSlide key={index} className={styles.productSlide}>
                        {({ isActive }) => (
                            <div className={`${styles.slideContent} ${isActive ? styles.slideActive : ''}`}>
                                <Image
                                    src={imageSrc}
                                    alt={`Изображение товара ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={`${styles.navArrow} ${styles.prevArrow}`} aria-label="Previous slide"></div>
            <div className={`${styles.navArrow} ${styles.nextArrow}`} aria-label="Next slide"></div>
        </div>
    );
}