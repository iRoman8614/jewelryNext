// src/components/ProductCard/ProductCard.jsx

import Image from 'next/image';
import clsx from 'clsx'; // Утилита для условного объединения классов
import styles from './ProductCard.module.scss';

// Это будет наш единый компонент карточки
export default function ProductCard({ item, variant = 1 }) {
    // В зависимости от варианта, выбираем нужный CSS-класс
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

    // Определяем размеры для <Image> в зависимости от варианта
    const imageSizes = {
        1: { width: 470, height: 470 },
        2: { width: 405, height: 405 },
        3: { width: 353, height: 353 },
    };
    const { width, height } = imageSizes[variant];

    return (
        // Применяем составной класс
        <div className={cardClass}>
            <Image
                className={imageClass}
                src={item.image}
                alt={item.name || 'Ювелирное изделие'}
                width={width} // Используем размеры для варианта
                height={height}
            />
            {/* Рендерим информацию, только если она есть */}
            {item.name && <div className={styles.title}>{item.name}</div>}
            {item.desc && <div className={styles.desc}>{item.desc}</div>}
            {item.weight && <div className={styles.desc}>weight {item.weight}</div>}
            {item.size && <div className={styles.desc}>size {item.size}</div>}
            {item.material && <div className={styles.desc}>material {item.material}</div>}
            {item.price && <div className={styles.desc}>price {item.price}</div>}
        </div>
    );
}