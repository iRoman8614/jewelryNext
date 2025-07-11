"use client";

import React from "react";
import Image from 'next/image';
import styles from './FormListItem.module.scss';
import { useLanguage } from "@/components/LanguageProvider/LanguageProvider";

export default function FormListItem({ item }) {
    const { lang } = useLanguage();

    if (!item) {
        return null;
    }

    const formattedPrice = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(item.price);

    return (
        <div className={styles.root}>
            <div className={styles.img}>
                <Image
                    src={item.imageUrl}
                    alt={item.name[lang]}
                    className={styles.img}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div>{item.type[lang].toUpperCase()}</div>
            <div>{item.name[lang].toUpperCase()}</div>
            <div className={styles.sumConteiner}>
                <div>{formattedPrice}</div>
            </div>
        </div>
    );
}