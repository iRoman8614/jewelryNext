// src/components/ProductImageDisplay/ProductImageDisplay.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import styles from './ProductImageDisplay.module.scss';

export default function ProductImageDisplay({ imagePositions = [] }) {
    const containerMinHeight = imagePositions.reduce((max, pos) => {
        const top = parseFloat(pos.top);
        const height = parseFloat(pos.height);
        return Math.max(max, top + height);
    }, 0) + 10;

    return (
        <div
            className={styles.imageDisplayContainer}
            style={{ minHeight: `${containerMinHeight}px` }}
        >
            {imagePositions.map((pos) => (
                <div
                    key={pos.id}
                    className={styles.productImageWrapper}
                >
                    <Image
                        src={pos.imageUrl}
                        alt={`Изображение товара ${pos.id}`}
                        className={styles.productImage}
                        width={100}
                        height={100}
                        style={{
                            top: pos.top,
                            left: pos.left,
                            width: pos.width,
                            height: pos.height,
                        }}
                        sizes="140px"
                    />
                </div>
            ))}
        </div>
    );
};