"use client";

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { collections } from '@/lib/nav.data';
import { categoryPageData } from '@/lib/catalog.data';
import styles from './NavBar.module.scss';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

export default function NavBar({ theme }) {
    const { lang, setLang } = useLanguage();

    const handleLanguageToggle = () => {
        const newLang = lang === 'ru' ? 'en' : 'ru';
        setLang(newLang);
    };

    return (
        <nav className={clsx(styles.root, theme === 'white' && styles.rootWhite)}>
            <div className={styles.buttonset}>
                <Link className={styles.link} href="/">
                    <Image
                        className={styles.logo}
                        src="/images/logo.png"
                        alt={lang === 'ru' ? 'Логотип' : 'Logo'}
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
                <Link className={styles.link} href="/">{lang === 'ru' ? 'Путь' : 'The Path'}</Link>

                <div className={styles.linkList}>
                    {lang === 'ru' ? 'Доступные' : 'Available'}
                    <div className={styles.linkHiden}>
                        {Object.entries(collections).map(([categoryKey, collectionsArray]) => (
                            <div key={categoryKey} className={styles.subMenuItem}>
                                <Link className={styles.linkCollection} href={`/category/${categoryKey}`}>
                                    {categoryPageData[categoryKey]?.title?.[lang] || categoryKey}
                                </Link>
                                <div className={styles.collectionsList}>
                                    {collectionsArray.map((collection) => (
                                        <Link key={collection.path} className={styles.linkCollection} href={collection.path}>
                                            {collection.name[lang]}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.categoriesMobile}>
                    <Link className={styles.link} href="/category">{lang === 'ru' ? 'Доступные' : 'Available'}</Link>
                </div>
                <Link className={styles.link} href="/#custom">{lang === 'ru' ? 'Заказ' : 'Custom'}</Link>
                <Link className={styles.link} href="/gallery">{lang === 'ru' ? 'Галерея' : 'Gallery'}</Link>
                <Link className={styles.link} href="/#contacts">{lang === 'ru' ? 'Контакты' : 'Contacts'}</Link>
            </div>
            <div className={styles.buttonsetAdditional}>
                <Link className={styles.link} href="/cart">{lang === 'ru' ? 'Корзина' : 'Cart'}</Link>
                <Link className={styles.link} href="/policy">{lang === 'ru' ? 'Сервис' : 'Service'}</Link>
                <div className={styles.link} onClick={handleLanguageToggle} style={{ cursor: 'pointer' }}>
                    {lang === 'ru' ? 'ENG' : 'РУС'}
                </div>
            </div>
            <div className={styles.buttonsetAdditionalMobile}>
                <Link className={styles.link} href="/cart">
                    <Image
                        className={styles.basket}
                        src="/images/basket.svg"
                        alt={lang === 'ru' ? 'Корзина' : 'Cart'}
                        width={20}
                        height={20}
                    />
                </Link>
            </div>
        </nav>
    );
};