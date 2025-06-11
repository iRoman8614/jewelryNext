import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products.data.js';
import ProductView from '@/components/ProductView/ProductView';
import styles from './item.module.scss';
import NavBar from "@/components/NavBar/NavBar";

export async function generateMetadata({ params }) {
    const product = getProductById(params.id);
    if (!product) {
        return { title: 'Товар не найден' };
    }
    return {
        title: `${product.name} – ${product.type || 'Изделие'}`,
        description: `Информация о товаре: ${product.name}`,
    };
}

export default function ItemPage({ params }) {
    const { id } = params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <>
            <NavBar theme={'black'} />
            <main className={styles.root}>
                <ProductView product={product} />
            </main>
        </>
    );
}