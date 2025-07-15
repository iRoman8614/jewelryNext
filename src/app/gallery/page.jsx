import styles from './gallery.module.scss';
import InfiniteImageSwiper from "@/components/InfiniteImageSwiper/InfiniteImageSwiper";
import InfiniteImageFeed from "@/components/InfiniteImageFeed/InfiniteImageFeed";
import NavBar from "@/components/NavBar/NavBar";
import Image from "next/image";
import InfiniteSwiper from "@/components/InfiniteMobileGalletySwiper/InfiniteSwiper";
import {PageTitle} from "@/app/gallery/title";
import {SoldTitle} from "@/app/gallery/soldTitle";
import { getNavigation, getReelGalleryImages, getArchivedProducts } from '@/lib/api';

export const metadata = {
    title: 'Галерея – 27jwlr',
    description: 'Галерея работ и проданных изделий.',
};

export default async function GalleryPage() {
    const [navigationData, reelGalleryData, archivedImages] = await Promise.all([
        getNavigation(),
        getReelGalleryImages(),
        getArchivedProducts()
    ]);

    console.log('archivedImages', archivedImages)

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
                {archivedImages.length > 0 && <div className={styles.swiper}>
                    <InfiniteImageSwiper images={archivedImages}/>
                </div>}
                <SoldTitle />
                <div className={styles.mobileSold}>
                    {archivedImages.map((item, index) => {
                        return(
                            <div className={styles.cell}>
                                <Image key={index} src={item.image} alt={''} width={150} height={150} />
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