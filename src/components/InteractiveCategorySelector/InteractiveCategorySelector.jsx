// src/components/InteractiveCategorySelector/InteractiveCategorySelector.jsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './InteractiveCategorySelector.module.scss';

// Данные и конфиг импортируются из отдельного файла - это отлично!
import { categoryData, SNAKE_CONFIG, snakeImages } from '@/lib/interactive-selector.data.js';

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

    // --- НАЧАЛО ИСПРАВЛЕНИЙ: ЗАПОЛНЯЕМ ЛОГИКУ ---

    const getPositionState = (visualIndex) => {
        // Сценарий 1: Нет наведения мыши, используем начальный паттерн
        if (hoveredCategoryIndex === null) {
            // Защита, если паттерн короче, чем количество элементов
            const safePattern = [...initialPattern, ...Array(numberOfElements - initialPattern.length).fill(2)];
            return safePattern[visualIndex % safePattern.length];
        }

        // Сценарий 2: Есть наведение, создаем "волну"
        const baseWaveLength = baseWavePattern.length;
        // Находим, где в нашем паттерне находится "пик" волны (состояние 3)
        const targetStateIndexInWave = baseWavePattern.findIndex(state => state === 3);

        // Если пика нет, возвращаем нейтральное состояние
        if (targetStateIndexInWave === -1) return 2;

        // Вычисляем смещение, чтобы пик волны совпал с элементом, на который навели мышь
        const offset = (hoveredCategoryIndex - targetStateIndexInWave + baseWaveLength) % baseWaveLength;

        // Рассчитываем позицию текущего элемента в "смещенной" волне
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

    // --- КОНЕЦ ИСПРАВЛЕНИЙ ---

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
                            // Для интерактивных элементов лучше отключать перетаскивание
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

// Главный компонент остается без изменений
export default function InteractiveCategorySelector() {
    // ... (весь ваш код здесь правильный)
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
                {categoryData.map((category, index) => (
                    <Link
                        key={category.id}
                        href={category.slug}
                        className={styles.categoryButton}
                        onMouseEnter={() => handleCategoryEnter(index)}
                        onMouseLeave={handleCategoryLeave}
                    >
                        {category.name}
                    </Link>
                ))}
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