"use client";

import React, { useState } from "react";
import Image from 'next/image';
import styles from './FormListItem.module.scss';

export default function FormListItem({ item, onRemove }) {
    const [isHovered, setIsHovered] = useState(false);

    const displayItem = item || {
        type: 'КОЛЬЦО',
        name: 'МЕТЕОРА',
        price: '33K',
        imageUrl: '/images/placeholder-item.png'
    };

    return (
        <div className={styles.root}>
            <div className={styles.img}>
                <Image
                    src={displayItem.imageUrl}
                    alt={displayItem.name}
                    className={styles.img}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div>{displayItem.type}</div>
            <div>{displayItem.name}</div>
            <div className={styles.sumConteiner}>
                <div>{displayItem.price}</div>
                <div
                    className={styles.buttonContainer}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => onRemove && onRemove(displayItem.id)}
                    role="button"
                    tabIndex={0}
                >
                    <Image
                        src={isHovered ? '/images/hoverCross.svg' : '/images/cross.svg'}
                        alt="Удалить товар"
                        className={styles.crossIcon}
                        width={16}
                        height={16}
                    />
                </div>
            </div>
        </div>
    );
}