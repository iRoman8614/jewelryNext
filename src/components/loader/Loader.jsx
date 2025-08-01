"use client";

import { useState, useEffect } from 'react';
import styles from './Loader.module.scss';
import Image from "next/image";

const logotype = '/images/logotype.svg';

export const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [isHiding, setIsHiding] = useState(false);

    const [isFirstVisit, setIsFirstVisit] = useState(false);

    const duration = 4000;
    useEffect(() => {
        const visited = localStorage.getItem('hasVisitedBefore');

        if (!visited) {
            localStorage.setItem('hasVisitedBefore', 'true');
            setIsFirstVisit(true);
        }
    }, []);

    useEffect(() => {
        if (!isFirstVisit) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 1;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsHiding(true);
                    }, 300);
                    return 100;
                }
                return newProgress;
            });
        }, duration / 100);

        return () => clearInterval(interval);
    }, [isFirstVisit]);

    if (!isFirstVisit) {
        return null;
    }

    const rootClassName = `${styles.root} ${isHiding ? styles.hidden : ''}`;

    return (
        <div className={rootClassName}>
            <div>lang</div>
            <Image src={logotype} alt={'Загрузка...'} width={150} height={150} priority />
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBarFill}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};