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

    const imageSizes = {
        1: { width: 470, height: 470 },
        2: { width: 405, height: 405 },
        3: { width: 353, height: 353 },
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
            />
            {displayName && <div className={styles.title}>{displayName}</div>}
            {item.price && <div className={styles.desc}>{lang === "ru" ? 'цена' : 'cost'} {item.price}</div>}
            {item.size && <div className={styles.desc}>{lang === "ru" ? 'размер' : 'size'} {item.size}</div>}
            {displayMaterial && <div className={styles.desc}>{lang === "ru" ? 'материал' : 'material'} {displayMaterial}</div>}
        </div>
    );
}