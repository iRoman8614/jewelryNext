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
import {SortSelect} from "@/components/Selector/Selector";

export const cardTypeSequence = [3, 2, 1, 2, 2, 3, 3, 2, 1, 1, 3, 1];

function getDataFromPath(navigation, pathname) {
    const pathSegments = pathname.split('/').filter(Boolean);
    const categorySlug = pathSegments[1];
    const collectionSlug = pathSegments[2];
    if (!categorySlug) {
        return { category: null, collection: null };
    }
    const foundCategory = navigation.find(item => item.slug === categorySlug);
    if (!foundCategory) {
        return { category: null, collection: null };
    }
    let foundCollection = null;
    if (collectionSlug && Array.isArray(foundCategory.collections)) {
        foundCollection = foundCategory.collections.find(
            collection => collection.slug === collectionSlug
        ) || null;
    }
    return {
        category: foundCategory,
        collection: foundCollection
    };
}

export default function DesktopCatalogView({ data, navigation }) {
    const { lang } = useLanguage();
    const { products = [], categoryInfo, collectionInfo, pagination } = data;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'default');
    const subtitle = collectionInfo ? categoryInfo?.title?.[lang] : categoryInfo?.subtitle?.[lang];
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

    const handleSortChange = (newSortValue) => {
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

    const collectionData = getDataFromPath(navigation, pathname);

    return (
        <>
            <NavBar theme={'black'} navigation={navigation} />
            <main className={styles.root}>
                <div className={styles.categorieHeader}>
                    <div className={styles.categorieTitle}>{pathname.split('/').length === 4 ? collectionData.collection?.name?.[lang] : collectionData.category?.title?.[lang]}</div>
                    <h3 className={styles.categorieSubitle}>{pathname.split('/').length === 4 ? collectionData.collection?.description?.[lang] : collectionData.category?.subtitle?.[lang]}</h3>
                    {pathname.split('/').length === 3 && (
                        <div
                            className={styles.categorieDesc}
                            dangerouslySetInnerHTML={{ __html: collectionData.category?.description?.[lang] }}
                        />
                    )}
                </div>
                <SortSelect
                    lang={lang}
                    sortOption={sortOption}
                    handleSortChange={handleSortChange}
                />
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
                    <Image className={styles.logotipe} src={'/images/logotipe.png'} alt="Logotype" width={100} height={40} />
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