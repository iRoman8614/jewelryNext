import styles from './gallery.module.scss';
import InfiniteImageSwiper from "@/components/InfiniteImageSwiper/InfiniteImageSwiper";
import InfiniteImageFeed from "@/components/InfiniteImageFeed/InfiniteImageFeed";
import InfiniteVideoFeed from "@/components/InfiniteVideoFeed/InfiniteVideoFeed";
import NavBar from "@/components/NavBar/NavBar";
import Image from "next/image";
import InfiniteSwiper from "@/components/InfiniteMobileGalletySwiper/InfiniteSwiper";
import {PageTitle} from "@/app/gallery/title";
import {VideoTitle} from "@/app/gallery/videoTitle";
import {SoldTitle} from "@/app/gallery/soldTitle";
import { getNavigation, getReelGalleryImages, getVideoGallery, getArchivedProducts } from '@/lib/api';

export const metadata = {
    title: 'Галерея – 27jwlr',
    description: 'Галерея работ и проданных изделий.',
};

// Галерея рендерится в рантайме против живого бэка (свежий reel/видео/архив) и
// не пре-рендерится во время docker build, когда бэк ещё недоступен.
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const [navigationData, reelGalleryData, videoGalleryData, archivedImages] = await Promise.all([
        getNavigation(),
        getReelGalleryImages(),
        getVideoGallery(),
        getArchivedProducts()
    ]);

    return(
        <>
            <NavBar theme={'black'} navigation={navigationData} />
            <section className={styles.root}>
                <PageTitle />
                <div className={styles.imageLine}>
                    <InfiniteImageFeed
                        images={reelGalleryData}
                        speed={40}
                        imageWidth={400}
                        imageHeight={400}
                        verticalOffset={30}
                        gap={20}
                    />
                </div>
                <div className={styles.mobileSwiperLine}>
                    <InfiniteSwiper images={reelGalleryData} />
                </div>

                {/* ВИДЕО-секция: показывается только когда есть загруженные видео.
                    Переиспользует существующие классы заголовка/ленты, стили не меняются. */}
                {videoGalleryData.length > 0 && (
                    <>
                        <VideoTitle />
                        <div className={styles.imageLine}>
                            <InfiniteVideoFeed
                                videos={videoGalleryData}
                                speed={40}
                                imageWidth={400}
                                imageHeight={400}
                                verticalOffset={30}
                                gap={20}
                            />
                        </div>
                        <div className={styles.mobileSwiperLine}>
                            <InfiniteVideoFeed
                                videos={videoGalleryData}
                                speed={40}
                                imageWidth={260}
                                imageHeight={260}
                                verticalOffset={20}
                                gap={15}
                            />
                        </div>
                    </>
                )}

                {archivedImages.length > 0 && <div className={styles.swiper}>
                    <InfiniteImageSwiper images={archivedImages}/>
                </div>}
                <SoldTitle />
                <div className={styles.mobileSold}>
                    {archivedImages.map((item, index) => {
                        return(
                            <div className={styles.cell} key={index}>
                                <Image src={item.image} alt={''} width={150} height={150} />
                            </div>
                        )
                    })}
                </div>
                <div className={styles.mobileGalleryFooter}>
                    <Image className={styles.logotype} src={'/images/logotipe.png'} alt={'logo'} width={130} height={145} />
                </div>
            </section>
        </>
    )
}