'use client'
import {custom, footerData} from '@/lib/home-page.data.js';
import Image from 'next/image';
import styles from './Custom.module.scss'
import {useLanguage} from '@/components/LanguageProvider/LanguageProvider';
import Link from "next/link";

// Текст кастом-блока может прийти ДВУХ видов:
//  1) HTML из rich-text-редактора админки (<p>, <br>, <strong>, списки…);
//  2) обычный текст с переносами \n (статический фолбэк из home-page.data.js).
// Приводим оба к HTML: если есть теги — отдаём как есть; иначе переносы \n → <br>.
const toHtml = (value) => {
    const v = value == null ? '' : String(value);
    return /<[a-z!/][\s\S]*>/i.test(v) ? v : v.replace(/\n/g, '<br />');
};

export default function Custom({ customData }) {
    const { lang} = useLanguage()
    // Данные приходят из page.js (позиции из home-page.data + контент из админки).
    // Фолбэк на статический массив — если компонент отрендерен без пропа.
    const items = (customData && customData.length) ? customData : custom;
    return(
        <div className={styles.root}>
            <section className={styles.custom} id="custom">
                {items.map((element) => {
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
                                    <div
                                        className={styles.textContent}
                                        dangerouslySetInnerHTML={{
                                            __html: toHtml(lang === 'ru' ? element.content.ru : element.content.en),
                                        }}
                                    />
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