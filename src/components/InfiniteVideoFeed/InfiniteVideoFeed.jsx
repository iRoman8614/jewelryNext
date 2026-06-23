"use client";

import React, { useMemo, useState } from 'react';
// Переиспользуем СТИЛИ фото-ленты, чтобы видео-лента выглядела идентично и
// не плодить дублирующий scss. Стили не меняются.
import styles from '../InfiniteImageFeed/styles.module.scss';

export default function InfiniteVideoFeed({
                                              videos = [],
                                              speed = 30,
                                              imageWidth = 180,
                                              imageHeight = 120,
                                              verticalOffset = 25,
                                              gap = 15
                                          }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const duplicatedVideos = useMemo(() => {
        if (!videos || videos.length === 0) return [];
        return [...videos, ...videos, ...videos];
    }, [videos]);

    if (videos.length === 0) {
        return null;
    }

    const singleSetWidth = videos.length * (imageWidth + gap);

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

    const handleVideoClick = (src) => {
        setSelectedVideo(src);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedVideo(null);
    };

    return (
        <>
            <div className={styles.feedContainer} style={containerStyle}>
                <div className={styles.imagesWrapper} style={wrapperStyle}>
                    {duplicatedVideos.map((src, index) => (
                        <div
                            key={`feed-video-${index}`}
                            className={`${styles.imageItemContainer} ${
                                (index % videos.length) % 2 === 0 ? styles.even : styles.odd
                            }`}
                            onClick={() => handleVideoClick(src)}
                        >
                            <video
                                src={src}
                                className={styles.imageElement}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {isPopupOpen && selectedVideo && (
                <div className={styles.popupOverlay} onClick={handleClosePopup}>
                    <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={handleClosePopup}>
                            ×
                        </button>
                        <video
                            src={selectedVideo}
                            className={styles.popupImage}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                        />
                    </div>
                </div>
            )}
        </>
    );
};