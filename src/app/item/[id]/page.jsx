import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView/ProductView';
import styles from './item.module.scss';
import NavBar from "@/components/NavBar/NavBar";
import { getProductById, getNavigation, getProducts } from '@/lib/api';

export async function generateStaticParams() {
    try {
        const { products } = await getProducts();
        if (!products || !Array.isArray(products)) {
            return [];
        }
        return products.map((product) => ({
            id: String(product.id),
        }));
    } catch (error) {
        console.error('Failed to generate static params for items:', error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const product = await getProductById(params.id);
    if (!product) {
        return { title: 'Товар не найден' };
    }
    const title = product.name?.en || 'Product';
    return {
        title: title,
        description: `Information about product: ${title}`,
    };
}

export default async function ItemPage({ params }) {
    const { id } = params;

    const [navigationData, productData] = await Promise.all([
        getNavigation(),
        getProductById(id)
    ]);

    if (!productData) {
        notFound();
    }

    return (
        <>
            <NavBar theme={'black'} navigation={navigationData} />
            <main className={styles.root}>
                <ProductView product={productData} />
            </main>
        </>
    );
}