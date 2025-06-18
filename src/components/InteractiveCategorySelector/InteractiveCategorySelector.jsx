"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './InteractiveCategorySelector.module.scss';

import { categoryData, SNAKE_CONFIG, snakeImages } from '@/lib/interactive-selector.data.js';
import { categoryPageData } from "@/lib/catalog.data"
import {useLanguage} from "@/components/LanguageProvider/LanguageProvider";
import {collections} from "@/lib/nav.data";

const SnakeRow = ({
                      categories,
                      images,
                      numberOfElements,
                      initialPattern,
                      baseWavePattern,
                      hoveredCategoryIndex,
                      onCategoryEnter,
                      onCategoryLeave,
                      direction = 'normal',
                  }) => {
    const getPositionState = (visualIndex) => {
        if (hoveredCategoryIndex === null) {
            const safePattern = [...initialPattern, ...Array(numberOfElements - initialPattern.length).fill(2)];
            return safePattern[visualIndex % safePattern.length];
        }
        const baseWaveLength = baseWavePattern.length;
        const targetStateIndexInWave = baseWavePattern.findIndex(state => state === 3);
        if (targetStateIndexInWave === -1) return 2;
        const offset = (hoveredCategoryIndex - targetStateIndexInWave + baseWaveLength) % baseWaveLength;
        const effectiveIndexInWave = (visualIndex - offset + baseWaveLength) % baseWaveLength;
        return baseWavePattern[effectiveIndexInWave];
    };

    const mapStateToTranslateY = (state) => {
        const shiftAmount = SNAKE_CONFIG.POSITION_SHIFT_PX;
        const shiftDirection = (direction === 'normal' ? -1 : 1); // Инвертируем направление для нижнего ряда

        switch (state) {
            case 1: return shiftDirection * shiftAmount; // Впадина
            case 3: return -shiftDirection * shiftAmount; // Пик
            case 2: default: return 0; // Нейтраль
        }
    };

    return (
        <div className={styles.snakeRowContainer}>
            {Array.from({ length: numberOfElements }).map((_, visualIndex) => {
                const categoryIndex = visualIndex % categories.length;
                const imagePair = images[visualIndex % images.length];

                // Вызываем наши заполненные функции
                const positionState = getPositionState(visualIndex);
                const translateY = mapStateToTranslateY(positionState);

                return (
                    <div
                        key={`snake-${direction}-${visualIndex}`}
                        className={styles.snakeItemWrapper}
                        onMouseEnter={() => onCategoryEnter(categoryIndex)}
                        onMouseLeave={onCategoryLeave}
                        style={{ transform: `translateY(${translateY}px)` }}
                    >
                        <Image
                            src={imagePair.top}
                            alt={categories[categoryIndex].name}
                            className={styles.foregroundImage}
                            width={250}
                            height={250}
                            draggable="false"
                        />
                        <Image
                            src={imagePair.bottom}
                            alt=""
                            className={styles.foregroundImageLower}
                            width={250}
                            height={250}
                            aria-hidden="true"
                            draggable="false"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default function InteractiveCategorySelector() {
    const { lang } = useLanguage();
    const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);

    const handleCategoryEnter = (index) => {
        setHoveredCategoryIndex(index);
    };

    const handleCategoryLeave = () => {
        setHoveredCategoryIndex(null);
    };

    return (
        <div className={styles.categorySelectorContainer}>
            <SnakeRow
                categories={categoryData}
                images={snakeImages.slice(0, 6)}
                numberOfElements={SNAKE_CONFIG.NUMBER_OF_ELEMENTS}
                initialPattern={SNAKE_CONFIG.INITIAL_POSITION_PATTERN}
                baseWavePattern={SNAKE_CONFIG.BASE_WAVE_PATTERN}
                hoveredCategoryIndex={hoveredCategoryIndex}
                onCategoryEnter={handleCategoryEnter}
                onCategoryLeave={handleCategoryLeave}
                direction="normal"
            />
            <div className={styles.buttonRow}>
                {Object.entries(collections).map(([categoryKey], index) => (
                    <Link
                        key={categoryKey.id}
                        href={`/category/${categoryKey}`}
                        className={styles.categoryButton}
                        onMouseEnter={() => handleCategoryEnter(index)}
                        onMouseLeave={handleCategoryLeave}
                    >
                        {categoryPageData[categoryKey]?.title?.[lang] || categoryKey}
                    </Link>
                ))}
            </div>
            <div className={styles.mobileButtonRow}>
                <Link className={styles.categoryButton} href={'/catalog'}>{lang === "ru" ? "Каталог" : 'Catalog'}</Link>
            </div>
            <SnakeRow
                categories={categoryData}
                images={snakeImages.slice(6, 12)}
                numberOfElements={SNAKE_CONFIG.NUMBER_OF_ELEMENTS}
                initialPattern={SNAKE_CONFIG.INITIAL_POSITION_PATTERN}
                baseWavePattern={SNAKE_CONFIG.BASE_WAVE_PATTERN}
                hoveredCategoryIndex={hoveredCategoryIndex}
                onCategoryEnter={handleCategoryEnter}
                onCategoryLeave={handleCategoryLeave}
                direction="inverted"
            />
        </div>
    );
};