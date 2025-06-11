"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function InfiniteImageFeed({
                                              images = [],
                                              speed = 30,
                                              imageWidth = 180,
                                              imageHeight = 120,
                                              verticalOffset = 25,
                                              gap = 15
                                          }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const duplicatedImages = useMemo(() => {
        if (!images || images.length === 0) return [];
        return [...images, ...images, ...images];
    }, [images]);

    if (images.length === 0) {
        return null;
    }

    const singleSetWidth = images.length * (imageWidth + gap);

    const containerStyle = {
        '--image-width': `${imageWidth}px`,
        '--image-height': `${imageHeight}px`,
        '--vertical-offset': `${verticalOffset}px`,
        '--gap': `${gap}px`,
        height: `calc(${imageHeight}px + 2 * ${verticalOffset}px)`,
    };

    const wrapperStyle = {
        '--animation-distance': `-${singleSetWidth}px`,
        '--animation-duration': `${speed}s`,
    };

    const handleImageClick = (src) => {
        setSelectedImage(src);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedImage(null);
    };

    return (
        <>
            <div className={styles.feedContainer} style={containerStyle}>
                <div className={styles.imagesWrapper} style={wrapperStyle}>
                    {duplicatedImages.map((src, index) => (
                        <div
                            key={`feed-img-${index}`}
                            className={`${styles.imageItemContainer} ${
                                (index % images.length) % 2 === 0 ? styles.even : styles.odd
                            }`}
                            onClick={() => handleImageClick(src)}
                        >
                            <Image
                                src={src}
                                alt={`Feed image ${index % images.length + 1}`}
                                className={styles.imageElement}
                                fill
                                sizes={`${imageWidth}px`}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {isPopupOpen && selectedImage && (
                <div className={styles.popupOverlay} onClick={handleClosePopup}>
                    <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={handleClosePopup}>
                            ×
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Selected feed image"
                            className={styles.popupImage}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="90vw"
                        />
                    </div>
                </div>
            )}
        </>
    );
};