import styles from './gallery.module.scss';
import InfiniteImageSwiper from "@/components/InfiniteImageSwiper/InfiniteImageSwiper";
import InfiniteImageFeed from "@/components/InfiniteImageFeed/InfiniteImageFeed";
import NavBar from "@/components/NavBar/NavBar";
import Image from "next/image";
import InfiniteSwiper from "@/components/InfiniteMobileGalletySwiper/InfiniteSwiper";
import {PageTitle} from "@/app/gallery/title";
import {SoldTitle} from "@/app/gallery/soldTitle";
import { getNavigation, getReelGalleryImages } from '@/lib/api';

export const swiperImages = [
    '/images/meteora.png',
    '/images/ring.png',
    '/images/meteora.png',
    '/images/ring.png',
    '/images/meteora.png',
    '/images/ring.png',
    '/images/meteora.png',
    '/images/parallax5.png',
    '/images/meteora.png',
    '/images/ring.png',
    '/images/meteora.png',
    '/images/ring.png',
    '/images/meteora.png',
    '/images/ring.png',
    '/images/meteora.png',
    '/images/ring.png',
    '/images/meteora.png',
    '/images/meteora.png',
    '/images/meteora.png',
    '/images/meteora.png',
    '/images/meteora.png',
];

export const metadata = {
    title: 'Галерея – 27jwlr',
    description: 'Галерея работ и проданных изделий.',
};

export default async function GalleryPage() {
    const [navigationData, reelGalleryData] = await Promise.all([
        getNavigation(),
        getReelGalleryImages()
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
                <div className={styles.swiper}>
                    <InfiniteImageSwiper images={swiperImages} />
                </div>
                <SoldTitle />
                <div className={styles.mobileSold}>
                    {swiperImages.map((item, index) => {
                        return(
                            <div className={styles.cell}>
                                <Image key={index} src={item} alt={''} width={150} height={150} />
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