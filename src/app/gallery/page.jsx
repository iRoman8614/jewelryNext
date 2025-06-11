import styles from './gallery.module.scss';
import InfiniteImageSwiper from "@/components/InfiniteImageSwiper/InfiniteImageSwiper";
import InfiniteImageFeed from "@/components/InfiniteImageFeed/InfiniteImageFeed";
import { productImages, swiperImages } from "@/lib/gallery.data.js";
import NavBar from "@/components/NavBar/NavBar";

export const metadata = {
    title: 'Галерея – 27jwlr',
    description: 'Галерея работ и проданных изделий.',
};

export default function GalleryPage() {
    return(
        <>
            <NavBar theme={'black'} />
            <section className={styles.root}>
                <div className={styles.title}>Галерея</div>
                <InfiniteImageFeed
                    images={productImages}
                    speed={40}
                    imageWidth={400}
                    imageHeight={400}
                    verticalOffset={30}
                    gap={20}
                />
                <div className={styles.swiper}>
                    <InfiniteImageSwiper images={swiperImages} />
                </div>
            </section>
        </>
    )
}