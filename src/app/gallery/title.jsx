'use client'

import styles from "./gallery.module.scss";
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

export const PageTitle = () => {
    const { lang } = useLanguage();

    return(
        <div className={styles.title}>{lang === 'ru' ? 'Галерея' : 'Gallery'}</div>
    )
}