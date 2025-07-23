'use client'
import {custom, footerData} from '@/lib/home-page.data.js';
import Image from 'next/image';
import styles from './Custom.module.scss'
import {useLanguage} from '@/components/LanguageProvider/LanguageProvider';
import Link from "next/link";

export default function Custom() {
    const { lang} = useLanguage()
    return(
        <div className={styles.root}>
            <section className={styles.custom} id="custom">
                {custom.map((element) => {
                    const isImage = element.type === 'image' && element.src;
                    return (
                        <div style={{
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
                                        <div className={styles.title}>{lang === 'ru' ? element.title.ru : element.title.en}</div>
                                    }
                                    <div className={styles.textContent}>
                                        {typeof element.content === 'string'
                                            ? <p dangerouslySetInnerHTML={{ __html: lang === 'ru' ? element.content.ru.replace(/\n/g, '<br />') : element.content.en.replace(/\n/g, '<br />') }} />
                                            : lang === 'ru' ? element.content.ru : element.content.en
                                        }
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })}
                <Image
                    src="/images/customBack.svg"
                    alt=""
                    className={styles.lightnings}
                    width={1200}
                    height={500}
                />
                <Link href="/category" className={styles.linkMob}>
                    <button className={styles.footerBtn}>{lang === 'ru' ? "КАТАЛОГ" : "CATALOG"}</button>
                </Link>
                <div className={styles.footerCatalogDesctop}>
                    <Link href="/category/rings" className={styles.linkDesc}>
                        <button className={styles.footerBtn}>{lang === 'ru' ? "КАТАЛОГ" : "CATALOG"}</button>
                    </Link>
                    <div
                        className={styles.footerText}
                        dangerouslySetInnerHTML={{ __html: footerData.text }}
                    />
                </div>
            </section>
        </div>
    )
}