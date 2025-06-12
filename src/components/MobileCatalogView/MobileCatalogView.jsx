"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileCatalogView.module.scss';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { mobileSliderImages, mobileCatalogRandom } from '@/lib/catalog.data.js';
import NavBar from "@/components/NavBar/NavBar";

export default function MobileCatalogView({ data }) {
    const { products = [] } = data;

    return (
        <>
            <div>
                <Image className={styles.header} src={'/images/logo.png'} alt="logo" width={30} height={80} />
            </div>
            <NavBar theme={'black'} />
            <ImageSlider images={mobileSliderImages} />
            <div className={styles.categoriesBlock}>
                <div className={styles.greyCategories}>
                    <div><Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt="кольца" width={65} height={65} />кольца</div>
                    <div><Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt="подвески" width={65} height={65} />подвески</div>
                    <div><Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt="браслеты" width={65} height={65} />браслеты</div>
                    <div><Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt="серьги" width={65} height={65} />серьги</div>
                </div>
            </div>
            <div className={styles.newItems}>
                {mobileCatalogRandom.map((item, index) => {
                    return(<div key={index} >
                        <Image className={styles.pictItem} src={item.url} alt={item.alt} width={185} height={300} />
                    </div>)
                })}
            </div>
            <div className={styles.categoryItems}>
                {products.map((item, index) => (
                    <div>
                        <div className={styles.productName}>{item.name}</div>
                        <div key={index} className={styles.productItem}>
                            <div className={styles.productImageBlock}>
                                <Image className={styles.productImage} src={item.image} alt={item.name} width={185} height={220} />
                                <Image src={'/images/basket.svg'} className={styles.busket} alt="add to cart" width={20} height={20} />
                                <Image src={'/images/Heart.svg'} className={styles.heart} alt="add to favorites" width={20} height={20} />
                            </div>
                            <div className={styles.productInfo}>
                                <div>size</div>
                                <div className={styles.productPrice}>{item.size}</div>
                                <div>weight</div>
                                <div className={styles.productPrice}>{item.weight}</div>
                                <div>price</div>
                                <div className={styles.productPrice}>{item.price}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}