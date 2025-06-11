"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileCatalogView.module.scss';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { mobileSliderImages } from '@/lib/catalog.data.js'; // `productsData` нам здесь больше не нужен

// Принимаем один пропс `data`
export default function MobileCatalogView({ data }) {
    // Деструктурируем объект `data`, чтобы получить массив `products`.
    // И сразу добавляем защиту: если `data.products` не существует,
    // `products` будет равен пустому массиву `[]`.
    const { products = [] } = data;

    return (
        <>
            <div>
                <Image className={styles.header} src={'/images/catalog/logo.png'} alt="logo" width={30} height={30} />
            </div>
            <ImageSlider images={mobileSliderImages} />
            <div className={styles.categoriesBlock}>
                <div className={styles.greyCategories}>
                    <div><Image className={styles.categoryCircle} src={'/images/catalog/mobRing.png'} alt="кольца" width={65} height={65} />кольца</div>
                    <div><Image className={styles.categoryCircle} src={'/images/catalog/mobRing.png'} alt="подвески" width={65} height={65} />подвески</div>
                    <div><Image className={styles.categoryCircle} src={'/images/catalog/mobRing.png'} alt="браслеты" width={65} height={65} />браслеты</div>
                    <div><Image className={styles.categoryCircle} src={'/images/catalog/mobRing.png'} alt="серьги" width={65} height={65} />серьги</div>
                </div>
            </div>
            <div className={styles.newItems}>
                <div>item 1</div> <div>item 2</div> <div>item 3</div>
                <div>item 4</div> <div>item 5</div> <div>item 6</div>
            </div>
            <div className={styles.categoryItems}>
                {/* Теперь products.map() не вызовет ошибку */}
                {products.map((item, index) => (
                    <div key={index} className={styles.productItem}>
                        <div className={styles.productImageBlock}>
                            <Image className={styles.productImage} src={item.image} alt={item.name} fill sizes="50vw" />
                            <Image src={'/images/catalog/basket.svg'} className={styles.busket} alt="add to cart" width={20} height={20} />
                            <Image src={'/images/catalog/Heart.svg'} className={styles.heart} alt="add to favorites" width={20} height={20} />
                        </div>
                        <div className={styles.productInfo}>
                            <div className={styles.productName}>{item.name}</div>
                            <div className={styles.productPrice}>{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}