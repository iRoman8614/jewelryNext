import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { collections } from '@/lib/nav.data';
import styles from './NavBar.module.scss';

const categoryDisplayNames = {
    rings: 'кольца',
    bracelets: 'браслеты',
    earrings: 'серьги',
    pendants: 'подвески'
};

export default function NavBar({ theme }) {
    return (
        <nav className={clsx(styles.root, theme === 'white' && styles.rootWhite)}>
            <div className={styles.buttonset}>
                <Link className={styles.link} href="/">
                    <Image
                        className={styles.logo}
                        src="/images/logo.png"
                        alt="Логотип"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
                <Link className={styles.link} href="/">Путь</Link>

                <div className={styles.linkList}>
                    Доступные
                    <div className={styles.linkHiden}>
                        {/*
                          1. Используем Object.entries для итерации по объекту `collections`.
                          Для каждой записи получаем ключ (`categoryKey`) и значение (`collectionsArray`).
                        */}
                        {Object.entries(collections).map(([categoryKey, collectionsArray]) => (
                            <div key={categoryKey} className={styles.subMenuItem}>
                                {/* 2. Создаем ссылку на категорию, используя ключ */}
                                <Link className={styles.link} href={`/category/${categoryKey}`}>
                                    {/* 3. Отображаем русское название из нашего словаря */}
                                    {categoryDisplayNames[categoryKey]}
                                </Link>
                                <div className={styles.collectionsList}>
                                    {/* 4. Здесь `collectionsArray` — это уже массив, по которому можно делать .map() */}
                                    {collectionsArray.map((collection) => (
                                        <Link key={collection.path} className={styles.link} href={collection.path}>
                                            {collection.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Остальной код остается без изменений */}
                <div className={styles.categoriesMobile}>
                    <Link className={styles.link} href="/category">доступные</Link>
                </div>
                <Link className={styles.link} href="/#contacts">контакты</Link>
                <Link className={styles.link} href="/#custom">заказ</Link>
                <Link className={styles.link} href="/gallery">галерея</Link>
            </div>
            <div className={styles.buttonsetAdditional}>
                <Link className={styles.link} href="/cart">корзина</Link>
                <Link className={styles.link} href="/services">сервис</Link>
            </div>
            <div className={styles.buttonsetAdditionalMobile}>
                <Link className={styles.link} href="/cart">
                    <Image
                        className={styles.basket}
                        src="/images/basket.svg"
                        alt="Корзина"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>
        </nav>
    );
};