// src/app/category/[[...slug]]/page.jsx

// src/components/CatalogClientView/CatalogClientView.jsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/api';
import DesktopCatalogView from '@/components/DesktopCatalogView/DesktopCatalogView';
import MobileCatalogView from '@/components/MobileCatalogView/MobileCatalogView';
import styles from './catalogClientView.module.scss';
import { useIsClient } from '@/hooks/useIsClient'; // <-- ИМПОРТ НАШЕГО ХУКА

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

    // --- ВОТ РЕШЕНИЕ ---
    const isClient = useIsClient(); // Этот флаг будет false на сервере, и true в браузере

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
                ...prevData,
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

    // --- И ВОТ РЕШЕНИЕ ---
    // Если мы на сервере (isClient === false) ИЛИ идет загрузка - показываем лоадер.
    // Это гарантирует, что сервер и клиент на первом рендере отдадут одно и то же.
    if (!isClient || isLoading) {
        return <Loader />;
    }

    // Этот код выполнится только в браузере, когда гидратация уже успешно прошла.
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