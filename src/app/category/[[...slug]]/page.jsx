// src/app/category/[[...slug]]/page.jsx

// src/app/category/[[...slug]]/page.jsx

import { Suspense } from 'react';
import { getNavigation, getProducts, getIconLinks, getMobileSliderImages, getFeaturedProducts } from '@/lib/api';
import CatalogClientView from "@/components/CatalogClientView/CatalogClientView";

const CatalogLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <h2>Загрузка каталога...</h2>
    </div>
);

export async function generateStaticParams() {
    try {
        const navigationData = await getNavigation();
        if (!navigationData || !Array.isArray(navigationData)) {
            return [];
        }
        const paths = [];
        for (const category of navigationData) {
            if (category.slug) {
                paths.push({ slug: [category.slug] });
            }
            if (category.collections && category.collections.length > 0) {
                for (const collection of category.collections) {
                    if (category.slug && collection.slug) {
                        paths.push({ slug: [category.slug, collection.slug] });
                    }
                }
            }
        }
        return paths;
    } catch (error) {
        console.error('Failed to generate static params for categories:', error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    try {
        const navigationData = await getNavigation();
        const categorySlug = params.slug?.[0];
        const collectionSlug = params.slug?.[1];

        const categoryInfo = navigationData?.find(cat => cat.slug === categorySlug);
        let collectionInfo = null;
        if (categoryInfo && collectionSlug) {
            collectionInfo = categoryInfo.collections?.find(coll => coll.slug === collectionSlug);
        }
        const title = collectionInfo?.name?.ru || categoryInfo?.title?.ru || 'Каталог';

        return {
            title: `${title} – 27jwlr`,
            description: collectionInfo?.description?.ru || categoryInfo?.description?.ru || 'Все изделия нашего каталога.'
        };
    } catch (error) {
        return {
            title: 'Каталог – 27jwlr',
            description: 'Все изделия нашего каталога.'
        };
    }
}

export default async function CatalogPage({ params }) {
    const { slug } = params;
    const categorySlug = slug?.[0];
    const collectionSlug = slug?.[1];

    const [navigationData, iconLinksData, mobileSliderData, featuredProductsData, initialProductsData] = await Promise.all([
        getNavigation(),
        getIconLinks(),
        getMobileSliderImages(),
        getFeaturedProducts(),
        getProducts({
            category: categorySlug,
            collection: collectionSlug,
            page: '1',
        })
    ]);

    const categoryInfo = navigationData?.find(cat => cat.slug === categorySlug);
    let collectionInfo = null;
    if (categoryInfo && collectionSlug) {
        collectionInfo = categoryInfo.collections?.find(coll => coll.slug === collectionSlug);
    }

    const initialPageData = {
        products: initialProductsData.products || [],
        pagination: {
            totalPages: initialProductsData.totalPages || 1,
            currentPage: initialProductsData.currentPage || 1,
            totalProducts: initialProductsData.totalProducts || 0,
        },
        categoryInfo,
        collectionInfo
    };

    return (
        <Suspense fallback={<CatalogLoader />}>
            <CatalogClientView
                params={params}
                initialData={initialPageData}
                navigationData={navigationData}
                iconLinksData={iconLinksData}
                mobileSliderData={mobileSliderData}
                featuredProductsData={featuredProductsData}
            />
        </Suspense>
    );
}