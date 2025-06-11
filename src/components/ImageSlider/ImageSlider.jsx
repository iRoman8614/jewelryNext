"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageSlider.module.scss';

const PrevArrow = ({ onClick }) => (
    <button onClick={onClick} className={`${styles.arrow} ${styles.prevArrow}`}>‹</button>
);

const NextArrow = ({ onClick }) => (
    <button onClick={onClick} className={`${styles.arrow} ${styles.nextArrow}`}>›</button>
);

export default function ImageSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        if (images.length > 1) {
            const timer = setTimeout(goToNext, 5000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, images]);

    if (!images || images.length === 0) {
        return <div className={styles.sliderContainer}>Нет изображений.</div>;
    }

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.slideWrapper}>
                <Image
                    key={currentIndex}
                    src={images[currentIndex].url}
                    alt={images[currentIndex].alt}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            {images.length > 1 && (
                <>
                    <PrevArrow onClick={goToPrevious} />
                    <NextArrow onClick={goToNext} />
                    <div className={styles.dotsContainer}>
                        {images.map((_, slideIndex) => (
                            <div
                                key={slideIndex}
                                className={`${styles.dot} ${currentIndex === slideIndex ? styles.activeDot : ''}`}
                                onClick={() => goToSlide(slideIndex)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}