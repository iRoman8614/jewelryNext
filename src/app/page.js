import styles from './page.module.scss';
import Image from 'next/image';
import NavBar from "@/components/NavBar/NavBar";
import { paralaxSet1, paralaxSet2, paralaxSet3, custom } from '@/lib/home-page.data.js';
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
                <ParallaxLayout elementsData={paralaxSet1} minHeight="300vh" minHeightMobile='230vh' />
                <ParallaxLayout elementsData={paralaxSet2} minHeight="600vh" minHeightMobile='350vh' />
                <div>
                    <InteractiveCategorySelector />
                </div>
                <ParallaxLayout elementsData={paralaxSet3}  minHeight="200vh" minHeightMobile='130vh' />
                <section className={styles.custom} id="custom">
                    {custom.map((element) => {
                        const isImage = element.type === 'image' && element.src;
                        return (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: element.top || '0%',
                                    left: element.left || '0%',
                                    width: element.width || 'auto',
                                    height: isImage ? element.width : 'auto',
                                    zIndex: element.zIndex || 1,
                                }}
                            >
                                {element.type === 'image' && element.src && (
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
                                {element.type === 'text' && element.content && (
                                    <>
                                        {element.title &&
                                            <div className={styles.title}>{element.title}</div>
                                        }
                                        <div className={styles.textContent}>
                                            {typeof element.content === 'string'
                                                ? <p dangerouslySetInnerHTML={{ __html: element.content.replace(/\n/g, '<br />') }} />
                                                : element.content
                                            }
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                    <Image
                        src="/images/lightnings.png"
                        alt="Decorative lightnings"
                        className={styles.lightnings}
                        width={1200}
                        height={800}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}