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
            if (collectionSlug) {
                paths.push({ slug: [categoryKey, collectionSlug] });
            }
        }
    }
    return paths;
}

export async function generateMetadata({ params }) {
    const lang = 'ru';
    const categorySlug = params.slug?.[0];
    const collectionSlug = params.slug?.[1];
    const { categoryInfo, collectionInfo } = await getCatalogData(categorySlug, collectionSlug);

    const title = collectionInfo?.name?.[lang] || categoryInfo?.title?.[lang] || 'Каталог';

    return {
        title: `${title} – 27jwlr`,
        description: categoryInfo?.description?.[lang] || 'Все изделия нашего каталога.'
    };
}

export default async function CatalogPage({ params }) {
    const { slug } = params;
    const categorySlug = slug?.[0];
    const collectionSlug = slug?.[1];

    const pageData = await getCatalogData(categorySlug, collectionSlug);

    if (!pageData.products || pageData.products.length === 0) {
        notFound();
    }

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