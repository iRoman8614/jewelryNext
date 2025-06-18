"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileCatalogView.module.scss';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import { mobileSliderImages, mobileCatalogRandom, categoryPageData } from '@/lib/catalog.data.js';
import NavBar from "@/components/NavBar/NavBar";
import {useState} from "react";
import {MobileItemCard} from "@/components/MobileItemCard/MobileItemCard";

export default function MobileCatalogView({ data }) {
    const { lang } = useLanguage();
    const { products = [] } = data;
    const [itemDetail, setItemDetail] = useState(null)

    const localizedSliderImages = mobileSliderImages.map(img => ({
        ...img,
        alt: img.alt?.[lang] || 'Slider Image'
    }));

    const localizedRandomItems = mobileCatalogRandom.map(item => ({
        ...item,
        alt: item.alt?.[lang] || 'Random Item'
    }));

    const handleItemClick = (id) => {
        setItemDetail(id.toString())
    }

    const handleItemlose = () => {
        setItemDetail(null)
    }

    return (
        <>
            <div>
                <Image className={styles.header} src={'/images/logo.png'} alt="logo" width={30} height={80} />
            </div>
            <NavBar theme={'black'} />
            <ImageSlider images={localizedSliderImages} />
            <div className={styles.categoriesBlock}>
                <div className={styles.greyCategories}>
                    <Link href="/category/rings" className={styles.categoryLink}>
                        <Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt={categoryPageData.rings.title[lang]} width={65} height={65} />
                        {categoryPageData.rings.title[lang]}
                    </Link>
                    <Link href="/category/pendants" className={styles.categoryLink}>
                        <Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt={categoryPageData.pendants.title[lang]} width={65} height={65} />
                        {categoryPageData.pendants.title[lang]}
                    </Link>
                    <Link href="/category/bracelets" className={styles.categoryLink}>
                        <Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt={categoryPageData.bracelets.title[lang]} width={65} height={65} />
                        {categoryPageData.bracelets.title[lang]}
                    </Link>
                    <Link href="/category/earrings" className={styles.categoryLink}>
                        <Image className={styles.categoryCircle} src={'/images/mobRing.png'} alt={categoryPageData.earrings.title[lang]} width={65} height={65} />
                        {categoryPageData.earrings.title[lang]}
                    </Link>
                </div>
            </div>

            <div className={styles.newItems}>
                {localizedRandomItems.map((item, index) => (
                    <div key={index}>
                        <Image className={styles.pictItem} src={item.url} alt={item.alt} width={185} height={300} />
                    </div>
                ))}
            </div>

            <div className={styles.categoryItems}>
                {products.map((item, index) => {
                    const productName = item.name?.[lang] || '';
                    const itemId = item.id || index;

                    return (
                        <div key={itemId} onClick={() => handleItemClick(itemId)}>
                            <div className={styles.productName}>{productName}</div>
                            <div className={styles.productItem}>
                                <div className={styles.productImageBlock}>
                                    <Image className={styles.productImage} src={item.image} alt={productName} width={185} height={220} />
                                    <Image src={'/images/basket.svg'} className={styles.busket} alt="add to cart" width={20} height={20} />
                                    <Image src={'/images/Heart.svg'} className={styles.heart} alt="add to favorites" width={20} height={20} />
                                </div>
                                <div className={styles.productInfo}>
                                    <div>{lang === 'ru' ? 'размер' : 'size'}</div>
                                    <div className={styles.productPrice}>{item.size}</div>
                                    <div>{lang === 'ru' ? 'вес' : 'weight'}</div>
                                    <div className={styles.productPrice}>{item.weight}</div>
                                    <div>{lang === 'ru' ? 'цена' : 'price'}</div>
                                    <div className={styles.productPrice}>{item.price}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {itemDetail !== null && <MobileItemCard id={itemDetail} click={handleItemlose} /> }
        </>
    );
}