"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './DesktopCatalogView.module.scss';
import { cardTypeSequence } from '@/lib/catalog.data.js';
import BackButton from '@/components/BackButton/BackButton';
import ProductCard from '@/components/ProductCard/ProductCard';
import NavBar from "@/components/NavBar/NavBar";

export default function DesktopCatalogView({ data }) {
    const { title, subtitle, description, products } = data;

    return (
        <>
            <NavBar theme={'black'} />
            <main className={styles.root}>
                <div className={styles.categorieHeader}>
                    <div className={styles.categorieTitle}>{title}</div>
                    {subtitle && <h3 className={styles.categorieSubitle}>{subtitle}</h3>}
                    {description && <p className={styles.categorieDesc}>{description}</p>}
                </div>
                <div className={styles.productsGrid}>
                    {products.map((product, index) => {
                        const cardType = cardTypeSequence[index % cardTypeSequence.length];
                        const itemId = product.name ? product.name.toLowerCase().replace(/\s+/g, '-') : index;

                        return (
                            <Link key={index} className={styles.link} href={`/item/${itemId}`}>
                                <ProductCard item={product} variant={cardType} />
                            </Link>
                        );
                    })}
                </div>
            </main>
            <footer className={styles.bottomPagination}>
                <div>
                    <Image className={styles.logotipe} src={'/images/logotipe.png'} alt="Logotype" width={150} height={50} />
                </div>
                <div className={styles.pagination}>
                    <Image className={styles.arrow} src={'/images/prev.svg'} alt="Previous" width={80} height={20}/>
                    1 / 1
                    <Image className={styles.arrow} src={'/images/next.svg'} alt="Next" width={80} height={20}/>
                </div>
                <BackButton />
            </footer>
        </>
    );
}