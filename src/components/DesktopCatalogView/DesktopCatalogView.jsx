"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './DesktopCatalogView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import NavBar from "@/components/NavBar/NavBar";

export const cardTypeSequence = [3, 2, 1, 2, 2, 3, 3, 2, 1, 1, 3, 1];

export default function DesktopCatalogView({ data, navigation }) {
    const { lang } = useLanguage();
    const { products = [], categoryInfo, collectionInfo, pagination } = data;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'default');
    const title = collectionInfo?.title?.[lang] || categoryInfo?.title?.[lang] || (lang === 'en' ? 'Catalog' : 'Каталог');
    const subtitle = collectionInfo ? categoryInfo?.title?.[lang] : categoryInfo?.subtitle?.[lang];
    const descriptionHtml = collectionInfo ? '' : categoryInfo?.description?.[lang];
    const handlePageChange = (direction) => {
        const currentPage = Number(pagination.currentPage);
        let newPage;

        if (direction === 'next') {
            if (currentPage >= pagination.totalPages) return;
            newPage = currentPage + 1;
        } else {
            if (currentPage <= 1) return;
            newPage = currentPage - 1;
        }

        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('page', newPage.toString());
        const query = current.toString() ? `?${current.toString()}` : '';
        router.push(`${pathname}${query}`);
    };

    const handleSortChange = (e) => {
        const newSortValue = e.target.value;
        setSortOption(newSortValue);

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (newSortValue === 'default') {
            current.delete('sort');
        } else {
            current.set('sort', newSortValue);
        }
        current.set('page', '1');

        const query = current.toString() ? `?${current.toString()}` : '';
        router.push(`${pathname}${query}`);
    };

    return (
        <>
            <NavBar theme={'black'} navigation={navigation} />
            <main className={styles.root}>
                <div className={styles.categorieHeader}>
                    <div className={styles.categorieTitle}>{title}</div>
                    {subtitle && <h3 className={styles.categorieSubitle}>{subtitle}</h3>}
                    {descriptionHtml && (
                        <div
                            className={styles.categorieDesc}
                            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                        />
                    )}
                </div>
                <div className={styles.sortContainer}>
                    <select value={sortOption} onChange={handleSortChange} className={styles.sortSelect}>
                        <option value="default">{lang === 'ru' ? 'По умолчанию' : 'Default'}</option>
                        <option value="price_asc">{lang === 'ru' ? 'Цена: по возрастанию' : 'Price: Low to High'}</option>
                        <option value="price_desc">{lang === 'ru' ? 'Цена: по убыванию' : 'Price: High to Low'}</option>
                    </select>
                </div>

                <div className={styles.productsGrid}>
                    {products.map((product, index) => {
                        const cardType = cardTypeSequence[index % cardTypeSequence.length];
                        const itemId = product.id || index;
                        return (
                            <Link key={itemId} className={styles.link} href={`/item/${product.id || itemId}`}>
                                <ProductCard item={product} variant={cardType} />
                            </Link>
                        );
                    })}
                </div>
            </main>
            <footer className={styles.bottomPagination}>
                <div>
                    <Image className={styles.logotipe} src={'/images/logotipe.png'} alt="Logotype" width={150} height={50} />
                </div>
                {pagination.totalPages > 1 && <div className={styles.pagination}>
                    <div
                        className={styles.arrowButton}
                        onClick={() => handlePageChange('prev')}
                    >
                        <Image src={'/images/prev.svg'} alt="Previous" width={80} height={20}/>
                    </div>
                    <span>{pagination.currentPage} / {pagination.totalPages}</span>
                    <div
                        className={styles.arrowButton}
                        onClick={() => handlePageChange('next')}
                    >
                        <Image src={'/images/next.svg'} alt="Next" width={80} height={20}/>
                    </div>
                </div>}
                <BackButton />
            </footer>
        </>
    );
}