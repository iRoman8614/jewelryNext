"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './MobileCatalogView.module.scss';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import NavBar from "@/components/NavBar/NavBar";
import { MobileItemCard } from "@/components/MobileItemCard/MobileItemCard";
import { getProducts } from '@/lib/api';
import {useCart} from "@/components/CartProvider/CartProvider";

const ProductItemContent = ({ item, lang }) => {
    const productName = item.name?.[lang] || '';
    console.log('item', item)
    const { cartItems, addToCart, removeFromCart } = useCart();

    const itemInCart = cartItems.find(product => product.productId === item.id);
    const isInCart = !!itemInCart;

    console.log('isInCart', isInCart);

    const handleAddToCartClick = () => addToCart(item.id);
    const handleRemoveFromCartClick = () => removeFromCart(item.id);


    return (
        <>
            <div className={styles.productName}>{productName}</div>
            <div className={styles.productItem}>
                <div className={styles.productImageBlock}>
                    <Image className={styles.productImage} src={item.image} alt={productName} width={185} height={220} />
                    {!isInCart ? (
                        <Image src={'/images/basket.svg'} onClick={handleAddToCartClick} className={styles.busket} alt="add to cart" width={20} height={20} />
                    ):(
                        <Image src={'/images/BusketAdded.svg'} onClick={handleRemoveFromCartClick} className={styles.busket} alt="add to cart" width={20} height={20} />
                    )}
                    {/*<Image src={'/images/Heart.svg'} className={styles.heart} alt="add to favorites" width={20} height={20} />*/}
                </div>
                <div className={styles.productInfo}>
                    <div>{lang === 'ru' ? 'размер' : 'size'}</div>
                    <div className={styles.productPrice}>{item.size}</div>
                    <div>{lang === 'ru' ? 'вес' : 'weight'}</div>
                    <div className={styles.productPrice}>{item.weight}</div>
                    <div>{lang === 'ru' ? 'цена' : 'cost'}</div>
                    <div className={styles.productPrice}>{item.price}</div>
                </div>
            </div>
        </>
    );
};

export default function MobileCatalogView({ data, navigation, iconLinks, mobileSliderImages, featuredProducts }) {
    const { lang } = useLanguage()

    const { categoryInfo, collectionInfo, pagination } = data;

    const [displayedProducts, setDisplayedProducts] = useState(data.products || []);
    const [currentPage, setCurrentPage] = useState(pagination.currentPage);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(pagination.currentPage < pagination.totalPages);
    const [itemDetail, setItemDetail] = useState(null);



    const observer = useRef();
    const loadMoreProducts = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        const nextPage = currentPage + 1;

        const newData = await getProducts({
            category: categoryInfo?.slug,
            collection: collectionInfo?.slug,
            page: nextPage,
        });

        if (newData.products && newData.products.length > 0) {
            setDisplayedProducts(prev => [...prev, ...newData.products]);
            setCurrentPage(newData.currentPage);
            setHasMore(newData.currentPage < newData.totalPages);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    }, [isLoading, hasMore, currentPage, categoryInfo, collectionInfo]);

    const lastProductElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreProducts();
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, loadMoreProducts]);

    const handleItemClick = (id) => setItemDetail(id.toString());
    const handleItemClose = () => setItemDetail(null);

    const localizedFeaturedItems = featuredProducts.map(item => ({
        url: item.url,
        alt: item.alt?.[lang] || ''
    }));

    const sliderImagesWithFallbackAlt = mobileSliderImages.map((img, index) => ({
        ...img,
        alt: img.alt || (lang === 'ru' ? `Слайд ${index + 1}` : `Slide ${index + 1}`)
    }));

    return (
        <>
            <div>
                <Image className={styles.header} src={'/images/logo.png'} alt="logo" width={30} height={80} />
            </div>
            <NavBar theme={'black'} navigation={navigation}/>
            <ImageSlider images={sliderImagesWithFallbackAlt} />
            <div className={styles.categoriesBlock}>
                <div className={styles.greyCategories}>
                    {navigation.map((category, index) => {
                        const icon = iconLinks?.[index];
                        if (!icon) return null;
                        return (
                            <Link key={category.slug} href={`/category/${category.slug}`} className={styles.categoryLink}>
                                <Image
                                    className={styles.categoryCircle}
                                    src={icon.image}
                                    alt={category.title?.[lang] || category.slug}
                                    width={65}
                                    height={65}
                                />
                                {category.title?.[lang] || category.slug}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className={styles.newItems}>
                {localizedFeaturedItems.map((item, index) => (
                    <Image key={index} className={styles.pictItem} src={item.url} alt={item.alt} width={185} height={300} />
                ))}
            </div>

            <div className={styles.categoryItems}>
                {displayedProducts.map((item, index) => {
                    const itemId = item.id || index;
                    if (displayedProducts.length === index + 1) {
                        return (
                            <div ref={lastProductElementRef} key={itemId} onClick={() => handleItemClick(itemId)}>
                                <ProductItemContent item={item} lang={lang} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={itemId} onClick={() => handleItemClick(itemId)}>
                                <ProductItemContent item={item} lang={lang} />
                            </div>
                        )
                    }
                })}
            </div>

            {isLoading && <div className={styles.loader}>Загрузка...</div>}

            {itemDetail !== null && <MobileItemCard id={itemDetail} click={handleItemClose} /> }
        </>
    );
}