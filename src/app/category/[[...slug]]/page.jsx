import { notFound } from 'next/navigation';
import styles from './catalog.module.scss';

import { getCatalogData } from '@/lib/catalog.data.js';
import { collections } from '@/lib/nav.data.js';
import DesktopCatalogView from '@/components/DesktopCatalogView/DesktopCatalogView';
import MobileCatalogView from '@/components/MobileCatalogView/MobileCatalogView';

export async function generateStaticParams() {
    const paths = [];
    for (const categoryKey in collections) {
        paths.push({ slug: [categoryKey] });
        const collectionsArray = collections[categoryKey];
        for (const collection of collectionsArray) {
            const collectionSlug = collection.path.split('/').pop();
            paths.push({ slug: [categoryKey, collectionSlug] });
        }
    }
    console.log('созданные пути', paths)
    return paths;
}

export async function generateMetadata({ params }) {
    const categorySlug = params.slug?.[0];
    const collectionSlug = params.slug?.[1];
    const { categoryInfo, collectionName } = await getCatalogData(categorySlug, collectionSlug);

    let title = 'Каталог';
    if (collectionName) {
        title = collectionName;
    } else if (categoryInfo && categoryInfo.title) {
        title = categoryInfo.title;
    }

    return {
        title: `${title} – 27jwlr`,
        description: categoryInfo?.description || 'Все изделия нашего каталога.'
    };
}

export default async function CatalogPage({ params }) {
    const { slug } = params;
    const categorySlug = slug?.[0];
    const collectionSlug = slug?.[1];
    const { products, categoryInfo, collectionName } = await getCatalogData(categorySlug, collectionSlug);
    if (!products || products.length === 0) {
        notFound();
    }

    const pageData = {
        title: collectionName || categoryInfo.title,
        subtitle: collectionName ? categoryInfo.title : categoryInfo.subtitle,
        description: collectionName ? '' : categoryInfo.description,
        products
    };

    return (
        <>
            <div className={styles.desktopOnly}>
                <DesktopCatalogView data={pageData} />
            </div>
            <div className={styles.mobileOnly}>
                <MobileCatalogView data={pageData} />
            </div>
        </>
    );
}