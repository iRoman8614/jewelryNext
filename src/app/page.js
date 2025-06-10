import styles from './page.module.scss';
import Image from 'next/image';
import NavBar from "@/components/NavBar/NavBar";
import { paralaxSet1, paralaxSet2, paralaxSet3 } from '@/lib/home-page.data.js';
import ParallaxLayout from '@/components/ParallaxLayout/ParallaxLayout';
import ArtBlock from '@/components/ArtBlock/ArtBlock';
import Footer from "@/components/Footer/Footer";
import InteractiveCategorySelector from '@/components/InteractiveCategorySelector/InteractiveCategorySelector';

export default function HomePage() {
    return (
        <>
            <NavBar theme={'white'} />
            <main className={styles.root}>
                <ArtBlock />
                <ParallaxLayout elementsData={paralaxSet1} minHeight="300vh" />
                <ParallaxLayout elementsData={paralaxSet2} minHeight="600vh" />
                <div>
                    <InteractiveCategorySelector />
                </div>
                <ParallaxLayout elementsData={paralaxSet3}  minHeight="600vh" />
                <div id="custom">
                    <Image
                        src="/images/lightnings.png"
                        alt="Decorative lightnings"
                        className={styles.lightnings}
                        width={800}
                        height={800}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}