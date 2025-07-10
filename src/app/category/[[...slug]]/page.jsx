import { notFound } from 'next/navigation';
import styles from './catalog.module.scss';
import DesktopCatalogView from '@/components/DesktopCatalogView/DesktopCatalogView';
import MobileCatalogView from '@/components/MobileCatalogView/MobileCatalogView';
import { getNavigation, getIconLinks, getMobileSliderImages, getFeaturedProducts, getProducts } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const navigationData = await getNavigation();
    const paths = [];

    if (!navigationData) {
        return [];
    }

    for (const category of navigationData) {
        if (category.slug) {
            paths.push({ slug: [category.slug] });
        }

        if (category.collections && category.collections.length > 0) {
            for (const subCollection of category.collections) {
                if (category.slug && subCollection.slug) {
                    paths.push({ slug: [category.slug, subCollection.slug] });
                }
            }
        }
    }

    return paths;
}

export async function generateMetadata({ params }) {
    const lang = 'ru';
    const navigationData = await getNavigation();
    const categorySlug = params.slug?.[0];
    const collectionSlug = params.slug?.[1];

    const categoryInfo = navigationData.find(cat => cat.slug === categorySlug);
    let collectionInfo = null;
    if (categoryInfo && collectionSlug) {
        collectionInfo = categoryInfo.collections.find(coll => coll.slug === collectionSlug);
    }

    const title = collectionInfo?.title?.[lang] || categoryInfo?.title?.[lang] || 'Каталог';

    return {
        title: `${title} – 27jwlr`,
        description: categoryInfo?.description?.[lang] || 'Все изделия нашего каталога.'
    };
}

export default async function CatalogPage({ params, searchParams }) {
    const { slug } = params;
    const categorySlug = slug?.[0];
    const collectionSlug = slug?.[1];

    const page = searchParams.page || '1';
    const sort = searchParams.sort;

    const [navigationData, iconLinksData, mobileSliderData, featuredProductsData, productsData] = await Promise.all([
        getNavigation(),
        getIconLinks(),
        getMobileSliderImages(),
        getFeaturedProducts(),
        getProducts({
            category: categorySlug,
            collection: collectionSlug,
            page,
            sort
        })
    ]);

    const categoryInfo = navigationData.find(cat => cat.slug === categorySlug);
    let collectionInfo = null;
    if (categoryInfo && collectionSlug) {
        collectionInfo = categoryInfo.collections.find(coll => coll.slug === collectionSlug);
    }

    if (!productsData.products || productsData.products.length === 0) {
        notFound();
    }

    const pageData = {
        products: productsData.products,
        pagination: {
            totalPages: productsData.totalPages,
            currentPage: productsData.currentPage,
            totalProducts: productsData.totalProducts,
        },
        categoryInfo,
        collectionInfo
    };

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