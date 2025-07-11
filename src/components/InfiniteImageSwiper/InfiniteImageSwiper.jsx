"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import {useLanguage} from "@/components/LanguageProvider/LanguageProvider";
import Link from "next/link";

export default function InfiniteImageSwiper({
                                                images = [],
                                                numVisibleInitial = 8,
                                                imageWidth = 80,
                                                imageHeight = 80,
                                                gap = 15
                                            }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const actualNumVisible = images.length > 0 ? Math.min(numVisibleInitial, images.length) : 0;

    const handlePrev = () => {
        if (images.length === 0 || images.length <= actualNumVisible) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        if (images.length === 0 || images.length <= actualNumVisible) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const displayedImages = useMemo(() => {
        if (!images || images.length === 0 || actualNumVisible === 0) {
            return [];
        }
        const result = [];
        for (let i = 0; i < actualNumVisible; i++) {
            const imageIdx = (currentIndex + i) % images.length;
            result.push({
                id: images[imageIdx].id,
                src: images[imageIdx].image,
                key: `swiper-img-slot-${i}-idx-${imageIdx}`
            });
        }
        return result;
    }, [images, currentIndex, actualNumVisible]);

    const canSwipe = images.length > actualNumVisible && actualNumVisible > 0;

    const { lang } = useLanguage();

    return (
        <div className={styles.swiperContainer}>
            <div className={styles.controlsAndImages}>
                <button
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={handlePrev}
                    disabled={!canSwipe}
                    aria-label="Previous images"
                >
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </button>
                <div
                    className={styles.imagesWrapper}
                    style={{ width: `${actualNumVisible * imageWidth + Math.max(0, actualNumVisible - 1) * gap}px` }}
                >
                    <div className={styles.imagesList} style={{ gap: `${gap}px` }}>
                        {displayedImages.map((imgData) => (
                            <Link href={`/item/${imgData.id}`} key={imgData.key} className={styles.imageItemWrapper} style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
                                <Image
                                    src={imgData.src}
                                    alt=""
                                    className={styles.imageItem}
                                    fill
                                    sizes={`${imageWidth}px`}
                                    style={{ objectFit: 'cover' }}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <button
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={handleNext}
                    disabled={!canSwipe}
                    aria-label="Next images"
                >
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </button>
            </div>
            <div className={styles.soldLabel}>{lang === 'ru' ? 'ПРОДАНО' : 'SOLD'}</div>
        </div>
    );
};