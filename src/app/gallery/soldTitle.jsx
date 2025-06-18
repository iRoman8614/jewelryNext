'use client'

import styles from "./gallery.module.scss";
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

export const SoldTitle = () => {
    const { lang } = useLanguage();

    return(
        <div className={styles.titleSold}>{lang === 'ru' ? 'Продано' : 'Sold'}</div>
    )
}