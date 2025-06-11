import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { collections } from '@/lib/nav.data';
import styles from './NavBar.module.scss';

const categoryDisplayNames = {
    rings: 'кольца',
    bracelets: 'браслеты',
    earrings: 'серьги',
    pendants: 'подвески',
    necklaces: 'ожерелья'
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
                        {Object.entries(collections).map(([categoryKey, collectionsArray]) => (
                            <div key={categoryKey} className={styles.subMenuItem}>
                                <Link className={styles.link} href={`/category/${categoryKey}`}>
                                    {categoryDisplayNames[categoryKey]}
                                </Link>
                                <div className={styles.collectionsList}>
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
                <div className={styles.categoriesMobile}>
                    <Link className={styles.link} href="/category">доступные</Link>
                </div>
                <Link className={styles.link} href="/#contacts">контакты</Link>
                <Link className={styles.link} href="/#custom">заказ</Link>
                <Link className={styles.link} href="/gallery">галерея</Link>
            </div>
            <div className={styles.buttonsetAdditional}>
                <Link className={styles.link} href="/cart">корзина</Link>
                <Link className={styles.link} href="/policy">сервис</Link>
                <div className={styles.link}>рус/англ</div>
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