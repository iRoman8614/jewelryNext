import styles from './page.module.scss';
import NavBar from "@/components/NavBar/NavBar";
import {paralaxSet1, paralaxSet2, paralaxSet3, custom} from '@/lib/home-page.data.js';
import ParallaxLayout from '@/components/ParallaxLayout/ParallaxLayout';
import ArtBlock from '@/components/ArtBlock/ArtBlock';
import Footer from "@/components/Footer/Footer";
import InteractiveCategorySelector from '@/components/InteractiveCategorySelector/InteractiveCategorySelector';
import { getNavigation, getSnakeGallery, getHomepageContent, getCustom } from '@/lib/api';
import Custom from "@/components/custom/Custom";
import {Loader} from "@/components/loader/Loader";

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

// Подмешивает данные Custom-блока из админки в ПОЗИЦИОННУЮ раскладку
// home-page.data.js, НЕ меняя координаты, заголовок «Кастом» и подписи-этапы.
//  - 3 картинки (id 2,4,6) → src из админки по порядку;
//  - главный текст (единственный text с title, id 1) → content из админки;
//  - подписи ПРЕДСТАВЛЕНИЕ/ФОРМА/И СОЗДАНИЕ (text без title) → не трогаем.
// Пустой слот или превью-плейсхолдер → остаётся дефолт из data-файла,
// чтобы блок никогда не выглядел сломанным до заполнения админки.
const PREVIEW_SUFFIX = '/previews/preview.png';
function mergeCustomWithContent(layoutData, customApi) {
    if (!customApi) return layoutData;
    const images = customApi.images || [];
    const text = customApi.text || {};
    let imageIndex = 0;

    return layoutData.map(layoutItem => {
        const finalItem = { ...layoutItem };

        if (layoutItem.type === 'image') {
            const adminSrc = images[imageIndex];
            if (adminSrc && !adminSrc.endsWith(PREVIEW_SUFFIX)) {
                finalItem.src = adminSrc;
            }
            imageIndex++;
        } else if (layoutItem.type === 'text' && layoutItem.title) {
            finalItem.content = {
                ru: (text.ru && text.ru.trim()) ? text.ru : (layoutItem.content?.ru || ''),
                en: (text.en && text.en.trim()) ? text.en : (layoutItem.content?.en || ''),
            };
        }

        return finalItem;
    });
}

// Главная рендерится в рантайме против живого бэка (всегда свежий контент)
// и, что важно, НЕ пре-рендерится во время docker build, когда бэк недоступен.
// (Если позже захочешь кэш — добавим micro-cache в nginx, разметку не трогая.)
export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const [navigationData, snakeImagesData, homepageApiContent, customApiContent] = await Promise.all([
        getNavigation(),
        getSnakeGallery(),
        getHomepageContent(),
        getCustom()
    ]);

    const finalParallaxSet1 = mergeLayoutWithContent(paralaxSet1, homepageApiContent.paralaxSet1);
    const finalParallaxSet2 = mergeLayoutWithContent(paralaxSet2, homepageApiContent.paralaxSet2);
    const finalParallaxSet3 = mergeLayoutWithContent(paralaxSet3, homepageApiContent.paralaxSet3);
    const finalCustom = mergeCustomWithContent(custom, customApiContent);

    return (
        <>
            <Loader />
            <NavBar theme={'white'} navigation={navigationData} />
            <main className={styles.root}>
                <ArtBlock />
                <ParallaxLayout elementsData={finalParallaxSet1} minHeight="300vh" minHeightMobile='120vh' />
                <ParallaxLayout elementsData={finalParallaxSet2} minHeight="600vh" minHeightMobile='250vh' />
                <div>
                    <InteractiveCategorySelector categories={navigationData} snakeImages={snakeImagesData} />
                </div>
                <ParallaxLayout elementsData={finalParallaxSet3}  minHeight="200vh" minHeightMobile='100vh' />
                <Custom customData={finalCustom} />
            </main>
            <Footer />
        </>
    );
}