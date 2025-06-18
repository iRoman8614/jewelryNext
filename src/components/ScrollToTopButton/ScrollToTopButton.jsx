// src/components/ScrollToTopButton/ScrollToTopButton.jsx

"use client";

import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.scss';
import Image from "next/image";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={styles.scrollToTop}>
            {isVisible && (
                <button onClick={scrollToTop} className={styles.button}>
                    <Image src={'/images/arrow.svg'} alt={''} width={20} height={40} />
                </button>
            )}
        </div>
    );
}