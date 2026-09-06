"use client";

import Image from 'next/image';
import clsx from 'clsx';
import styles from './ProductCard.module.scss';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

export default function ProductCard({ item, variant = 1 }) {
    const { lang } = useLanguage();

    const cardClass = clsx(styles.card, {
        [styles.card1]: variant === 1,
        [styles.card2]: variant === 2,
        [styles.card3]: variant === 3,
    });

    const imageClass = clsx(styles.image, {
        [styles.image1]: variant === 1,
        [styles.image2]: variant === 2,
        [styles.image3]: variant === 3,
    });

    // Значения соответствуют реальным размерам карточек из ProductCard.module.scss
    // (утилита responsive-size на холсте 3292px). Раньше тут стояли старые
    // (уменьшенные) числа, из-за которых next/image готовил файл меньше, чем
    // реально требовалось для 2x/ретина-экранов — итог тот же эффект "мыла".
    const imageSizes = {
        1: { width: 564, height: 564 },
        2: { width: 486, height: 486 },
        3: { width: 424, height: 424 },
    };
    const { width, height } = imageSizes[variant];

    const displayName = item.name?.[lang] || '';
    const displayMaterial = item.material?.[lang] || '';

    return (
        <div className={cardClass}>
            <Image
                className={imageClass}
                src={item.image}
                alt={displayName || 'Ювелирное изделие'}
                width={width}
                height={height}
                sizes="(max-width: 900px) 60vw, 20vw"
                quality={90}
            />
            {displayName && <div className={styles.title}>{displayName}</div>}
            {item.price && <div className={styles.desc}>{lang === "ru" ? 'цена' : 'cost'} {item.price}</div>}
            {item.size && <div className={styles.desc}>{lang === "ru" ? 'размер' : 'size'} {item.size}</div>}
            {displayMaterial && <div className={styles.desc}>{lang === "ru" ? 'материал' : 'material'} {displayMaterial}</div>}
        </div>
    );
}