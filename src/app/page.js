import styles from './page.module.scss';
import NavBar from "@/components/NavBar/NavBar";
import {paralaxSet1, paralaxSet2, paralaxSet3} from '@/lib/home-page.data.js';
import ParallaxLayout from '@/components/ParallaxLayout/ParallaxLayout';
import ArtBlock from '@/components/ArtBlock/ArtBlock';
import Footer from "@/components/Footer/Footer";
import InteractiveCategorySelector from '@/components/InteractiveCategorySelector/InteractiveCategorySelector';
import { getNavigation, getSnakeGallery, getHomepageContent } from '@/lib/api';
import Custom from "@/components/custom/Custom";

function mergeLayoutWithContent(layoutData, contentData = []) {
    const apiTexts = contentData.filter(item => item.type === 'text');
    const apiImages = contentData.filter(item => item.type === 'image');

    let textIndex = 0;
    let imageIndex = 0;

    return layoutData.map(layoutItem => {
        const finalItem = { ...layoutItem };

        if (layoutItem.type === 'text') {
            if (textIndex < apiTexts.length) {
                const contentItem = apiTexts[textIndex];
                finalItem.title = contentItem.title;
                finalItem.content = contentItem.content;
                textIndex++;
            }
        } else if (layoutItem.type === 'image') {
            if (imageIndex < apiImages.length) {
                const contentItem = apiImages[imageIndex];
                finalItem.src = contentItem.src;
                finalItem.alt = contentItem.alt;
                imageIndex++;
            }
        }

        return finalItem;
    });
}

export default async function HomePage() {
    const [navigationData, snakeImagesData, homepageApiContent] = await Promise.all([
        getNavigation(),
        getSnakeGallery(),
        getHomepageContent()
    ]);

    const finalParallaxSet1 = mergeLayoutWithContent(paralaxSet1, homepageApiContent.paralaxSet1);
    const finalParallaxSet2 = mergeLayoutWithContent(paralaxSet2, homepageApiContent.paralaxSet2);
    const finalParallaxSet3 = mergeLayoutWithContent(paralaxSet3, homepageApiContent.paralaxSet3);

    return (
        <>
            <NavBar theme={'white'} navigation={navigationData} />
            <main className={styles.root}>
                <ArtBlock />
                <ParallaxLayout elementsData={finalParallaxSet1} minHeight="300vh" minHeightMobile='120vh' />
                <ParallaxLayout elementsData={finalParallaxSet2} minHeight="600vh" minHeightMobile='250vh' />
                <div>
                    <InteractiveCategorySelector categories={navigationData} snakeImages={snakeImagesData} />
                </div>
                <ParallaxLayout elementsData={finalParallaxSet3}  minHeight="200vh" minHeightMobile='100vh' />
                <Custom />
            </main>
            <Footer />
        </>
    );
}