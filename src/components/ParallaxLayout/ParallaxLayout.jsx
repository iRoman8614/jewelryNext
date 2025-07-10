"use client";

import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import clsx from 'clsx';
import styles from './ParallaxLayout.module.scss';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

export default function ParallaxLayout({
                                           elementsData,
                                           minHeight = '150vh',
                                           minHeightMobile = '230vh',
                                           backgroundColor = '#000',
                                           containerClassName = '',
                                       }) {
    const { lang } = useLanguage();

    if (!elementsData || !Array.isArray(elementsData) || elementsData.length === 0) {
        return null;
    }

    const containerStyle = {
        '--min-height-desktop': minHeight,
        '--min-height-mobile': minHeightMobile,
        backgroundColor: backgroundColor,
    };

    return (
        <div
            className={clsx(styles.container, containerClassName)}
            style={containerStyle}
        >
            {elementsData.map((element) => {
                const isImage = element.type === 'image' && element.src;
                const titleText = element.title?.[lang];
                const contentText = element.content?.[lang];

                return (
                    <Parallax
                        key={element.id}
                        speed={element.speed || 0}
                        className={clsx(styles.elementWrapper, isImage && styles.imageWrapper)}
                        style={{
                            position: 'absolute',
                            top: element.top || '0%',
                            left: element.left || '0%',
                            width: element.width || 'auto',
                            height: isImage ? element.width : 'auto',
                            zIndex: element.zIndex || 1,
                        }}
                    >
                        {isImage && (
                            <Image
                                src={element.src}
                                alt={element.alt || `Parallax Element ${element.id}`}
                                className={styles.imageContent}
                                width={800}
                                height={400}
                                style={{ objectFit: 'contain' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}
                        {element.type === 'text' && contentText && (
                            <>
                                {titleText &&
                                    <div className={styles.title}>{titleText}</div>
                                }
                                <div className={styles.textContent}>
                                    <p dangerouslySetInnerHTML={{ __html: contentText }} />
                                </div>
                            </>
                        )}
                    </Parallax>
                )
            })}
        </div>
    );
};