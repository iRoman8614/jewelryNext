"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/api';
import DesktopCatalogView from '@/components/DesktopCatalogView/DesktopCatalogView';
import MobileCatalogView from '@/components/MobileCatalogView/MobileCatalogView';
import styles from './catalogClientView.module.scss'; // Создайте этот файл стилей

const Loader = () => (
    <div className={styles.loader_container}>
        <h2>Загрузка...</h2>
    </div>
);

export default function CatalogClientView({
                                              params,
                                              initialData,
                                              navigationData,
                                              iconLinksData,
                                              mobileSliderData,
                                              featuredProductsData
                                          }) {
    const [pageData, setPageData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const sort = searchParams.get('sort');

    useEffect(() => {
        const isFirstLoad = page === '1' && !sort;
        if (isFirstLoad) {
            setPageData(initialData);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            const newData = await getProducts({
                category: params.slug?.[0],
                collection: params.slug?.[1],
                page,
                sort,
            });

            setPageData(prevData => ({
                ...prevData, // Сохраняем categoryInfo и collectionInfo
                products: newData.products || [],
                pagination: {
                    totalPages: newData.totalPages || 1,
                    currentPage: newData.currentPage || 1,
                    totalProducts: newData.totalProducts || 0,
                },
            }));
            setIsLoading(false);
        };

        fetchData();
    }, [page, sort, params.slug, initialData]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className={styles.desktopOnly}>
                <DesktopCatalogView
                    data={pageData}
                    navigation={navigationData}
                />
            </div>
            <div className={styles.mobileOnly}>
                <MobileCatalogView
                    data={pageData}
                    navigation={navigationData}
                    iconLinks={iconLinksData}
                    mobileSliderImages={mobileSliderData}
                    featuredProducts={featuredProductsData}
                />
            </div>
        </>
    );
}