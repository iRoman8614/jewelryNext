'use client'
import styles from './MobileItemCard.module.scss'
import {getProductById} from "@/lib/products.data";
import {notFound} from "next/navigation";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useLanguage} from "@/components/LanguageProvider/LanguageProvider";

const arrow = '/images/arrow.svg'

const PrevArrow = ({ onClick }) => (
    <button onClick={onClick} className={`${styles.arrow} ${styles.prevArrow}`}>
        <Image src={arrow} alt={''} width={20} height={40} />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button onClick={onClick} className={`${styles.arrow} ${styles.nextArrow}`}>
        <Image src={arrow} alt={''} width={20} height={40} />
    </button>
);

export const MobileItemCard = ({id, click}) => {
    const { lang } = useLanguage();
    console.log("id", id)
    const product = getProductById(id);
    console.log('product', product)

    // if (!product) {
    //     notFound();
    // }

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? product.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === product.images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const formatMultilineText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>));
    };

    useEffect(() => {
        if (product.images.length > 1) {
            const timer = setTimeout(goToNext, 5000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    if (!product || product.images.length === 0) {
        return <div className={styles.sliderContainer}>Нет изображений.</div>;
    }


    return(
        <div className={styles.root}>
            <div className={styles.row}>
                <PrevArrow onClick={goToPrevious} />
                <div className={styles.container}>
                    <div className={styles.slideWrapper}>
                        <Image
                            key={currentIndex}
                            src={product.images[currentIndex]}
                            alt={''}
                            width={290}
                            height={370}
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.productSpecs}>
                        <div className={styles.specItem}>
                            <span>{product.details.size.label?.[lang]}</span>
                            <span>{product.details.size.value}</span>
                        </div>
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
                    </div>
                </div>
                <NextArrow onClick={goToNext} />
            </div>
            <div className={styles.footer} onClick={click}>
                <Image className={styles.hideArrow} src={arrow} alt={''} width={20} height={40} />
            </div>
        </div>
    )
}