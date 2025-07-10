import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView/ProductView';
import styles from './item.module.scss';
import NavBar from "@/components/NavBar/NavBar";
import { getProductById, getNavigation } from '@/lib/api';

export async function generateMetadata({ params }) {
    const product = await getProductById(params.id);
    if (!product) {
        return { title: 'Товар не найден' };
    }
    return {
        title: `${product.name.en} – ${product.type.en || 'Изделие'}`,
        description: `Информация о товаре: ${product.name}`,
    };
}

export default async function ItemPage({ params }) {
    const [navigationData, productData] = await Promise.all([
        getNavigation(),
        getProductById(params.id)
    ]);

    const { id } = params;
    const product = getProductById(id);

    if (!product) {
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