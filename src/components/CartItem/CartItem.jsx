"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './CartItem.module.scss';
import { useLanguage } from "@/components/LanguageProvider/LanguageProvider";

export default function CartItem({ item, onRemove }) {
    const { lang } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    const randomPaddingLeft = useMemo(() => {
        return Math.floor(Math.random() * 121);
    }, []);

    return (
        <div className={styles.root} style={{ paddingLeft: `${randomPaddingLeft}px` }}>
            <div className={styles.itemType}>{item.type[lang]}</div>
            <div className={styles.itemName}>{item.name[lang]}</div>
            <div
                className={styles.buttonContainer}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onRemove(item.id)}
                role="button"
                tabIndex={0}
            >
                <Image
                    src={isHovered ? '/images/hoverCross.svg' : '/images/hoverCross.svg'}
                    alt="Удалить товар"
                    className={styles.crossIcon}
                    width={30}
                    height={30}
                />
            </div>
        </div>
    );
};